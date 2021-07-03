import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";
import { CommandList } from "./_CommandList";

export const help: CommandInt = {
  name: "help",
  description: "Gives information on various bot commands",
  run: async (message) => {
    const helpEmbed = new MessageEmbed();
    helpEmbed.setTitle("Available Commands!");
    helpEmbed.setDescription("These are the available commands.");
    helpEmbed.addField(
      "Commands",
      CommandList.map((el) => `\`!${el.name}\`: ${el.description}`).join("\n")
    );
    helpEmbed.setFooter(
      "check your id by enabling dev tools, opening the settings of a specific message and choosing copy ID"
    );

    await message.channel.send(helpEmbed);
  },
};
