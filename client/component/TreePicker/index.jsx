// import "./index.less";

// import { ExclamationCircleOutlined } from "@ant-design/icons";
// import { Button, Modal } from "antd";
// import React, { Component } from "react";

// import TreeContent from "./TreeContent";

// const { confirm } = Modal;

// class Index extends Component {
//   constructor(props) {
//     super(props);
//     const { value = {} } = this.props;

//     this.state = {
//       loading: false,
//       isModalOpen: false,
//       valueChanged: false,
//       value,
//       cacheValue: value
//     };
//   }

//   componentDidMount() {}
//   showModal = async () => {
//     const { modalProps: { showModal = () => {} } = {} } = this.props;
//     this.setState(() => ({
//       loading: true
//     }));
//     await showModal();
//     this.setState({
//       isModalOpen: true,
//       loading: false
//     });
//   };
//   onOk = async () => {
//     const { modalProps: { onOk = () => {} } = {}, onChange = () => {} } =
//       this.props;
//     const { value = {} } = this.state;
//     this.setState(() => ({
//       loading: true
//     }));
//     await onOk({
//       ...value
//     });
//     this.setState({
//       isModalOpen: false,
//       loading: false,
//       cacheValue: {
//         ...value
//       },
//       value: {
//         ...value
//       }
//     });

//     onChange({
//       ...value
//     });
//   };
//   onCancel = async () => {
//     const { modalProps: { onCancel = () => {} } = {} } = this.props;
//     const { value, cacheValue } = this.state;

//     const { valueChanged } = value;

//     valueChanged &&
//       (await new Promise((resolve, reject) => {
//         confirm({
//           icon: <ExclamationCircleOutlined />,
//           content: "已选数据已更改，但未保存，您确定关闭吗？",
//           onOk() {
//             resolve();
//           },
//           onCancel() {
//             reject();
//           }
//         });
//       }));

//     await onCancel({
//       ...cacheValue,
//       valueChanged: false
//     });

//     this.setState({
//       isModalOpen: false,
//       loading: false,
//       value: {
//         ...cacheValue,
//         valueChanged: false
//       }
//     });
//   };

//   componentDidUpdate(preProps) {
//     const {
//       value: {
//         checkedChildrenKeys: prePropsCheckedChildrenKeys = [],
//         checkedKeys: prePropsCheckedKeys = []
//       } = {}
//     } = preProps;

//     const { value = {} } = this.props;

//     const { checkedChildrenKeys = [], checkedKeys = [] } = value;

//     if (
//       prePropsCheckedChildrenKeys.length !== checkedChildrenKeys.length ||
//       prePropsCheckedKeys.length !== checkedKeys.length
//     ) {
//       this.setState({
//         value
//       });
//     }
//   }

//   render() {
//     const {
//       modalProps = {},
//       buttonText = "请选择",
//       openButton = true,
//       readOnly,
//       isSelectLast = true
//     } = this.props;
//     const {
//       isModalOpen,
//       value: { checkedChildrenKeys = [], checkedKeys = [] } = {},
//       loading
//     } = this.state;

//     return (
//       <div className="tree-picker">
//         {openButton ? (
//           <>
//             <Button type="primary" onClick={this.showModal}>
//               {buttonText}
//             </Button>
//             <div>
//               <div key={"selected"} className="tree-picker-select">
//                 已选:{" "}
//                 <span>
//                   (
//                   {isSelectLast
//                     ? checkedChildrenKeys.length
//                     : checkedKeys.length}
//                   )
//                 </span>
//               </div>
//             </div>
//           </>
//         ) : null}

//         <Modal
//           destroyOnClose={true}
//           width={900}
//           title="Modal标题"
//           open={isModalOpen}
//           onCancel={this.onCancel}
//           onOk={this.onOk}
//           {...modalProps}
//           footer={[
//             <div key={"selected"} className="tree-picker-select">
//               已选:{" "}
//               <span>
//                 (
//                 {isSelectLast ? checkedChildrenKeys.length : checkedKeys.length}
//                 )
//               </span>
//             </div>,
//             <Button key="back" loading={loading} onClick={this.onCancel}>
//               关闭
//             </Button>,
//             !readOnly ? (
//               <Button
//                 key="submit"
//                 type="primary"
//                 loading={loading}
//                 onClick={this.onOk}>
//                 确定
//               </Button>
//             ) : null
//           ]}>
//           <div className="tree-picker-content">
//             <TreeContent
//               {...this.props}
//               onChange={(value) => {
//                 this.setState({
//                   value
//                 });
//               }}
//             />
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }

// export { TreeContent };
// export default Index;
