const { MessageEmbed } = require("discord.js");
const { Command } = require('discord.js-commando');

module.exports = class OngoingLessonsCommand extends Command {
	constructor(client) {
		super(client, {
			name: `ongoing`,
			group: `lesson`,
			memberName: `ongoing`,
			description: `Prints out all ongoing lessons`,
			examples: [ `ongoing` ],
			guildOnly: true,
		});
	}

	run(message) {
		const lessons = this.client.lessonManager.lessons;
		const embed = new MessageEmbed()
			.setTitle(`Ongoing lessons:`)
			.setAuthor(message.member.displayName, message.author.avatarURL())
			.setColor(`#ffffff`)
			.setDescription(`List of ongoing lessons:`);
		lessons.forEach(les => {
			embed.addField(`${les.lessonid}@${les.classid}`, [`Teacher: ${les.teacher.name}`, `Started at: \`${les.startedAt.toLocaleTimeString()}\``]);
		});
		message.embed(embed);
	}
};