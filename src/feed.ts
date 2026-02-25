import { XMLParser } from "fast-xml-parser";
import { Feed, User } from "./Types/Schema_objs.js"
export async function fetchFeed(feedURL: string) {

    const XMLdata = await fetch(feedURL, {
        method: "GET",
        headers: {
            "User-Agent": "gator",
        }
    }).then(response => response.text())

    const parser = new XMLParser();
    var allItems: any[] = [];
    var items: any[] = [];
    var link: string;
    var title: string;
    var description: string;

    let jObj = parser.parse(XMLdata);
    const channel = jObj?.rss?.channel;
    if (channel !== undefined) {
        if (channel.link.length === 0 || channel.title.length === 0 || channel.description.length === 0) {
            throw new Error("Invalid RSS feed. some channel fields is missing.");
        }
        link = channel.link;
        title = channel.title;
        description = channel.description;
        if (Array.isArray(channel.item)) {
            if (channel.item instanceof Object) {
                allItems = [channel.item];
            }
            else if (channel.item instanceof Array) {
                allItems = channel.item;
            }
        } else {
            allItems = [];
        }
        allItems = Array.isArray(channel.item) ? channel.item : [];
        allItems.forEach((item: any) => {
            if (item.link === undefined || item.title === undefined || item.description === undefined || item.pubDate === undefined) {
                return;
            }
            items.push({
                title: item.title,
                link: item.link,
                description: item.description,
                pubDate: item.pubDate,
            })
        })
    } else {
        throw new Error("Invalid RSS feed. channel field is missing.");
    }
    return {
        channel: {
            title: title,
            link: link,
            description: description,
            item: items
        }
    }
}

export function printFeed(feeds: Feed, user: User) {
    if (feeds !== undefined && user !== undefined) {
        console.log(`\nFeed ${feeds.name}(${feeds.url}) created successfully by ${user.name}`);
    }
}
