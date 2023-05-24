import { CheckDataType } from "client/utils/CheckDataType";

class XHR {
  static defaultConfig = {
    timeout: 3000,
    withCredentials: true
  };
  constructor() {
    // const { method = 'POST', url = '' } = options;
    // this.defaultConfig={
    //     timeout:3000,
    // }
    // this.options ={
    //     ...this.defaultConfig,
    //     ...options,
    // }
  }
  // init() {
  //     this.createXHR();
  //     this.setTimeout();
  //     this.setWithCredentials();
  //     this.open();
  //     this.setRequestHeader();
  //     this.send();
  // }
  ininData(options) {
    // this.defaultConfig = {
    //   timeout: 300000,
    //   withCredentials: true,
    // };
    this.options = {
      ...XHR.defaultConfig,
      ...options
    };
    return this;
  }
  queryStringify(data) {
    const keys = Object.keys(data);
    let formStr = "";
    if (keys.length === 0) {
      return formStr;
    }
    keys.forEach((key) => {
      if (data[key] === undefined || data[key] === null) {
        return;
      }
      formStr += `&${key}=${
        CheckDataType.isObject(data[key])
          ? JSON.stringify(data[key])
          : data[key]
      }`;
    });
    return formStr.substr(1);
  }
  // 发送http请求
  xhRequest(options) {
    if (CheckDataType.isPromise(options)) {
      options
        .then((options) => {
          this.ininData(options);
          this.createXHR();
          this.setTimeout();
          this.setWithCredentials();
          this.setXhrAttr();
          this.open();
          this.setRequestHeader();
          this.change();
          this.send();
        })
        .catch((errorInfo) => {
          const { error = () => {} } = errorInfo;
          console.error("http 请求异常,未发送http请求。", errorInfo);
          error(options);
        });
    } else {
      options = CheckDataType.isFunction(options) ? options() : options;
      this.ininData(options);
      this.createXHR();
      this.setTimeout();
      this.setWithCredentials();
      this.setXhrAttr();
      this.open();
      this.setRequestHeader();
      this.change();
      this.send();
    }
    return this;
  }
  uploadFile() {
    const { parameter = {} } = this.options;
    let formData = new FormData();
    const keys = Object.keys(parameter);
    keys.forEach((key) => {
      formData.append(key, parameter[key]);
    });

    this.createXHR();
    this.setTimeout();
    this.setWithCredentials();
    this.setXhrAttr();
    this.open();
    this.setRequestHeader();
    try {
      this.xmlHttp.onprogress = this.updateProgress;
    } catch (e) {
      try {
        this.xmlHttp.upload.onprogress = this.updateProgress;
      } catch (e) {
        console.log("浏览器不支持上传进度条监控！");
      }
    }
    this.change();
    this.send(formData);
    return this;
  }
  updateProgress(event) {
    const { updateProgress = () => {} } = this.options;
    if (event.lengthComputable) {
      let percentComplete = event.loaded / event.total;
      updateProgress(percentComplete, event);
    }
  }
  // 创建XHR
  createXHR() {
    const {
      parameter: { operationName } = {},
      urlSuffix,
      headers: { token }
    } = this.options;

    let xmlHttp = null;
    let errorMessage = [];
    if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        xmlHttp = new window.ActiveXObject("MSXML2.xmlHttp");
      } catch (e) {
        errorMessage.push(e);
        try {
          xmlHttp = new window.ActiveXObject("Microsoft.xmlHttp");
        } catch (e2) {
          errorMessage.push(e2);
          console.error(...errorMessage, "浏览器不支持xhr请求");
          xmlHttp = null;
        }
      }
    }
    // 插入请求队列中
    if (token) {
      XHR.XHRQueue = XHR.XHRQueue
        ? [
            ...XHR.XHRQueue,
            {
              operationName,
              urlSuffix,
              xmlHttp
            }
          ]
        : [
            {
              operationName,
              urlSuffix,
              xmlHttp
            }
          ];
    }
    this.xmlHttp = xmlHttp;
  }
  // 设置 xhr属性
  setXhrAttr() {
    const { xhrAttr = {} } = this.options;
    const keys = Object.keys(xhrAttr);
    keys.forEach((key) => {
      this.xmlHttp[key] = xhrAttr[key];
    });
  }
  // xhr 打开
  //发送数据
  open() {
    const {
      url = "",
      method = "POST",
      async = true,
      parameter = {}
    } = this.options;

    this.xmlHttp.open(
      method,
      method === "GET"
        ? url +
            (this.queryStringify(parameter)
              ? `?${this.queryStringify(parameter)}`
              : "")
        : url,
      async
    );
  }
  // 设置请求头
  setRequestHeader(defaultHeaders = {}) {
    let { headers = {} } = this.options;
    headers = {
      ...defaultHeaders,
      ...headers
    };

    const keys = Object.keys(headers);
    keys.forEach((key) => {
      this.xmlHttp.setRequestHeader(key, headers[key]);
    });
  }
  // 设置跨域复杂请求cookie
  setWithCredentials() {
    const { withCredentials = false } = this.options;

    this.xmlHttp.withCredentials = withCredentials;
    this.xmlHttp.crossDomain = withCredentials;
  }
  // 设置请求过期时间
  setTimeout() {
    const { timeout = null } = this.options;
    if (timeout) {
      this.xmlHttp.timeout = timeout;

      this.onTimeout();
    }
  }
  // 过期时间相应
  onTimeout() {
    const { error = () => {}, complete = () => {} } = this.options;
    this.xmlHttp.ontimeout = function (event) {
      console.error("http请求超时！");
      complete(event);
      error(event);
    };
  }
  // 监听请求状态
  change() {
    this.xmlHttp.onreadystatechange = this.stateChange.bind(this);
  }
  // 监听请求状态
  stateChange() {
    const {
      success = () => {},
      error = () => {},
      dataType = "json",
      complete = () => {},
      urlSuffix,
      parameter: { operationName } = {}
    } = this.options;
    const XHRQueue = XHR.XHRQueue || [];
    if (this.xmlHttp.readyState === 4) {
      if (this.xmlHttp.status === 200) {
        // 从队列中剔除
        for (let index = XHRQueue.length - 1; index >= 0; index--) {
          //是graphq请求
          if (
            operationName &&
            XHRQueue[index].operationName === operationName
          ) {
            XHRQueue.splice(index, 1);
          } else if (XHRQueue[index].urlSuffix === urlSuffix) {
            XHRQueue.splice(index, 1);
          }
        }

        complete(
          dataType === "json"
            ? JSON.parse(this.xmlHttp.responseText)
            : this.xmlHttp.responseText,
          this.xmlHttp,
          {
            ...this.options,
            XHRQueue: XHR.XHRQueue || []
          }
        );

        success(
          dataType === "json"
            ? JSON.parse(this.xmlHttp.responseText)
            : this.xmlHttp.responseText,
          this.xmlHttp,
          {
            ...this.options,
            XHRQueue: XHR.XHRQueue || []
          }
        );
      } else {
        console.error("http 请求异常");
        console.log("this.xmlHttp=", this.xmlHttp);
        complete(this.xmlHttp.status, this.xmlHttp, {
          ...this.options,
          XHRQueue: XHR.XHRQueue || []
        });
        error(this.xmlHttp.status, this.xmlHttp, this.options);
      }
    } else {
      // complete(this.xmlHttp.status, this.xmlHttp);
      // error(this.xmlHttp.status, this.xmlHttp);
    }
  }
  // 停止请求
  abort() {
    this.xmlHttp.abort();
  }
  // 发送数据
  send() {
    let { parameter = {}, method, dataType = "json" } = this.options;
    if (!(parameter instanceof FormData)) {
      parameter =
        dataType === "json"
          ? JSON.stringify(parameter)
          : this.queryStringify(parameter); //this.queryStringify(data)
    }
    // const keys = Object.keys(data);
    // const formData = new FormData();
    // keys.forEach((key) => {
    //     formData.append(key, data[key]);
    // });
    // this.xmlHttp.responseType = 'json';
    if (method === "POST") {
      this.xmlHttp.send(parameter);
    } else {
      this.xmlHttp.send();
    }
    // data?this.xmlHttp.send(data):this.xmlHttp.send();
  }
}

export default XHR;
