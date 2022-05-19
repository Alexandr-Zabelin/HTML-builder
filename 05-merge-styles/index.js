async function BundleCss(pathToStylesFolder, pathToBundle) {
  try {
    const files = await FileSystemPromises.readdir(pathToStylesFolder, {withFileTypes: true});
    const writeStream = FileSystem.createWriteStream(pathToBundle);

    for (let file of files) {
      const pathToFile = Path.join(pathToStylesFolder, file.name);
      const fileExtension = Path.extname(pathToFile);

      if (fileExtension !== '.css' || !file.isFile()) {
        continue;
      }

      const readStream = FileSystem.createReadStream(pathToFile);

      readStream.pipe(writeStream);
    }
  } catch (error) {
    throw new Error(error);
  }
}

const FileSystem = require('fs');
const FileSystemPromises = require('fs/promises');
const Path = require('path');

const pathToStylesFolder = Path.join(__dirname, 'styles');
const pathToBundle = Path.join(__dirname, 'project-dist', 'bundle.css');


BundleCss(pathToStylesFolder, pathToBundle)
  .then(() => console.log('The bundling was successful'))
  .catch((error) => console.log(error));