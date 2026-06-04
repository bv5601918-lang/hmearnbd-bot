package.json{
  "name": "hmearnbd-bot",
  "version": "1.0.0",
  "description": "HM Earn BD Telegram Bot",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "node-telegram-bot-api": "^0.66.0"
  }
}
index.jsconst TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: true
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🎉 স্বাগতম HM Earn BD Bot-এ!\n\nBot সফলভাবে চালু হয়েছে।"
  );
});

console.log("Bot is running...");
.gitignorenode_modules
