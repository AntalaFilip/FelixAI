const { CommandoClient, CommandoGuild } = require('discord.js-commando');
const { json } = require('express');
const { createConnection } = require('mysql');
const Lesson = require('../types/lesson/lesson');
const Logger = require('./logger');
require('dotenv').config();

const db = createConnection({
	host: process.env.DBHOST,
	port: 3314,
	database: process.env.DB,
	user: process.env.DBUSER,
	password: process.env.DBPASS,
});

class DatabaseManager {
	/**
	 * Creates a new DatabaseManager.
	 * @param {CommandoClient} client The client that instantiated this.
	 */
	constructor(client) {
		this.client = client;
		this.logger = new Logger("DatabaseManager");
		this.logger.log(`Ready!`);
	}

	/**
	 * Parses a result from the database
	 * @param {string} result The string to parse
	 */
	parseDatabaseResult(result) {
		const parsed = new Map();
		const res = new Map(Object.entries(result));
		res.forEach((val, key) => {
			try {
				const newval = JSON.parse(val);
				parsed.set(key, newval);
			}
			catch (error) {
				parsed.set(key, val);
			}
		});
		return Object.fromEntries(parsed);
	}

	/**
	 * Fetches all ongoing lessons in the database, parses them into Lesson objects, and returns them as an array.
	 * @param {CommandoGuild} guild
	 * @returns {Lesson[]} Array of Lesson objects, or an empty array, if no lessons are ongoing.
	 */
	getOngoingLessons(guild) {
		if (!guild) guild = this.client.guilds.cache.find(g => g.id == `702836521622962198`);
		const array = new Array();
		db.query(`SELECT * FROM lessons WHERE endedat IS NULL`, (err, res) => {
			if (err) throw err;

			res.forEach(raw => {
				const val = this.parseDatabaseResult(raw);
				const ls = new Lesson(this.client, val.id, this.client.lessonManager, guild.members.cache.find(t => t.id == val.teacher), val.lesson, val.classname, val.group, val.period, val.students, val.startedat, null, true);
				array.push(ls);
			});
		});
		return array;
	}

	getSettings(guildId = '702836521622962198') {
		return new Promise((resolve, reject) => {
			db.query(
				`SELECT * FROM settings WHERE guild = "${guildId}"`,
				(err, res) => {
					if (err) throw err;
					if (res.length < 0) {
						reject(new Error('There are no settings for that guild'));
					}
					else {
						resolve(this.parseDatabaseResult(res.pop()));
					}
				});
		});
	}

	async updateLesson(lesson) {
		this.logger.debug(`Updating lesson: ${lesson}`);
		db.query(`UPDATE lessons SET students = '${JSON.stringify(lesson.students)}', WHERE id = ${lesson.id}`);
	}

	pushNewLesson(lesson) {
		return new Promise((resolve, reject) => {
			this.logger.debug(`Inserting new lesson: ${lesson}`);
			this.client.stringUtils.resolveClass(lesson.classid).then((classname) => {
				const studentJson = JSON.stringify(lesson.students);
				db.query(`INSERT INTO lessons (teacher, lesson, classname, \`group\`, period, startedat, students) VALUES ("${lesson.teacher.member.id}", "${lesson.lessonid}", "${classname}", "${lesson.group}", "${lesson.period}", "${this.client.stringUtils.dateToString(new Date(lesson.startedAt))}", ${studentJson})`, (err, res) => {
					if (err) throw err;
					resolve(res.insertId);
				});
			});
		});
	}
}

module.exports = DatabaseManager;
exports.db = db;