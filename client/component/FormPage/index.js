/*
 * @Author: your name
 * @Date: 2021-08-23 19:51:05
 * @LastEditTime: 2021-08-26 17:03:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Form/index.js
 */
import "./index.less";

import { Button } from "@mui/material";
import Form from "client/component/Form";
import React, { PureComponent } from "react";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  // defaultState = () => {
  //   return {
  //     loading: false
  //   };
  // };

  /**
   * 用于将form的字段值转换为接口需要的格式
   */
  mapSubmitData = (formData) => {
    return formData;
  };

  /**
   * 用于将从接口获取到的初始化数据，转换成form需要的格式
   * 这个函数需要在getInitData中手动调用，因此函数名不限于mapInitData
   */
  mapInitData = async (initData) => {
    return initData;
  };

  // 验证表单
  onValidaForm = async () => {
    const { validateFields } = this.form;

    await validateFields()
      .then(async (values) => {
        this.setState(() => {
          return {
            loading: true
          };
        });
        return await this.onSubmitForm(values).catch((error) => {
          throw error;
        });
      })
      .catch((error) => {
        this.setState({
          loading: false
        });
        console.error("error:", error);
      });
    this.setState({
      loading: false
    });
  };

  //    提交请求到接口
  onSubmitForm = async (formData) => {
    const data = await this.mapSubmitData(formData);
    console.log("formData=", data);
  };

  // 初始化表单
  getInitialValues = async () => {
    return await this.mapInitData({});
  };
  // 获取字段
  getFields = () => {
    return [];
  };
  // 底部按钮
  getFooter = () => {
    const {
      match: {
        params: { action }
      },
      history = {}
    } = this.props;

    const { loading } = this.state;

    const readOnly = action === "view";
    return (
      <div className="button-box">
        {!readOnly ? (
          <Button
            variant="contained"
            loading={loading}
            onClick={this.onValidaForm}>
            确认
          </Button>
        ) : null}
        <Button
          loading={loading}
          variant="outlined"
          onClick={() => {
            history.back();
          }}>
          返回
        </Button>
      </div>
    );
  };
  renderForm = (props = {}) => {
    return (
      <div className="form-page-component">
        <div className="form-box">
          <Form
            {...props}
            fields={this.getFields()}
            onReady={this.onFormReady}
            initialValues={async () => {
              const {
                match: {
                  params: { id }
                }
              } = this.props;
              return id === undefined ? {} : await this.getInitialValues();
            }}></Form>
        </div>
        {this.getFooter() ? (
          <div className="footer">{this.getFooter()}</div>
        ) : null}
      </div>
    );
  };
  onFormReady = (form) => {
    this.form = form;
  };

  render() {
    return (
      <div className="form-page-component">
        <div className="form-box">
          <Form fields={this.getFields()} onReady={this.onFormReady}></Form>
        </div>
        {this.getFooter() ? (
          <div className="footer">{this.getFooter()}</div>
        ) : null}
      </div>
    );
  }
}
