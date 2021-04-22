import {get} from "http";

export function getContent(url: string): Promise<{url: string}> {
    return new Promise((resolve, reject) => {
        get(url, (res) => {
            const {statusCode} = res;
            if (statusCode !== 200) {
                res.resume();
                reject(`Request failed. Status code: ${statusCode}`);
            }
            res.setEncoding("utf8");
            let rawData = "";
            res.on("data", (chunk: string) => {
                rawData += chunk;
            });
            res.on("end", () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(`Error: ${e.message}`);
                }
            });
        }).on("error", (err: {message: any}) => {
            reject(`Error: ${err.message}`);
        });
    });
}

export interface EmoteRegistryDumpEntry {
    ref: string;
    id: string;
    name: string;
    requires_colons: boolean;
    animated: boolean;
    url: string;
    guild_id: string;
    guild_name: string;
}

export interface EmoteRegistryDump {
    version: number;
    list: EmoteRegistryDumpEntry[];
}