// /*
//  * @Author: your name
//  * @Date: 2020-12-03 10:26:49
//  * @LastEditTime: 2021-08-25 14:59:21
//  * @LastEditors: Please set LastEditors
//  * @Description: In User Settings Edit
//  * @FilePath: /error-sytem/client/src/common/component/Breadcrumb/index.js
//  */
// import "./index.less";

// import { Breadcrumb } from "antd";
// import { addRouterApi } from "client/router";
// import React from "react";

// const { Item } = Breadcrumb;
// export default addRouterApi((props) => {
//   const { data = [], pushRoute } = props;
//   return (
//     <Breadcrumb className="breadcrumb">
//       {data.map((item, index) => {
//         const {
//           label,
//           href,
//           url,
//           path,
//           component,
//           params = {}, // 地址传参
//           query = {}, // get 传参
//           render
//         } = item;
//         return href || path || url ? (
//           <Item
//             key={index}
//             className="has-link"
//             onClick={() => {
//               (href || path || url) &&
//                 pushRoute({
//                   path: href || path || url,
//                   params,
//                   query
//                 });
//             }}>
//             {render ? render : component ? component : label ? label : null}
//           </Item>
//         ) : (
//           <Item key={index}>
//             {render ? render : component ? component : label ? label : null}
//           </Item>
//         );
//       })}
//     </Breadcrumb>
//   );
// });
