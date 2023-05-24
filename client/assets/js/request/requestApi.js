/*
 * @Author: your name
 * @Date: 2020-12-14 10:03:45
 * @LastEditTime: 2022-06-09 14:12:19
 * @LastEditors: Yao guan shou
 * @Description: In User Settings Edit
 * @FilePath: /Blogs/BlogsAdmin/src/common/js/request/requestApi.js
 */
import { GraphqlClient } from "./request";

// 查询
export const query = (operationName, schema, parameter = {}, options = {}) => {
  return GraphqlClient.query(
    {
      operationName,
      query: schema,
      variables: parameter
    },
    {
      filterData: true,
      ...options
    }
  );
};

// 变异
export const mutation = (
  operationName,
  schema,
  parameter = {},
  options = {}
) => {
  return GraphqlClient.mutation(
    {
      operationName,
      mutation: `${schema}`,
      variables: parameter
    },
    {
      filterData: true,
      ...options
    }
  );
};

// 获取验证码
export const getVerifyCode = () => {
  return query(
    "getVerifyCode",
    ` query{
      getVerifyCode {
          code
          message
          data {
            svg
          }
        }
    }
  `
  );
};

// 注册用户
export const createUser = (parameter = {}) => {
  return mutation(
    "createUser",
    `
        mutation($parameter: CreateUserInput!) { 
          createUser(parameter: $parameter) {
              code
              message
            }
        }
    `,
    {
      parameter
    }
  );
};

//  编辑用户
export const editUser = (parameter = {}) => {
  return mutation(
    "editUser",
    `
      mutation ($parameter: EditUserInput!) {
        editUser(parameter: $parameter) {
          code
          message
        }
      }
    `,
    {
      parameter
    }
  );
};

// 删除用户
export const removeUser = (id) => {
  return mutation(
    "removeUser",
    `
      mutation  {
        removeUser(id: ${id}) {
          code
          message
        }
      }
    `
  );
};

// 登录
export const login = (parameter) => {
  const { password, name, verificationCode } = parameter;
  return mutation(
    "login",
    ` mutation{
        login(
          password:"${password}",
          name:"${name}",
          verificationCode:"${verificationCode}"
          ){
            code
            data {
              token 
              authKeys
              role{
                id 
                name 
                description 
              }
              permission{
                id 
                name 
                description 
                authKey 
              }
              user {
                  name
                  phone
                  id
              } 
            }
            message
          } 
   }
    `

    // {
    //   userInfo: parameter,
    // }
  );

  //return Request.post("/set/user/login", parameter);
};

// 登录
export const logOut = () => {
  return mutation(
    "logOut",
    ` mutation{
       logOut {
            code
            message
            data{
              flag
            }
          } 
   }
    `

    // {
    //   userInfo: parameter,
    // }
  );

  //return Request.post("/set/user/login", parameter);
};

// 获取用户列表
export const getUserList = (parameter = {}) => {
  // const { type = "" } = parameter;

  // const { type, pageName = 1, pageSize = 10 } = parameter;

  return query(
    "getUserList",
    `
    query($parameter: UserListInfoInput!){
      getUserList(parameter: $parameter) {
          code
          data {
            hasNextPage
            pageNum
            pageSize
            pages
            total
            list{
              name
              phone
              id
              type
              email
              createTime
              updateTime
            }
          }
          message
        } 
    }
  `,
    {
      parameter
    },
    {
      filterData: true
    }
  );
};

// 查询用户
export const getUserInfo = (parameter = {}) => {
  const { id = "" } = parameter;
  return query(
    "getUserInfo",
    `
      query{
          getUserInfo(id: "${id}") {
            code
            data {
              token 
              authKeys
              role{
                id 
                name 
                description 
              }
              permission{
                id 
                name 
                description 
                authKey 
              }
              user {
                  name
                  phone
                  id
                  email
                  type
              } 
            }
            message
          } 
      }
    `,
    {},
    {
      filterData: true
    }
  );
};

// 获取角色列表
export const getRoleList = (parameter = {}) => {
  return query(
    "getRoleList",
    `
    query($parameter: ListInfoInput!){
      getRoleList(parameter: $parameter) {
          code
          data {
            hasNextPage
            pageNum
            pageSize
            pages
            total
            list{
              name
              id
              description
              createTime
              updateTime
            }
          }
          message
        } 
    }
  `,
    {
      parameter
    },
    {
      filterData: true
    }
  );
};

// 查询角色
export const getRoleInfo = (parameter = {}) => {
  const { id = "" } = parameter;
  return query(
    "getRoleInfo",
    `
      query{
        getRoleInfo(id: "${id}") {
            code
            data {
                id 
                name 
                description
                createTime 
                updateTime
            }
            message
          } 
      }
    `,
    {},
    {
      filterData: true
    }
  );
};

//  编辑角色
export const createRole = (parameter = {}) => {
  return mutation(
    "createRole",
    `
      mutation ($parameter: RoleCreateInput!) {
        createRole(parameter: $parameter) {
          code
          message
        }
      }
    `,
    {
      parameter
    }
  );
};

//  编辑角色
export const editRole = (parameter = {}) => {
  return mutation(
    "editRole",
    `
      mutation ($parameter: RoleEditInput!) {
        editRole(parameter: $parameter) {
          code
          message
        }
      }
    `,
    {
      parameter
    }
  );
};

//  编辑角色
export const removeRole = (id) => {
  return mutation(
    "removeRole",
    `
      mutation  {
        removeRole(id: ${id}) {
          code
          message
        }
      }
    `
  );
};

// 获取权限列表
export const getPermissionList = (parameter = {}) => {
  // const { type = "" } = parameter;

  // const { type, pageName = 1, pageSize = 10 } = parameter;

  return query(
    "getPermissionList",
    `
    query($parameter: ListInfoInput!){
      getPermissionList(parameter: $parameter) {
          code
          data {
            hasNextPage
            pageNum
            pageSize
            pages
            total
            list{
              name
              id
              description
              authKey 
              parentId
              createTime
              updateTime
            }
          }
          message
        } 
    }
  `,
    {
      parameter
    },
    {
      filterData: true
    }
  );
};

// 查询权限
export const getPermissionInfo = (parameter = {}) => {
  const { id = "" } = parameter;
  return query(
    "getPermissionInfo",
    `
      query{
        getPermissionInfo(id: "${id}") {
            code
            data {
                id 
                name 
                authKey
                parentId
                description
                createTime 
                updateTime
            }
            message
          } 
      }
    `,
    {},
    {
      filterData: true
    }
  );
};

//  创建权限
export const createPermission = (parameter = {}) => {
  return mutation(
    "createPermission",
    `
      mutation ($parameter: PermissionCreateInput!) {
        createPermission(parameter: $parameter) {
          code
          message
        }
      }
    `,
    {
      parameter
    }
  );
};

//  删除权限
export const removePermission = (id) => {
  return mutation(
    "removePermission",
    `
      mutation   {
        removePermission(id: ${id}) {
          code
          message
        }
      }
    `
  );
};

//  编辑权限
export const editPermission = (parameter = {}) => {
  return mutation(
    "editPermission",
    `
      mutation ($parameter: PermissionEditInput!) {
        editPermission(parameter: $parameter) {
          code
          message
        }
      }
    `,
    {
      parameter
    }
  );
};

// 获取用户_权限列表
export const getUserRoleList = (parameter = {}) => {
  // const { type = "" } = parameter;

  // const { type, pageName = 1, pageSize = 10 } = parameter;

  return query(
    "getUserRoleList",
    `
    query($parameter: ListInfoInput!){
      getUserRoleList(parameter: $parameter) {
          code
          data {
            hasNextPage
            pageNum
            pageSize
            pages
            total
            list{
              id
              userId
              roleId 
              createTime
              updateTime
            }
          }
          message
        } 
    }
  `,
    {
      parameter
    },
    {
      filterData: true
    }
  );
};

// 获取用户_权限详情

export const getUserRoleInfo = (parameter = {}) => {
  const { id = "" } = parameter;
  return query(
    "getUserRoleInfo",
    `
      query{
        getUserRoleInfo(id: "${id}") {
            code
            data {
              id
              userId
              roleId 
              createTime
              updateTime
            }
            message
          } 
      }
    `,
    {},
    {
      filterData: true
    }
  );
};

//  创建或者编辑用户&角色
export const editUserRole = (parameter = {}) => {
  return mutation(
    "editUserRole",
    `
      mutation ($parameter: EditUserRoleInput!) {
        editUserRole(parameter: $parameter) {
          code
          message
        }
      }
    `,
    {
      parameter
    }
  );
};

// 获取角色_权限列表
export const getRolePermissionList = (parameter = {}) => {
  // const { type = "" } = parameter;

  // const { type, pageName = 1, pageSize = 10 } = parameter;

  return query(
    "getRolePermissionList",
    `
    query($parameter: ListInfoInput!){
      getRolePermissionList(parameter: $parameter) {
          code
          data {
            hasNextPage
            pageNum
            pageSize
            pages
            total
            list{
              id
              permissionId
              roleId 
              createTime
              updateTime
            }
          }
          message
        } 
    }
  `,
    {
      parameter
    },
    {
      filterData: true
    }
  );
};

export const editRolePermission = (parameter = {}) => {
  return mutation(
    "editRolePermission",
    `
      mutation ($parameter: EditRolePermissionInput!) {
        editRolePermission(parameter: $parameter) {
          code
          message
        }
      }
    `,
    {
      parameter
    }
  );
};

// 创建文档
export const createDocument = (parameter = {}) => {
  return mutation(
    "createDocument",
    `
        mutation($parameter: CreateDocumentInput!) { 
          createDocument(parameter: $parameter) {
              code
              message
              data {
                id
              }
            }
        }
    `,
    {
      parameter
    }
  );
};

// 获取文档列表
export const getDocumentList = (parameter = {}) => {
  // const { type = "" } = parameter;

  // const { type, pageName = 1, pageSize = 10 } = parameter;

  return query(
    "getDocumentList",
    `
    query($parameter: ListInfoInput!){
      getDocumentList(parameter: $parameter) {
          code
          data {
            hasNextPage
            pageNum
            pageSize
            pages
            total
            list{
              id
              title
              v
              updateBy
              createBy
              content
              type
              createTime
              updateTime
            }
          }
          message
        } 
    }
  `,
    {
      parameter
    },
    {
      filterData: true
    }
  );
};

// 获取验证码
export const checkLogin = () => {
  return query(
    "checkLogin",
    ` query{
      checkLogin {
          code
          message
          data {
            flag
          }
        }
    }
  `
  );
};

// 删除文档
export const removeDocument = (id) => {
  return mutation(
    "removeDocument",
    `
      mutation  {
        removeDocument(id: ${id}) {
          code
          message
        }
      }
    `
  );
};
