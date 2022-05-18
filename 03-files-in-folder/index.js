function getPathToSecretFolderFile(fileName) {
  return Path.join(secretFolderPath, fileName);
}

async function getFileSize(path) {
  try {
    let fileStat = await stat(path);

    return fileStat.size;
  } catch (error) {
    throw new Error(error);
  }
}

const Path = require('node:path');
const { readdir, stat } = require('fs/promises');

const secretFolderPath = Path.join(__dirname, 'secret-folder');


readdir(secretFolderPath, {withFileTypes: true})
  .then((files) => {
    for (let file of files) {
      if (!file.isFile()) {
        continue;
      }

      let fullFileName = file.name;
      let path = getPathToSecretFolderFile(fullFileName);
      let dotIndex = fullFileName.lastIndexOf('.');

      let fileName = fullFileName.slice(0, dotIndex);
      let extension = fullFileName.slice(dotIndex + 1);

      getFileSize(path)
        .then((size) => {
          let sizeInKB = size / 1024;

          console.log(`${fileName} - ${extension} - ${sizeInKB}Kb`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });