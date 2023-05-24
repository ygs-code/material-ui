/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:07:47
 * @FilePath: /react-ssr-lazy-loading/client/App/App.js
 * @Description:
 */
import "./index.less";
import "client/assets/css/base.less";
import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/roboto/400.css";
import "react-status-alert/dist/status-alert.css";

import Message from "client/component/Message";
import Routers from "client/router";
import React, { Component } from "react";
import { Provider } from "react-redux";

class Index extends Component {
  render() {
    const { history, store, routesComponent } = this.props;

    /*
  Warning: Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.
  来自Provider组件
  */
    return (
      <div>
        <Provider store={store}>
          <Routers
            level={1}
            history={history}
            routesComponent={routesComponent}
          />
        </Provider>
        <Message />
      </div>
    );
  }
  componentDidCatch(error, info) {
    console.error("Error：", error);
    console.error("错误发生的文件栈：", info.componentStack);
  }
}

// Index.propTypes = {
//     location: PropTypes.string,
//     store: PropTypes.object,
//     history: PropTypes.object,
//     dispatch: PropTypes.func,
//     state: PropTypes.object,
// };

export default Index;
