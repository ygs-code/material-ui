import { init } from "@rematch/core";

import * as models from "./models";

export const createStore = (global) => {
  const newModels = {};
  /* eslint-disable   */
  for (const key in models) {
    // if (models.hasOwnProperty(key)) {
    newModels[key] = models[key](global);
    // }
  }
  /* eslint-enable   */
  // 文档： https://www.icode9.com/content-4-1343821.html
  return init({
    models: newModels
  });
};

let $global = {};
try {
  if (window) {
    $global = window;
  }
} catch (error) {
  //
  $global = {};
}

export default createStore($global); // (global || {})
