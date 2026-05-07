import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

let dataBuffer = fs.readFileSync('ref-amtsangemessene-alimentation.pdf');

pdf(dataBuffer).then(function(data) {
    console.log("TITEL:", data.info.Title);
    console.log("SEITEN:", data.numpages);
    // output first 3000 chars to get an overview without flooding output
    console.log(data.text.substring(0, 3000));
}).catch(err => {
    console.error("Error parsing PDF:", err);
});
