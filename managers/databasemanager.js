const { GuildMember, Guild } = require('discord.js');
const { CommandoClient, CommandoGuild } = require('discord.js-commando');
const { createConnection } = require('mysql');
const Audit = require('../types/audit/audit');
const MergeAudit = require('../types/audit/mergeaudit');
const SplitAudit = require('../types/audit/splitaudit');
const Lesson = require('../types/lesson/lesson');
const Logger = require('../util/logger');
const str = require('../util/stringutils');
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
	 * @returns {Promise<Lesson[] | Array>} Promise with an array of Lesson objects, or an empty array, if no lessons are ongoing.
	 */
	getOngoingLessons(guild) {
		return new Promise((resolve, reject) => {
			if (!guild) guild = this.client.guilds.cache.find(g => g.id == `702836521622962198`);
			const array = new Array();
			db.query(`SELECT * FROM lessons WHERE endedat IS NULL`, (err, res) => {
				if (err) return reject(err);

				res.forEach(raw => {
					const val = this.parseDatabaseResult(raw);
					const ls = new Lesson(val.id, val.allocated, guild.members.cache.find(t => t.id == val.teacher), val.lesson, val.classname.slice(0, 2), val.group, val.period, val.students, val.startedat, null);
					array.push(ls);
				});
				resolve(array);
			});
		});
	}

	getAllLessons(guild = this.client.guilds.cache.find(g => g.id == `702836521622962198`)) {
		return new Promise((resolve, reject) => {
			const array = new Array();
			db.query(`SELECT * FROM lessons`, (err, res) => {
				if (err) return reject(err);

				res.forEach(raw => {
					const val = this.parseDatabaseResult(raw);
					const ls = new Lesson(val.id, val.allocated, guild.members.cache.find(t => t.id == val.teacher), val.lesson, val.classname.slice(0, 2), val.group, val.period, val.students, new Date(val.startedat), new Date(val.endedat));
					array.push(ls);
				});
				resolve(array);
			});
		});
	}

	/**
	 * @param {Guild} guild
	 * @param {number} id
	 */
	getLesson(guild = this.client.guilds.cache.find(g => g.id == `702836521622962198`), id) {
		return new Promise((resolve, reject) => {
			db.query(`SELECT * FROM lessons WHERE id = ${id}`, (err, res) => {
				if (err) return reject(err);

				const val = this.parseDatabaseResult(res.pop());
				const ls = new Lesson(val.id, val.allocated, guild.members.cache.find(t => t.id == val.teacher), val.lesson, val.classname.slice(0, 2), val.group, val.period, val.students, new Date(val.startedat), new Date(val.endedat));
				resolve(ls);
			});
		});
	}

	/**
	 * Gets the guild's settings
	 * @param {string} guildId
	 */
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

	/**
	 * Syncs the Lesson with the database.
	 * @param {Lesson} lesson The Lesson to sync.
	 */
	updateLesson(lesson) {
		return new Promise((resolve, reject) => {
			if (process.env.NODE_ENV === 'development') this.logger.debug(`Updating lesson: ${lesson.id}`);
			const allocated = new Array();
			lesson.allocated.forEach(chan => allocated.push(chan.id));
			db.query(`UPDATE lessons SET students = '${JSON.stringify(lesson.students)}', allocated = '${JSON.stringify(allocated)}' WHERE id = ${lesson.id}`, err => {
				if (err) reject(new Error(`SQL Error ${err}`));
				else resolve();
			});
		});
	}

	/**
	 * Executes an update query for endedAt which essentially ends the lesson in the database.
	 * @param {Lesson} lesson The lesson that should be ended.
	 */
	endLesson(lesson) {
		return new Promise((resolve, reject) => {
			this.logger.debug(`Ending lesson: ${lesson.id}`);
			this.updateLesson(lesson);
			db.query(`UPDATE lessons SET endedat = "${str.dateToString(lesson.endedAt)}" WHERE id = ${lesson.id}`, err => {
				if (err) reject(new Error(`Error while inserting into database, is 'endedAt' set? - ${err}`));
				else resolve();
			});
		});
	}

	/**
	 * Pushes a new Lesson to the database.
	 * @param {Lesson} lesson The Lesson that should get pushed to the database.
	 * @returns Promise with the numeric ID of the Lesson, generated by the database.
	 */
	pushNewLesson(lesson) {
		return new Promise((resolve, reject) => {
			this.logger.debug(`Inserting new lesson: ${lesson.lessonid + '@' + lesson.classid}`);
			str.resolveClass(lesson.classid)
				.then((classname) => {
					const studentJson = JSON.stringify(lesson.students);
					const allocated = new Array();
					lesson.allocated.forEach(chan => allocated.push(chan.id));
					db.query(`INSERT INTO lessons (teacher, lesson, classname, \`group\`, period, startedat, students, allocated) VALUES ("${lesson.teacher.member.id}", "${lesson.lessonid}", "${classname}", "${lesson.group}", ${lesson.period}, "${str.dateToString(new Date(lesson.startedAt))}", '${studentJson}', '${JSON.stringify(allocated)}')`,
						(err, res) => {
							if (err) reject(new Error(`SQL error ${err}`));
							else resolve(res.insertId);
						});
				});
		});
	}

	/**
	 * Inserts an audit event to the Database
	 * @param {'merge' | 'split' | 'general'} action The identificator of the event
	 * @param {GuildMember} member The member executing the event
	 * @param {string} eventdata The JSONified event data
	 * @param {Date?} timestamp
	 * @returns {Promise<number>}
	 */
	insertAudit(action, member, eventdata, timestamp = null) {
		return new Promise((resolve, reject) => {
			this.logger.debug(`Inserting new audit event: ${action}`);
			db.query(`INSERT INTO audit (user, guild, action, data, timestamp) VALUES ("${member.id}", "${member.guild.id}", "${action}", '${eventdata}' ${timestamp ? ', "' + str.dateToString(timestamp) + '"' : 'CURRENT_TIMESTAMP'})`,
				(err, res) => {
					if (err) return reject(new Error(`SQL error ${err}`));
					resolve(res.insertId);
				});
		});
	}

	getAllAudits() {
		return new Promise((resolve, reject) => {
			this.logger.debug(`Fetching audits from database`);
			db.query(`SELECT * FROM audit`,
				(err, res) => {
					if (err) reject(new Error(`SQL error ${err}`));
					const arr = [];
					res.forEach(raw => {
						const parsed = this.parseDatabaseResult(raw);
						const user = this.client.guilds.cache.find(g => g.id == parsed.guild).members.cache.find(u => u.id == parsed.user);
						let to;
						let from;
						let audit;
						switch(parsed.action) {
						case 'merge':
							from = [];
							parsed.data.from.forEach(id => from.push(user.guild.channels.resolve(id)));
							to = user.guild.channels.resolve(parsed.data.to);
							audit = new MergeAudit(user, to, from, parsed.data.list, parsed.timestamp, parsed.id);
							break;
						case 'split':
							to = [];
							parsed.data.to.forEach(id => to.push(user.guild.channels.resolve(id)));
							from = user.guild.channels.resolve(parsed.data.from);
							audit = new SplitAudit(user, from, to, parsed.data.list, parsed.timestamp, parsed.id);
							break;
						default:
							audit = new Audit(user, parsed.data, parsed.timestamp, parsed.id);
						}
						arr.push(audit);
					});
					resolve(arr);
				});
		});
	}
}

module.exports = DatabaseManager;
exports.db = db;