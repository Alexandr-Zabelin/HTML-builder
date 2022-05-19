const Path = require('path');
const { bundleCss } = require(Path.join(__dirname, './bundleCss'));

const pathToStylesFolder = Path.join(__dirname, 'styles');
const pathToBundle = Path.join(__dirname, 'project-dist', 'bundle.css');

// For test comment variables above and uncomment vars below

// const pathToStylesFolder = Path.join(__dirname, './test-files/styles');
// const pathToBundle = Path.join(__dirname, 'test-files', 'bundle.css');


bundleCss(pathToStylesFolder, pathToBundle)
  .then(() => console.log('The bundling was successful'))
  .catch((error) => console.log(error));
