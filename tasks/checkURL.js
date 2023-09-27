import urlExist from 'url-exist';
import fs from "fs";
import * as d3 from "d3";

const raw = fs.readFileSync("./src/data/listings.csv", "utf8");
const csvData = d3.csvParse(raw);
let checkLinkData = [];


async function checkURL() {
    for (const d of csvData) {
        const workingLink = await urlExist(`https://bookshop.org/book/${d.ISBN}`);
        console.log(d.ISBN, workingLink)
        checkLinkData.push({ ISBN: d.ISBN, workingLink: workingLink })
    }
    const concatData = [].concat(...checkLinkData).map(d => ({
        ...d,
    }));
    const csv = d3.csvFormat(concatData);
    fs.writeFileSync(`./src/data/linkChecks.csv`, csv)
}

checkURL();