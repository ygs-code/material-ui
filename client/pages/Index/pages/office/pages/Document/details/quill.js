import "quill/dist/quill.snow.css";
import "./quill-cursors.css";

import Quill from "quill";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);

class $Quill {
  constructor(
    { elId, onTextChange = () => {}, onSelectionChange = () => {} },
    quillOptions = {}
  ) {
    this.options = {};
    this.documentConnectionState = null;
    this.initQuill({ elId, onTextChange, onSelectionChange }, quillOptions);
  }
  initQuill(
    { elId, onTextChange = () => {}, onSelectionChange = () => {} },
    quillOptions
  ) {
    this.quill = new Quill(elId, quillOptions);
    this.cursorsModule = this.quill.getModule("cursors");
    // local -> server
    this.quill.on("text-change", (delta, oldDelta, source) => {
      onTextChange(delta, oldDelta, source);
    });
    // 选择设置光标
    this.quill.on("selection-change", (range, oldRange, source) => {
      onSelectionChange(range, oldRange, source);
      //   this.sendCursorData(range, "selection-change");
    });
  }
  // 文本转 op
  convertTextToDelta(text) {
    this.quill.setText(text);
    return this.getDelta();
  }
  // html 转 op
  convertHtmlToDelta = (html) => {
    let delta = this.quill.clipboard.convert(html);
    return delta;
  };

  // op 转 html
  convertDeltaToHtml = (delta) => {
    this.setContents(delta);
    return this.getHtml();
  };
  // 删除光标
  removeCursor(id) {
    this.cursorsModule.removeCursor(id);
  }
  // 设置光标
  setCursor(...ags) {
    this.cursorsModule.setCursor(...ags);
  }
  getDelta() {
    let delta = this.quill.getContents();
    return delta;
  }
  getText() {
    return this.quill.getText();
  }
  getHtml() {
    return this.quill.root.innerHTML;
  }
  setContents(delta) {
    // update editor contents  更新文本内容
    this.quill.setContents(delta);
  }

  registerTextChangeListener() {
    this.cursorsModule.registerTextChangeListener();
  }
  getSelection() {
    var range = this.quill.getSelection();
    return range;
  }
  // 更新文本
  updateContents(op) {
    this.quill.updateContents(op);
  }
  enable() {
    this.quill.enable();
  }
}

export default $Quill;
