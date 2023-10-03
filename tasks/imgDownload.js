import download from "image-downloader";
import fs from "fs";
import * as d3 from "d3";

const raw = fs.readFileSync("./src/data/listings.csv", "utf8");
const csvData = d3.csvParse(raw);

let options = {
    url: "",
    dest: "",
};

let raunchinessData = csvData.filter(d => d.cover_url.includes("http")).filter(d => d["Man partially unclothed"] == "TRUE" || d["Woman partially unclothed"] == "TRUE").sort((a, b) => d3.ascending(a["Year Season"], b["Year Season"]));
let illustrationData = csvData.filter(d => d.cover_url.includes("http")).filter(d => d.Style == "Illustrated").sort((a, b) => d3.ascending(a["Year Season"], b["Year Season"]));
let raceData = csvData.filter(d => d.cover_url.includes("http")).filter(d => d["Has POC"] == "TRUE").sort((a, b) => d3.ascending(a["Year Season"], b["Year Season"]));

raunchinessData.forEach((d) => {
    if (d.cover_url !== "Unknown") {
        options.url = d.cover_url;
        options.dest = `../../static/assets/images/covers/img_${d.ISBN}.jpg`

        download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
            })
            .catch((err) => console.error(err));
    }
})

illustrationData.forEach((d) => {
    if (d.cover_url !== "Unknown") {
        options.url = d.cover_url;
        options.dest = `../../static/assets/images/covers/img_${d.ISBN}.jpg`

        download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
            })
            .catch((err) => console.error(err));
    }
})

raceData.forEach((d) => {
    if (d.cover_url !== "Unknown") {
        options.url = d.cover_url;
        options.dest = `../../static/assets/images/covers/img_${d.ISBN}.jpg`

        download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
            })
            .catch((err) => console.error(err));
    }
})