// import { Divider, Select, Space, Spin } from "antd";
// import { stabilization } from "client/utils";
// import React, { useCallback, useEffect, useState } from "react";

// const Index = (props) => {
//   const {
//     loadData,
//     searchKey,
//     value,
//     selectProps,
//     onChange,
//     defaultOptions,
//     fieldNames = {},
//     dataMap,
//     readOnly
//   } = props;
//   const { value: valueKey = "id" } = fieldNames;
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [data, setData] = useState({});
//   const [searchValue, setSearchValue] = useState("");

//   const { list = [], pageNum = 0, pageSize = 10, hasNextPage = true } = data;

//   const getData = useCallback(
//     async (parameter = {}, defaultOptions = []) => {
//       setLoading(true);
//       const { data } = await loadData({
//         pageNum: pageNum + 1,
//         pageSize,
//         [searchKey]: searchValue,
//         ...parameter
//       });
//       setLoading(false);
//       setData(
//         dataMap({
//           ...data,
//           list: defaultOptions
//             .concat(list)
//             .concat(data.list)
//             .reduce((acc, item) => {
//               // 过滤重复数据
//               const flag = acc.some(($item) => {
//                 return `${$item[valueKey]}` === `${item[valueKey]}`;
//               });
//               acc = flag ? acc : [...acc, item];
//               return acc;
//             }, [])
//         })
//       );
//     },
//     [data, loading, searchValue]
//   );

//   useEffect(() => {
//     stabilization(300).then(() => {
//       getData(
//         {
//           pageNum: 1
//         },
//         searchValue.trim() === "" ? defaultOptions : []
//       );
//     });
//   }, [searchValue]);

//   useEffect(() => {
//     if (!open) {
//       //   setLoading(false);
//     } else if (hasNextPage) {
//       //   stabilization(300).then(() => {
//       //   getData();
//       //   });
//     }
//   }, [open, hasNextPage]);
//   return (
//     <Select
//       disabled={readOnly}
//       value={value}
//       open={open}
//       //   labelInValue
//       showSearch
//       filterOption={false}
//       onDropdownVisibleChange={() => {
//         // // 开 open 真    open 假 关
//         // if (open) {
//         //   setLoading(false);
//         // }
//         setOpen(!open);
//       }}
//       onSearch={(searchValue) => {
//         setData({
//           list: [],
//           pageNum: 0,
//           pageSize: 10,
//           hasNextPage: true
//         });
//         setSearchValue(searchValue);
//       }}
//       //   notFoundContent={loading ? <Spin size="small" /> : false}
//       options={list}
//       fieldNames={fieldNames}
//       allowClear
//       autoClearSearchValue
//       listHeight={200}
//       loading={loading}
//       //   showArrow={false}
//       onPopupScroll={(event) => {
//         const maxHeight = list.length * 12;
//         // 滚动到底部 再次请求
//         if (event.target.scrollTop >= maxHeight && hasNextPage && !loading) {
//           getData();
//         }
//       }}
//       onChange={(value) => {
//         onChange(value);
//       }}
//       dropdownRender={(node) => (
//         <>
//           {node}
//           {loading ? (
//             <>
//               <Divider
//                 style={{
//                   margin: "8px 0"
//                 }}
//               />
//               <Space
//                 style={{
//                   padding: " 0px 0px 0px 10px"
//                 }}>
//                 <Spin size="small" /> 数据加载中...
//               </Space>
//             </>
//           ) : null}
//         </>
//       )}
//       {...selectProps}
//     />
//   );
// };

// Index.defaultProps = {
//   dataMap: (data) => data,
//   onChange: () => {},
//   loadData: () => {},
//   searchKey: "",
//   selectProps: {},
//   defaultOptions: []
// };
// export default Index;
