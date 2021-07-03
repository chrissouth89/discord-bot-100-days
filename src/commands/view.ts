import { CommandInt } from "../interfaces/CommandInt";
import CoderModel from "../database/models/CoderModel";
import { MessageEmbed } from "discord.js";

export const view: CommandInt = {
  name: "view",
  description: "View your progress!",
  run: async (message) => {
    const { author, channel } = message;

    const targetCoderData = await CoderModel.findOne({
      discordId: author.id,
    });

    if (!targetCoderData) {
      await channel.send("You have not started a challenge yet!");
      return;
    }

    const coderEmbed = new MessageEmbed();
    coderEmbed.setTitle("My Progress Report");
    coderEmbed.setDescription(
      `Here is my report, I last updated on ${new Date(
        targetCoderData.timestamp
      ).toLocaleDateString()}`
    );
    coderEmbed.addField("Round", targetCoderData.round, true);
    coderEmbed.addField("Day", targetCoderData.day, true);
    coderEmbed.setAuthor(
      author.username + "#" + author.discriminator,
      author.displayAvatarURL()
    );

    await channel.send(coderEmbed);
    await message.delete();
  },
};
