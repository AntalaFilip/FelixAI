const { CommandoClient } = require("discord.js-commando");
const Logger = require("./logger");

class StringUtils {
	/**
	 * Creates a new StringUtils class.
	 * @param {CommandoClient} client The client that instantiated this.
	 */
	constructor(client) {
		this.client = client;
		this.logger = new Logger("StringUtils");
		this.logger.log(`Ready!`);
	}


	resolveClass(classid) {
		return new Promise((resolve, reject) => {
			this.client.databaseManager.getSettings().then(sett => {
				const resolved = sett.classes.find(val => val.includes(classid));
				if (resolved) resolve(resolved);
				else reject('This class does not exist!');
			});
		});
	}

	/**
	 * Converts the Date into a YYYY-MM-DD hh-mm-ss value
	 * @param {Date} date The date to convert to String
	 */
	dateToString(date) {
		return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
	}
}

module.exports = StringUtils;