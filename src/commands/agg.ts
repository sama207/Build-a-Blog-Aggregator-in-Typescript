import { fetchFeed } from "src/feed";
import { scrapeFeeds } from "src/lib/db/queries/feeds";

function parseDuration(durationStr: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (match == null) {
        throw new Error("please type the time in this format 1ms|s|m|h")
    }
    let totalMilliseconds = 0;
    for (const part of match) {
        const value = parseInt(part, 10);
        const unit = part.match(/(ms|s|m|h)/)![0];

        switch (unit) {
            case 'ms':
                totalMilliseconds += value;
                break;
            case 's':
                totalMilliseconds += value * 1000;
                break;
            case 'm':
                totalMilliseconds += value * 1000 * 60;
                break;
            case 'h':
                totalMilliseconds += value * 1000 * 60 * 60;
                break;
        }
    }

    return totalMilliseconds;
}

export async function handlerAgg(cmdName: string, time_between_reqs: string) {
    const res = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.log(JSON.stringify(res, null, 2));
}