import { Telegraf } from 'telegraf';
import config from './config';
import { URL } from 'url';
import { getContent, EmoteRegistryDump } from './lib';

const client = new Telegraf(config.token);

const regUrl = new URL('http://stronghold.crosscode.ru/~travbot/emote-registry.json');

client.command('emote', async (ctx) => {
    const topReg = ((await getContent(regUrl.toString())) as unknown) as EmoteRegistryDump;
    const registry = topReg.list;
    const emote = registry.find((e) => e.name === ctx.message.text.replace('/emote', '').replace(' ', ''))
    if (emote) {
        console.log(`${emote.name}\n${emote.url}\n\n`)
        ctx.telegram.sendMessage(ctx.message.chat.id, emote.url);
    } else {
        console.log('can\'t find')
    }
})

client.launch();

process.once('SIGINT', () => client.stop('SIGINT'));
process.once('SIGTERM', () => client.stop('SIGTERM'));