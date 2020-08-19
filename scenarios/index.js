/*
 * @Descripttion:
 * @Author: heidous
 * @Date: 2020-08-14 14:27:33
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-14 14:27:44
 */
const scenarios = ['full', 'full-karma-airbnb', 'minimal'];

const index = scenarios.indexOf(process.env.VUE_TEMPL_TEST);

const isTest = (exports.isTest = index !== -1);

const scenario = isTest && require(`./${scenarios[index]}.json`);

exports.addTestAnswers = (metalsmith, options, helpers) => {
  Object.assign(
    metalsmith.metadata(),
    { isNotTest: !isTest },
    isTest ? scenario : {}
  );
};
