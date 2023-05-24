## TreePicker 弹窗使用说明

## 入参说明：

| 参数                  | 说明                                                         |
| :-------------------- | :----------------------------------------------------------- |
| readOnly              | 是否可以编辑控制 类型布尔值 false 为可以编辑，true 不可以编辑 |
| visible               | 控制弹窗显示或者影藏，布尔值 true 则显示，false 则隐藏       |
| checkedKeys           | 选中的 keys 值 数组                                          |
| mainKey               | 为 treeData 数据中的 key 字段，比如数据结构为[{value:'1',name:'hao'}],如果使用 manKey={'value'},当选中 checkedKeys 的时候就是获取到 value 的值 |
| titleKey              | 为 treeData 数据中的 title 显示字段，比如数据结构为[{value:'1',name:'hao'}],如果使用 titleKey={'name'},则显示 tree 的时候显示该字段 |
| onConfirm             | 回调函数则确认按钮中回调函数                                 |
| onCancel              | 取消或者关闭按钮的回调函数                                   |
| dataMapper            | 需要转义数据的函数，比如后台请求过来数据 data={code:200,message:‘成功’,list:[]},此时 tree 只需要的是 list，在 TreePicker 里面没有做数据转换，所以需要使用者自己 dataMapper=(data)=>{ return data.list } 这样返回一个数组 |
| serviceName           | 远程请请求 ajax 的 url key                                   |
| requestParam          | 远程请求 ajax 的参数                                         |
| modalProps            | modal 参数，具体请看 antd 官网参数                           |
| searchProps           | search 参数，具体请看 antd 官网参数                          |
| searchKeys            | 搜索参数的字段，比如数据格式为[{value:'1',name:'hao'}]，可以配置可以搜索字段为 ['value','name'] 默认为 ['title', 'key'] |
| isKeypadsSearchChange | 搜索时候是否一直触发改变 tree 树结构，默认为 true 则为搜索改变，false 时候只有按确定键或者是或者才会搜索 |
| treeProps             | tree 参数，具体请看 antd 官网参数                            |
| totalTitle            | 弹窗左侧标题 ， 例子： ‘一共有{n}条数据‘                     |
| selectedTitle         | 弹窗右侧标题，已选中的标题例子： '已选{n}条数据'             |
| keywordColor          | 搜索 tree，匹配的文字颜色 默认为 #f50                        |
| treeData              | tree 的 Data 数据，格式是树形结构，可以使用 promise 封装的 ajax。比如不想写 serviceName 请求，可以用 treeData=primiseAajax(url,data) 返回远程返回一个 promise 的数据结构，也可使用静态数据 treeData=[{value:'1',name:"aa",children:[]}] 内部已经做了数据结构转义判断。 |
| isSearchExpandAll     | 搜索的时候是否展开，默认为 true，                            |
| isShowSelectedAll     | 如果这个为true，则会显示上级上级tree选中的数据               |
| treeData  disabled    | treeData  item 的 disabled 如果为true的时候该条数据就会禁止选择 |

## onConfirm 回调函数，选中的参数说明

| 参数                     | 说明                                                          |
| :----------------------- | :------------------------------------------------------------ |
| searchTreeData           | tree 的 Data 数据，搜索结果过滤后的树形结构。                 |
| treeData                 | treeData 完成的树形结构。                                     |
| selectedTreeData         | 选中 treeData 中的所选的数据。包括父级的父级数据              |
| selectedChildrenTreeData | 选中 treeData 中的所选的数据。只含最底层的子级                |
| checkedKeys              | 选中 treeData 的 key，包括父级的父级 key                      |
| checkedChildrenKeys      | 选中 treeData 的 key，只含最底层的子级的 kye                  |
| checkedIndexKeys         | TreePicker 自带添加的 所选中的索引 key 包括父级的父级索引 key |
| checkedChildrenIndexKeys | TreePicker 自带添加的 所选中的索引 key 只含最底层的子级的 kye |
