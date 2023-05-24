// import { Skeleton } from "antd";
import { Skeleton } from "@mui/material";
// import { checkLogin, getUserInfo } from "client/assets/js/request";
import { mapRedux } from "client/redux";
import { addRouterApi } from "client/router";
import React, { Children } from "react";

const Index = (props) => {
  const {
    children,
    loading,
    height = document.documentElement.clientHeight,
    itemHight = 60
  } = props;

  let arr = new Array(Math.ceil(height / itemHight)).fill(1);
  return loading
    ? arr.map((item, index) => {
        return <Skeleton height={itemHight} key={index} />;
      })
    : Children.map(children, (child) => {
        return <>{child}</>;
      });
};

export default mapRedux()(addRouterApi(Index));
