/* eslint-disable no-undef */
const path = require('path');
const glob = require('glob-all');
const distPath = path.join(__dirname, '../../dist');
var PAGE_PATH = path.resolve(__dirname, '../../src/pages');
jest.setTimeout(10000);

describe('smoke test', () => {
  const entryHtml = glob.sync(PAGE_PATH + '/*/*.html').map((filePath) => {
    return filePath.substring(
      filePath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('.')
    );
  });
  const entryJs = glob.sync(PAGE_PATH + '/*/*.js').map((filePath) => {
    return filePath.substring(
      filePath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('.')
    );
  });
  it('html test', (done) => {
    const files = glob.sync([`${distPath}/**.html`]).map((filePath) => {
      return filePath.substring(
        filePath.lastIndexOf('/') + 1,
        filePath.lastIndexOf('.')
      );
    });
    let equalHtml = false;
    for (let i = 0; i < files.length; i++) {
      if (entryHtml.includes(files[i])) {
        equalHtml = true;
      } else {
        equalHtml = false;
        return false;
      }
    }
    if (files.length === entryHtml.length && equalHtml) {
      // console.log('files: ', files.length);
      done();
    }
  });
  it('css test', (done) => {
    const files = glob
      .sync([`${distPath}/public/static/css/**.css`])
      .map((filePath) => {
        return filePath.substring(
          filePath.lastIndexOf('/') + 1,
          filePath.lastIndexOf('.')
        );
      });
    const cssList = ['common', 'vendor'];
    let stylecss = false;
    for (let i = 0; i < cssList.length; i++) {
      if (files.indexOf(cssList[i])) {
        stylecss = true;
      } else {
        stylecss = false;
        return false;
      }
    }
    if (stylecss) {
      done();
    }
  });
  it('Js test', (done) => {
    const files = glob
      .sync([`${distPath}/public/static/js/**.js`])
      .map((filePath) => {
        return filePath.substring(
          filePath.lastIndexOf('/') + 1,
          filePath.lastIndexOf('.')
        );
      });
    let equalJs = true;
    for (let i = 0; i < files.length; i++) {
      if (entryJs.indexOf(files[i])) {
        equalJs = true;
      } else {
        equalJs = false;
        return false;
      }
    }
    let commonjs = false;
    let vendorsjs = false;
    files.forEach((filePath) => {
      if (filePath.indexOf('common') !== -1) {
        commonjs = true;
      }
      if (filePath.indexOf('vendor') !== -1) {
        vendorsjs = true;
      }
    });
    if (equalJs && commonjs && vendorsjs) {
      done();
    }
  });
});
