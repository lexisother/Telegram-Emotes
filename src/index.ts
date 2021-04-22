import { Telegraf } from 'telegraf';
import config from './config';

const client = new Telegraf(config.token);

client.command('test', (ctx) => {
    ctx.telegram.sendMessage(ctx.message.chat.id, 'test');
})

client.launch();

process.once('SIGINT', () => client.stop('SIGINT'));
process.once('SIGTERM', () => client.stop('SIGTERM'));