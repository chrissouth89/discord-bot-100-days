import { CommandInt } from "../interfaces/CommandInt";
import CoderModel from "../database/models/CoderModel";
import { MessageEmbed } from "discord.js";

export const oneHundred: CommandInt = {
  name: "100",
  description: "Creates a 100 days of coding update",
  run: async (message) => {
    const { author, channel, content } = message;
    const text = content.split(" ").slice(1).join(" ");

    let targetCoderData = await CoderModel.findOne({ discordId: author.id });
    if (!targetCoderData) {
      targetCoderData = await CoderModel.create({
        discordId: author.id,
        round: 1,
        day: 0,
        timestamp: Date.now(),
      });
    }

    targetCoderData.day++;
    if (targetCoderData > 100) {
      targetCoderData.day = 1;
      targetCoderData.round++;
    }

    targetCoderData.timestamp = Date.now();
    await targetCoderData.save();

    const oneHundredEmbed = new MessageEmbed();
    oneHundredEmbed.setTitle("100 Days of Code");
    oneHundredEmbed.setDescription(text);
    oneHundredEmbed.setAuthor(
      author.username + "#" + author.discriminator,
      author.displayAvatarURL()
    );
    oneHundredEmbed.addField("Round", targetCoderData.round, true);
    oneHundredEmbed.addField("Day", targetCoderData.day, true);
    oneHundredEmbed.setFooter(
      "Day completed: " +
        new Date(targetCoderData.timestamp).toLocaleDateString()
    );

    await channel.send(oneHundredEmbed);
    await message.delete();
  },
};
