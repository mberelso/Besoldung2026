const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('ref-amtsangemessene-alimentation.pdf');

pdf(dataBuffer).then(function(data) {
    console.log("TITEL:", data.info.Title);
    console.log("SEITEN:", data.numpages);
    console.log(data.text);
}).catch(err => {
    console.error("Error parsing PDF:", err);
});
