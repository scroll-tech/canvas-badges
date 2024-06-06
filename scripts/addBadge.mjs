import { writeFile } from "fs/promises";
import { readJson, generatePath } from "./util.mjs";

(async () => {
  try {
    const badge = JSON.parse(process.env.NEW_BADGE);
    const badgeList = await readJson("../scroll.badgelist.json");

    badgeList.badges.push(badge);
    badgeList.timestamp = new Date().toISOString();
    const badgeListStr = JSON.stringify(badgeList, null, 2);

    await writeFile(generatePath("../scroll.badgelist.json"), badgeListStr);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
