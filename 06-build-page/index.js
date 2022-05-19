async function buildHtml(pathToInitialHtmlFile, pathToBuiltHtmlFile,
  pathToHtmlComponentsFolder, 
  pathToStyleComponentsFolder, pathToBuiltStyleFile, 
  pathToInitialAssetsFolder, pathToBuiltAssetsFolder, 
  pathToProjectFolder) {
  try {
    await FileSystemPromises.mkdir(pathToProjectFolder, {recursive: true});
    await copyDir(pathToInitialAssetsFolder, pathToBuiltAssetsFolder);
    await bundleCss(pathToStyleComponentsFolder, pathToBuiltStyleFile);
    await replaceInHtml(pathToInitialHtmlFile, pathToBuiltHtmlFile, pathToHtmlComponentsFolder);
  } catch(error) {
    throw new Error(error);
  }
}

async function replaceInHtml(pathToInitialHtmlFile, pathToBuiltHtmlFile, pathToHtmlComponentsFolder) {
  async function dataHandler(data) {
    let stringifiedData = data.toString();
    const files = await FileSystemPromises.readdir(pathToHtmlComponentsFolder, {withFileTypes: true});

    for await (let file of files) {
      const filePath = Path.join(pathToHtmlComponentsFolder, file.name);

      if (Path.extname(filePath) !== '.html') {
        continue;
      }

      const fileNameWithoutExtension = file.name.slice(0, file.name.length - 5);
      const componentData = await FileSystemPromises.readFile(filePath, {encoding: 'utf8'});

      stringifiedData = stringifiedData.replaceAll(`{{${fileNameWithoutExtension}}}`, componentData);
    }

    return stringifiedData;
  }
  
  try {
    const initialHtmlReadStream = FileSystem.createReadStream(pathToInitialHtmlFile);
    const writeStream = FileSystem.createWriteStream(pathToBuiltHtmlFile);

    initialHtmlReadStream.on('data', (data) => {
      dataHandler(data)
        .then((returnedData) => {
          writeStream.write(returnedData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  } catch(error) {
    throw new Error(error);
  }
}

const Path = require('path');
const FileSystemPromises = require('fs/promises');
const FileSystem = require('fs');
const { copyDir } = require(Path.join(__dirname, '../04-copy-directory/index'));
const { bundleCss } = require(Path.join(__dirname, '../05-merge-styles/index'));

const pathToInitialHtmlFile = Path.join(__dirname, './template.html');
const pathToBuiltHtmlFile = Path.join(__dirname, './project-dist/index.html');
const pathToHtmlComponentsFolder = Path.join(__dirname, './components');
const pathToStyleComponentsFolder = Path.join(__dirname, './styles');
const pathToBuiltStyleFile = Path.join(__dirname, './project-dist/style.css');
const pathToInitialAssetsFolder = Path.join(__dirname, './assets');
const pathToBuiltAssetsFolder = Path.join(__dirname, './project-dist/assets');
const pathToProjectFolder = Path.join(__dirname, './project-dist');


buildHtml(pathToInitialHtmlFile, pathToBuiltHtmlFile, 
  pathToHtmlComponentsFolder, 
  pathToStyleComponentsFolder, pathToBuiltStyleFile, 
  pathToInitialAssetsFolder, pathToBuiltAssetsFolder,
  pathToProjectFolder)
  .then(() => console.log('The built was successful'))
  .catch((error) => console.log(error));