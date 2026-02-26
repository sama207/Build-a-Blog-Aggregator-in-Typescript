import { scrapeFeeds } from "src/lib/db/queries/feeds";

function parseDuration(durationStr: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (match == null) {
        throw new Error("please type the time in this format 1ms|s|m|h")
    }
    let totalMilliseconds = 0;
    const value = Number(match[1])

    const unit = match[2]

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


    return totalMilliseconds;
}

function handleError(err: unknown) {
    console.error("Error scraping feed:", err);
}

export async function handlerAgg(cmdName: string, time_between_reqs: string) {
    const timeBetweenRequests = parseDuration(time_between_reqs);
    console.log(`Collecting feeds every ${time_between_reqs}`)
    scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, timeBetweenRequests);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}