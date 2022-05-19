async function bundleCss(pathToStylesFolder, pathToBundle) {
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

      console.log(file.name);

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


bundleCss(pathToStylesFolder, pathToBundle)
  .then(() => console.log('The bundling was successful'))
  .catch((error) => console.log(error));

module.exports.bundleCss = bundleCss;