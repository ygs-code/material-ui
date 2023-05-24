/*
 * @Author: your name
 * @Date: 2021-08-23 19:39:29
 * @LastEditTime: 2021-08-26 17:03:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Table/index.js
 */

import "./index.less";

import { SearchForm } from "client/component/Form";
import Table from "client/component/Table";
import React from "react"; // , { memo, PureComponent }

// class TablePage extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tableData: {
//         list: [{ title: "你好" }]
//       },
//       dataSource: []
//     };
//   }
//   // 获取默认搜索参数
//   getDefaultSearchParams = () => {
//     return {
//       // status: ""
//     };
//   };

//   // 定义搜索栏字段
//   getSearchFields = () => {
//     return [];
//   };

//   // 定义Tab字段
//   getTabFilterItems = () => {
//     return [];
//   };

//   // 定义表头字段
//   // getColumns = () => {
//   //   return [];
//   // };

//   /**
//    * 定义表格的数据加载功能
//    */
//   tableDataLoader = async () => {
//     return {};
//   };

//   loadTableData = async (searchParams = {}) => {
//     return await this.tableDataLoader(searchParams);
//   };

//   getDataSource = () => {
//     return [];
//   };

//   getTableProps = () => {
//     return {};
//   };

//   componentDidMount() {
//   }

//   renderSearch = (props = {}) => {
//     const { shrinkLength = 5 } = props;
//     return (
//       <SearchForm
//         // shrinkLength={2}
//         {...props}
//         shrinkLength={shrinkLength}
//         fields={this.getSearchFields()}
//         type="search"
//         onReady={(form) => {
//           this.searchForm = form;
//         }}
//       />
//     );
//   };

//   renderTable = (props = {}) => {
//     return (
//       <Table
//         columns={this.getColumns ? this.getColumns() : []}
//         dataSource={this.getDataSource()}
//         // title={() => "Header"}
//         // footer={() => "Footer"}
//         {...this.getTableProps()}
//         {...props}
//       />
//     );
//   };
//   render() {
//     return (
//       <>
//         {this.renderSearch()} {this.renderTable()}
//       </>
//     );
//   }
// }

const tablePage = (Component) => {
  class TablePage extends Component {
    // state = {
    //   searchParams: {}
    // };
    constructor(props) {
      super(props);
      const { selectedRows = [], selectedRowKeys = [] } = this.state;
      this.state = {
        ...this.state,
        searchParams: {
          pageNum: 1,
          pageSize: 10
        },
        tableData: {},
        selectedRows,
        selectedRowKeys
      };
    }

    // // 获取默认搜索参数
    getDefaultSearchParams = () => {
      return {
        // status: ""
      };
    };

    // // 定义搜索栏字段
    // getSearchFields = () => {
    //   return [];
    // };

    // 定义Tab字段
    getTabFilterItems = () => {
      return [];
    };

    // // 定义表头字段
    // getColumns = () => {
    //   return [];
    // };

    /**
     * 定义表格的数据加载功能
     */
    // tableDataLoader = async () => {
    //   return {};
    // };

    checkTabelData = (data) => {
      let mapKey = [
        "hasNextPage",
        "list",
        "pageNum",
        "pageSize",
        "pages",
        "total"
      ];
      let index = -1;
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          index = mapKey.indexOf(key);
          if (index !== -1) {
            mapKey.splice(index, 1);
          }
        }
      }

      if (mapKey.length) {
        return `列表表格数据数据缺少${mapKey.join(",")}字段`;
      }
      return null;
    };

    checkAbstractFunction = () => {
      let checkFunction = [
        {
          name: "tableDataLoader",
          message: "tableDataLoader是抽象方法需要实现,请设置ajax请求列表"
        },

        {
          name: "getColumns",
          message: "getColumns是抽象方法需要实现,请配置表格columns"
        }
      ];

      for (let item of checkFunction) {
        const { name, message } = item;
        if (!this[name]) {
          return message;
        }
      }
      return null;
    };
    loadTableData = async (searchParams = {}) => {
      const { getFieldsValue } = this.searchForm;
      const { searchParams: stateSearchParams = {} } = this.state;
      let newSearchParams = {};

      if (this.getDefaultSearchParams) {
        searchParams = {
          ...this.getDefaultSearchParams(),
          ...stateSearchParams,
          ...searchParams
        };
      }

      this.setState(() => {
        return {
          searchParams
        };
      });

      const searchFormValue = getFieldsValue();

      if (Object.keys(searchFormValue).length) {
        searchParams = {
          ...searchParams,
          ...searchFormValue
        };
      }

      let errprMessage = this.checkAbstractFunction();
      if (errprMessage) {
        console.error(errprMessage);
        debugger;
        return;
      }

      if (!this.tableDataLoader) {
        console.error("tableDataLoader抽象方法需要实现");
        return;
      }

      //
      for (let key in searchParams) {
        if (searchParams.hasOwnProperty(key)) {
          if (
            searchParams[key] === null ||
            (searchParams[key] !== undefined &&
              searchParams[key].toString().trim() !== "")
          ) {
            newSearchParams[key] = searchParams[key];
          }
        }
      }
      const data = await this.tableDataLoader(newSearchParams);
      errprMessage = this.checkTabelData(data);
      if (errprMessage) {
        console.error(errprMessage);
        debugger;
        return;
      }
      this.setState({ tableData: data });
      return data;
    };

    getDataSource = () => {
      return [];
    };

    // getTableProps = () => {
    //   return {
    //     rowSelection: {
    //       onChange: (selectedRows, selectedRowKeys) => {
    //       },
    //       getCheckboxProps: (record) => ({
    //         disabled: record.name === "Disabled User",
    //         // Column configuration not to be checked
    //         name: record.name
    //       })
    //     }
    //   };
    // };

    componentDidMount(...ags) {
      super.componentDidMount(...ags);
    }

    componentWillUnmount(...ags) {
      super.componentDidMount(...ags);
    }

    onResetForm = () => {
      const { resetFields } = this.searchForm;
      resetFields();
      this.setState(() => ({
        searchParams: {
          pageNum: 1,
          pageSize: 10
        }
      }));
    };
    renderSearch = (props = {}) => {
      const { shrinkLength = 5 } = props;
      return (
        <SearchForm
          {...props}
          onConfirm={this.loadTableData}
          onReset={(searchParams) => {
            this.loadTableData(searchParams);
          }}
          shrinkLength={shrinkLength}
          fields={this.getSearchFields()}
          type="search"
          onReady={(form) => {
            this.searchForm = form;
            this.loadTableData();
          }}
        />
      );
    };

    onSelect = (selectedRows, selectedRowKeys) => {
      this.setState({
        selectedRows,
        selectedRowKeys
      });
    };
    renderTable = (props = {}) => {
      const { tableData } = this.state;
      let { tableProps = {}, paginationProps = {} } = props;
      let { readOnly } = this.props;

      tableProps = {
        ...tableProps,
        ...props,
        ...(this.getTableProps ? this.getTableProps() : {})
      };

      const { onSelect = () => {} } = tableProps;

      return (
        <Table
          readOnly={readOnly}
          tableProps={tableProps}
          // {...tableProps}
          columns={this.getColumns ? this.getColumns() : []}
          data={tableData}
          paginationProps={paginationProps}
          onChange={(searchParams) => {
            this.loadTableData(searchParams);
          }}
          onSelect={(selectedRows, selectedRowKeys) => {
            this.onSelect(selectedRows, selectedRowKeys);
            onSelect(selectedRows, selectedRowKeys);
          }}
        />
      );
    };
    // render() {
    //   return (
    //     <>
    //       {this.renderSearch()} {this.renderTable()}
    //     </>
    //   );
    // }
  }

  return TablePage;
};

// export default TablePage;

export { tablePage };
