/*
 * @Author: your name
 * @Date: 2021-08-20 10:51:16
 * @LastEditTime: 2021-08-20 11:47:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/js/request/filterGraphqlData.js
 */

const deepCopy = (obj, cache = []) => {
  if (obj === null) {
    return undefined;
  }

  if (typeof obj !== "object") {
    return obj;
  }

  const objType = Object.prototype.toString.call(obj).slice(8, -1);

  // 考虑 正则对象的copy
  if (objType === "RegExp") {
    return new RegExp(obj);
  }

  // 考虑 Date 实例 copy
  if (objType === "Date") {
    return new Date(obj);
  }

  // 考虑 Error 实例 copy
  if (objType === "Error") {
    return new Error(obj);
  }

  const hit = cache.filter((c) => c.original === obj)[0];

  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};

  cache.push({ original: obj, copy });

  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
};

export default (data) => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const { code } = data[key];
      if (code === 200) {
        return deepCopy(data[key]);
      }
    }
  }
  return {};
};
