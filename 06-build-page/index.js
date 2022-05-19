const Path = require('path');
const { buildHtml } = require(Path.join(__dirname, './buildHtml'));

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