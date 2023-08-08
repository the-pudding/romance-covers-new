import download from "image-downloader";
import fs from "fs";
import * as d3 from "d3";

const raw = fs.readFileSync("/Users/jandiehm/Sites/romance-covers/src/data/listings.csv", "utf8");
const csvData = d3.csvParse(raw);

let options = {
    url: "",
    dest: "",
};

// console.log(listingData);

csvData.forEach((d) => {
    if (d.cover_url !== "Unknown") {
        options.url = d.cover_url;
        options.dest = `/Users/jandiehm/Sites/romance-covers/static/assets/images/img_${d.ISBN}.jpg`

        download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
            })
            .catch((err) => console.error(err));
    }
})