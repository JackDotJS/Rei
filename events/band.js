export default {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    if (!message.content.toLowerCase().includes("band")) return;

    const instruments = ["🎸", "🎹", "🥁", "🎺", "🎻", "🎷", "🪘", "🎵"];
    const selectedEmojis = [...instruments]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    if (Math.random() < 0.05) {
      selectedEmojis.push("<:mayonnaise:1327289665148944434>");
    }

    for (const emoji of selectedEmojis) {
      await message.react(emoji);
    }
  },
};
