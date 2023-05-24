/*
 * @Date: 2022-08-05 09:22:30
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-15 13:01:26
 * @FilePath: /react-ssr-lazy-loading/client/component/Head/index.js
 * @Description:
 */
import "./index.less";

import PropTypes from "prop-types";
import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.backRef = null;
    this.pixaldata = [];
    this.pixallife = 500;
  }
  draw = () => {
    //绘制粒子
    for (var i = 0; i < this.pixaldata.length; i++) {
      const pixal = this.pixaldata[i]; //指定当前粒子属性
      const children = this.backRef.children[i]; //指定当前子元素
      pixal.age++; //增加生命值
      if (pixal.age <= 10) {
        pixal.sy -= pixal.vy * 2;
      } else {
        pixal.sy += pixal.vy * 2; //设置位移距离
      }
      pixal.sx += pixal.vx * 2; //设置位移距离
      children.style.background = pixal.color; //设置背景颜色
      children.style.opacity = 100 / pixal.age;
      children.style.left = pixal.sx + "px"; //根据位移值设置坐标
      children.style.top = pixal.sy + "px";
      if (pixal.age >= this.pixallife) {
        //判断生命值是否超过生命周期
        this.pixaldata.splice(i, 1); //删除数组元素
        this.backRef.removeChild(this.backRef.childNodes[i]); //删除子元素
      }
    }

    //开启动画
    this.timr = requestAnimationFrame(this.draw);
  };
  onMousemove = (event) => {
    const { clientX, clientY } = event;
    //当鼠标移动时创建粒子
    var span = document.createElement("span"); //新建span作为粒子
    span.className = "pixal"; //使用pixal作为class设置
    this.backRef.appendChild(span); //将span作为子元素添加至#back层
    this.pixaldata.push({
      //插入对应的span信息
      age: 0, //初始生命值
      color:
        "rgba(" +
        parseInt(Math.random() * 255) +
        "," +
        parseInt(Math.random() * 255) +
        "," +
        parseInt(Math.random() * 255) +
        "," +
        parseInt(1) +
        ")", //粒子颜色
      // 随机散开
      vx: Math.random() * 0.5, //x轴位移速度
      vy: Math.random() * 0.75, //y轴位移速度，高于x轴以便使粒子移动方向更偏向下方
      sx: clientX, //根据鼠标坐标设置粒子的起始坐标
      sy: clientY
    });
  };
  componentDidMount() {
    window.addEventListener("mousemove", this.onMousemove);
    this.draw();
  }
  componentWillUnmount() {
    //关闭动画
    window.cancelAnimationFrame(this.timr);
    window.removeEventListener("mousemove", this.onMousemove);
  }
  render() {
    return (
      <div className="grain">
        <div
          className="back"
          ref={(ref) => {
            this.backRef = ref;
          }}></div>
      </div>
    );
  }
}

Index.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  state: PropTypes.object
};
export default Index;
