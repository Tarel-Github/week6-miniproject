// import { fileURLToPath } from "url";
// import { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


// const { fileURLToPath } = require('url');
const { dirname } = require('path');
// const asd = fileURLToPath(require(meta.url));
const path = require('path');

// console.log(dirname(__filename))
// console.log(__dirname);

console.log(path.join(__dirname, 'public'));