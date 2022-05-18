function exitHandler() {
  consoleOutput.write('\nThe process has stopped\n');

  exit(0);
}

const { stdin: input, stdout: consoleOutput } = process;
const Fs = require('fs');
const Path = require('node:path');
const { exit } = require('process');


const outputPath = Path.join(__dirname, 'output.txt');
const fileOutput = Fs.createWriteStream(outputPath);

input.setEncoding('utf8');

input.on('data', (data) => {
  let stringifiedData = data.toString();

  if (stringifiedData.slice(0, 4) === 'exit' && stringifiedData.length === 6) {
    process.emit('SIGINT');

    return;
  }

  fileOutput.write(data);
});

process.on('SIGINT', exitHandler);

consoleOutput.write('Data to be written: ');