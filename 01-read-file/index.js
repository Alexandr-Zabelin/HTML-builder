const { stdout } = process;
const Fs = require('fs');
const Path = require('node:path');

const filePath = Path.join(__dirname, 'text.txt');
const readStream = Fs.createReadStream(filePath, 'utf8');


readStream.pipe(stdout);