import { fetchFeed } from "src/feed";
export async function handlerAgg(cmdName: string, ...args: string[]) {
    const res = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.log(JSON.stringify(res, null, 2));
}