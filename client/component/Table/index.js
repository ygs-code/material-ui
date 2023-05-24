/*
 * @Author: your name
 * @Date: 2021-08-23 19:39:29
 * @LastEditTime: 2021-08-26 11:33:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Table/index.js
 */

import "./index.less";

import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

const Table = (props) => {
  const { columns = [], dataSource = [] } = props;
  console.log("props==", props);
  return (
    <div className="ant-table-wrapper">
      <div className="ant-spin-nested-loading">
        <div className="ant-spin-container">
          <div className="ant-table">
            <div className="ant-table-container">
              <div className="ant-table-content">
                <table style={{ tableLayout: "auto" }}>
                  <thead className="ant-table-thead">
                    <tr>
                      {columns.map((item, index) => {
                        const { dataIndex, key, title, width, style } = item;
                        return (
                          <th
                            key={key || dataIndex || index}
                            style={{
                              ...style,
                              ...(width ? { width } : {})
                            }}
                            className="ant-table-cell">
                            {title}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {dataSource.map((item, index) => {
                      return (
                        <tr
                          data-row-key={index}
                          key={index}
                          className="ant-table-row ant-table-row-level-0">
                          {columns.map(($item, $index) => {
                            const {
                              dataIndex,
                              render,
                              width,
                              style = {}
                            } = $item;
                            return (
                              <td
                                key={`${index}_${$index}`}
                                className="ant-table-cell"
                                style={{
                                  ...style,
                                  ...(width ? { width } : {})
                                }}>
                                {render
                                  ? render(item[dataIndex], item)
                                  : item[dataIndex]}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = (props) => {
  const {
    columns,
    tableProps = {},
    // paginationProps = {},
    data: {
      list = [],
      pageNum = 1,
      pageSize = 10,
      // pages,
      total = 0
    } = {},
    // onChange = () => {},
    // onSelect = () => {}
    // rowSelection = {},
    // isShowSelect,
    // rowKey,
    onChange = () => {},
    onSelect = () => {},
    readOnly
  } = props;
  const {
    rowSelection = {},
    isShowSelect,
    rowKey
    // onChange = () => {},
    // onSelect = () => {}
  } = tableProps;

  const {
    onChange: rowSelectionOnSelect = () => {},
    onChange: rowSelectionOnSelectAll = () => {},
    selectedRowKeys: rowSelectionSelectedRowKeys = [],
    selectedRows: rowSelectionSelectedRows = []
  } = rowSelection;

  let [selectedRows, setSelectedRows] = useState([]);
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setSelectedRows(rowSelectionSelectedRows);
    setSelectedRowKeys(rowSelectionSelectedRowKeys);
  }, []);

  let $rowSelection = isShowSelect
    ? {
        selectedRowKeys,
        onSelect: (changeRow, selected, $selectedRows, nativeEvent) => {
          if (!rowKey) {
            return console.error("rowKey未设置，请设置表格rowKey");
          }
          if (selected) {
            selectedRows.push(changeRow);
            selectedRowKeys.push(changeRow[rowKey]);
          } else {
            let index = selectedRows.findIndex((item) => {
              return changeRow[rowKey] === item[rowKey];
            });

            selectedRows.splice(index, 1);
            selectedRowKeys.splice(index, 1);
          }
          setSelectedRows([...selectedRows]);
          setSelectedRowKeys([...selectedRowKeys]);
          rowSelectionOnSelect(changeRow, selected, $selectedRows, nativeEvent);
          onSelect(selectedRows, selectedRowKeys);
        },
        onSelectAll: (selected, $selectedRows, changeRows) => {
          if (!rowKey) {
            return console.error("rowKey未设置，请设置表格rowKey");
          }
          if (selected) {
            selectedRows = selectedRows.concat(changeRows);
          } else {
            selectedRows = selectedRows.filter((item) => {
              return !changeRows.some(($item) => {
                return item[rowKey] === $item[rowKey];
              });
            });
          }
          selectedRowKeys = selectedRows.map((item) => {
            return item[rowKey];
          });
          setSelectedRows([...selectedRows]);
          setSelectedRowKeys([...selectedRowKeys]);
          rowSelectionOnSelectAll(selected, $selectedRows, changeRows);
          onSelect(selectedRows, selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
          disabled: readOnly,
          // Column configuration not to be checked
          name: record.name
        })
      }
    : {};

  $rowSelection =
    Object.keys(rowSelection).length === 0 &&
    Object.keys($rowSelection).length === 0
      ? null
      : {
          ...rowSelection,
          ...$rowSelection
        };

  return (
    <div className="table-box">
      <div className="table">
        <Table
          {...tableProps}
          columns={columns}
          dataSource={list}
          rowSelection={$rowSelection}
          pagination={false}
        />
      </div>

      <div className="pagination-box">
        <Pagination
          className="ant-pagination ant-table-pagination ant-table-pagination-right ant-table-pagination-right"
          count={Math.ceil(total / 10)}
          page={pageNum}
          rowsPerPage={pageSize}
          onChange={(event, pageNum) => {
            onChange({
              pageNum,
              pageSize
            });
          }}
        />
      </div>
    </div>
  );
};

export default Index;
