export default class Cursors {
  constructor(name) {
    this.name = name;

    this.cursorList = [];

    this.init();
  }
  init() {
    this.localCursor = this.createCursorConnection({
      id: null,
      name: this.name,
      color: null
    });
  }
  createCursorConnection({ id, name, color, v }) {
    return {
      id,
      name,
      color,
      v: v
    };
  }

  setLocalCursor(cursor = {}, cursorList) {
    this.localCursor = {
      ...this.localCursor,
      ...cursor
    };
    return this.setCursorList(this.localCursor, cursorList || this.cursorList);
  }

  setCursorList(cursor = {}, cursorList) {
    let index = this.cursorList.findIndex((item) => {
      return item.id === cursor.id;
    });

    if (index >= 0) {
      this.cursorList[index] = {
        ...this.cursorList[index],
        ...cursor
      };
    } else {
      this.cursorList = cursorList;
    }

    return {
      localCursor: this.localCursor,
      cursorList: this.cursorList,
      removeCursorList: []
    };
  }
  // 添加 光标
  addCursorList(cursor) {
    let flag = this.cursorList.some((item) => {
      return item.id === cursor.id;
    });

    if (!flag) {
      this.cursorList.push(cursor);
    }

    return this.setCursorList(cursor, this.cursorList);
  }

  removeCursorList(cursors) {
    for (let item of cursors) {
      this.cursorList = this.cursorList.filter(($item) => {
        return $item.id !== item.id;
      });
    }

    return {
      localCursor: this.localCursor,
      cursorList: this.cursorList,
      removeCursorList: cursors
    };
  }
}
