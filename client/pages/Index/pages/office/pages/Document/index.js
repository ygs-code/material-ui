import { Button, TextField } from "@mui/material";
import {
  createDocument,
  getDocumentList,
  removeDocument
} from "client/assets/js/request";
import Actions from "client/component/Actions";
import Dialog from "client/component/Dialog";
import FormItem from "client/component/FormItem";
import { layout } from "client/component/Layout";
import Message from "client/component/Message";
import setBreadcrumbAndTitle from "client/component/setBreadcrumbAndTitle";
import { tablePage } from "client/component/TablePage";
import Tabs from "client/component/Tabs";
import { addRouterApi } from "client/router";
import { createForm } from "rc-form";
import React, { Component, useState } from "react";

const Create = createForm()((props) => {
  const [open, setOpen] = useState(false);
  const { form, confirm } = props;
  const { validateFields } = form;

  return (
    <div>
      <Dialog
        confirm={() => {
          validateFields(async (error, values) => {
            if (!error) {
              await createDocument(values);

              Message.success("文档创建成功");
              setOpen(false);
              confirm();
            } else {
              console.error(error);
            }
          });
        }}
        open={open}
        cancel={() => {
          setOpen(false);
        }}
        title="创建文档"
        sx={{
          width: 500,
          height: 100
        }}>
        <FormItem
          className="padding-top-15"
          rules={[
            {
              required: true,
              message: "请输入文档标题"
            },
            {
              validator: (rule, value = "") => {
                if (!value.trim()) {
                  return Promise.reject("请输入文档标题");
                }

                return Promise.reject();
              }
            }
          ]}
          label="文档标题"
          form={form}
          // span={24}
          name="title">
          <TextField
            required
            fullWidth
            placeholder="请输入文档标题"
            variant="outlined"
          />
        </FormItem>
      </Dialog>

      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}>
        创建文档
      </Button>
    </div>
  );
});

// 权限控制
@setBreadcrumbAndTitle({
  //设置面包屑和标题
  breadcrumb: [
    {
      label: "文档"
    }
  ],
  title: "文档"
})
@addRouterApi
@layout()
@tablePage
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsValue: "all",
      open: false
    };
  }

  // // 获取默认搜索参数
  // getDefaultSearchParams = () => {
  //   return {
  //     status: ""
  //   };
  // };

  // 定义搜索栏字段
  getSearchFields() {
    return [
      {
        label: "文档标题",
        name: "title",
        type: "input",
        span: 1
      }
    ];
  }

  // 定义Tab字段
  getTabFilterItems = () => {
    return [];
  };

  // 定义表头字段
  getColumns = () => {
    const {
      pushRoute,
      routePaths: { officeDocumentDetails }
    } = this.props;

    return [
      {
        title: "文档标题",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "创建人",
        dataIndex: "createBy",
        key: "createBy"
      },

      {
        title: "操作",
        dataIndex: "actions",
        key: "actions",
        width: 120,
        render: (text, row) => {
          const { id } = row;

          return (
            <Actions
              options={[
                {
                  label: "编辑",
                  type: "edit",
                  onClick: () => {
                    pushRoute({
                      path: officeDocumentDetails,
                      isOpenWin: true,
                      params: {
                        action: "edit",
                        id,
                        type: "document"
                      } // 地址传参
                    });
                  }
                },
                {
                  label: "删除",
                  type: "remove",
                  onClick: async () => {
                    const { message: mgs } = await removeDocument(id);
                    Message.success(mgs);

                    this.loadTableData();
                  }
                },
                {
                  label: "查看",
                  type: "view",
                  onClick: () => {
                    pushRoute({
                      path: officeDocumentDetails,
                      params: {
                        action: "view",
                        id,
                        type: "document"
                      } // 地址传参
                    });
                  }
                }
              ]}
            />
          );
        }
      }
    ];
  };

  /**
   * 定义表格的数据加载功能
   */
  tableDataLoader = async (searchParams = {}) => {
    const { tabsValue } = this.state;

    const { data } = await getDocumentList({
      ...searchParams,
      createBy: tabsValue
    });

    return data;
  };

  getTableProps = () => {
    return {};
  };
  componentDidMount() {}
  render() {
    const { tabsValue } = this.state;
    return (
      <div className="table-page">
        <Create
          {...this.props}
          confirm={() => {
            this.loadTableData();
          }}
        />
        <Tabs
          onChange={(value) => {
            this.setState(
              {
                tabsValue: value
              },

              () => {
                this.onResetForm();
                this.loadTableData();
              }
            );
          }}
          value={tabsValue}
          items={[
            {
              label: "全部文档",
              value: "all"
            },
            {
              label: "我的文档",
              value: "my"
            }
          ]}></Tabs>
        {this.renderSearch({
          shrinkLength: 5,
          initialValues: {
            type: ""
          }
        })}
        {this.renderTable({
          rowKey: "id"
        })}
      </div>
    );
  }
}
export default Index;
