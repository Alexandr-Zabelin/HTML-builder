async function copyDir(pathToInitialFolder, pathToCopiedFolder) {
  try {
    await FileSystemPromises.mkdir(pathToCopiedFolder, {recursive: true});

    const files = await FileSystemPromises.readdir(pathToInitialFolder, {withFileTypes: true});

    for await (let file of files) {
      if (!file.isFile()) {
        const pathToInitialInnerFolder = Path.join(pathToInitialFolder, file.name);
        const pathToCopiedInnerFolder = Path.join(pathToCopiedFolder, file.name);

        await copyDir(pathToInitialInnerFolder, pathToCopiedInnerFolder);
      } else {
        const pathToInitialFile = Path.join(Path.join(pathToInitialFolder, file.name));
        const pathToCopiedFile = Path.join(pathToCopiedFolder, file.name);

        await FileSystemPromises.copyFile(pathToInitialFile, pathToCopiedFile);
      }
    }
  } catch(error) {
    throw new Error(error);
  }
}

const Path = require('node:path');
const FileSystemPromises = require('fs/promises');


module.exports.copyDir = copyDir;