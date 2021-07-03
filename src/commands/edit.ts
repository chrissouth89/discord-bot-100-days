import { CommandInt } from "../interfaces/CommandInt";
import CoderModel from "../database/models/CoderModel";
import { MessageEmbed } from "discord.js";

export const edit: CommandInt = {
  name: "edit",
  description: "Edit a previous post",
  run: async (message) => {
    const { author, channel, content } = message;
    const [, targetId, ...text] = content.split(" ");

    const targetMessage = await channel.messages.fetch(targetId);

    if (!targetMessage) {
      await channel.send("That is not a valid message ID.");
      return;
    }

    const targetEmbed = targetMessage.embeds[0];

    if (
      targetEmbed.author?.name !==
      author.username + "#" + author.discriminator
    ) {
      await channel.send(
        "You are not the owner of this post, you cannot make edits to this post."
      );
      return;
    }

    targetEmbed.setDescription(text.join(" "));

    await targetMessage.edit(targetEmbed);
    await message.delete();
  },
};
