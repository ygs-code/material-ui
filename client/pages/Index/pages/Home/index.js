import "./index.less";

import { Button } from "@mui/material";
import { layout } from "client/component/Layout";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import { addRouterApi } from "client/router";
import React from "react";

import one from "/client/static/img/2.png";
import four from "/client/static/img/4.png";

// 权限控制
export default setBreadcrumbAndTitle({
  //设置面包屑和标题
  breadcrumb: [
    {
      label: "主页"
    }
  ],
  title: "主页"
})(
  addRouterApi(
    layout()((props) => {
      const { pushRoute, routePaths } = props;
      const { officeDocument } = routePaths;

      return (
        <div className="home content">
          <div className="box">
            <div className="left-box">
              <div className="description">
                <h1>OT协同文档</h1>
                <h1>让协作更加高效，合作更加愉快</h1>
                <div>专注提供安全，实时，高效的文档服务</div>
                <div>socket实时通信，增量改动文档</div>
                <div>支持大数据，高并发集群部署</div>
                <div>不限协作人数使用</div>
                <Button
                  style={{
                    width: "150px"
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    pushRoute(officeDocument);
                  }}>
                  开始使用
                </Button>
              </div>
            </div>
            <div className="right-box">
              <img src={one} />
            </div>
          </div>
          <div
            className="box"
            style={{
              paddingTop: "60px"
            }}>
            <div className="left-box">
              <div className="description">
                <h1>开源免费使用与学习</h1>
                <div>如果你也想做一个ot协同文档，不妨可以来看看我项目</div>
                <div>前端一体化工程，用了很多新的技术点</div>
                <div>
                  前端：react， webpack脚手架搭建， graphql， http xhr
                  graphql封装，
                  redux模块化依赖注入封装。webpack构建微服务实现，react csr ssr
                  路由库实现
                </div>
                <div>
                  后台：webpack node脚手架实现， node ssr，node mvc server实现
                  redis，mysql，graphql， http链路请求，node 错误俘获，
                  docker容器部署
                </div>
                <div>
                  部署：自动化shell CI 脚本，docker docker-compose 容器部署
                </div>
                <div>
                  规范：eslint 和 stylelint，git提交工作流：git
                  hook+husky+commitlint+lint-staged
                </div>

                <Button
                  style={{
                    width: "150px"
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    textTransform: "lowercase"
                  }}
                  onClick={() => {
                    window.open("https://github.com/ygs-code/ot-system");
                  }}>
                  GitHub地址
                </Button>
              </div>
            </div>
            <div className="right-box">
              <img src={four} />
            </div>
          </div>
        </div>
      );
    })
  )
);
//
