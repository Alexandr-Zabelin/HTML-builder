const Path = require('path');
const { copyDir } = require(Path.join(__dirname, 'copyDir'));

const pathToInitialFolder = Path.join(__dirname, 'files');
const pathToCopiedFolder = Path.join(__dirname, 'files-copy');


copyDir(pathToInitialFolder, pathToCopiedFolder)
  .then(() => console.log('Directory was successfully copied'))
  .catch((error) => console.log(`Something went wrong: ${error}`));
