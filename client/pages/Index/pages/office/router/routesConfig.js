// 路由配置
export default [
  {
    path: "/office",
    exact: true,
    name: "office",
    entry: "/pages/Index/pages/office/index.js",
    level: 2,
    children: [
      {
        path: "/document",
        name: "officeDocument",
        entry: "/pages/Index/pages/office/pages/Document/index.js",
        level: 2,
        children: [
          {
            path: "/details/:action/:type/:id?",
            name: "officeDocumentDetails",
            entry: "/pages/Index/pages/office/pages/Document/details/index.js",
            level: 2,
            children: []
          }
        ]
      }
      // {
      //   path: "/role-management",
      //   name: "roleManagement",
      //   entry: "/pages/Index/pages/office/pages/RoleManagement/index.js",
      //   level: 2,
      //   children: [
      //     {
      //       path: "/details/:action/:id?",
      //       name: "roleManagementDetails",
      //       entry:
      //         "/pages/Index/pages/office/pages/RoleManagement/details/index.js",
      //       level: 2,
      //       children: []
      //     }
      //   ]
      // },
      // {
      //   path: "/permission-management",
      //   name: "permissionManagement",
      //   entry: "/pages/Index/pages/office/pages/PermissionManagement/index.js",
      //   level: 2,
      //   children: [
      //     {
      //       path: "/details/:action/:id?",
      //       name: "permissionManagementDetails",
      //       entry:
      //         "/pages/Index/pages/office/pages/PermissionManagement/details/index.js",
      //       level: 2,
      //       children: []
      //     }
      //   ]
      // },
      // {
      //   path: "/user-role",
      //   name: "userRole",
      //   entry: "/pages/Index/pages/office/pages/UserRole/index.js",
      //   level: 2,
      //   children: [
      //     {
      //       path: "/details/:action/:id?",
      //       name: "userRoleDetails",
      //       entry: "/pages/Index/pages/office/pages/UserRole/details/index.js",
      //       level: 2,
      //       children: []
      //     }
      //   ]
      // },
      // {
      //   path: "/role-permission",
      //   name: "rolePermission",
      //   entry: "/pages/Index/pages/office/pages/RolePermission/index.js",
      //   level: 2,
      //   children: [
      //     {
      //       path: "/details/:action/:id?",
      //       name: "rolePermissionDetails",
      //       entry:
      //         "/pages/Index/pages/office/pages/RolePermission/details/index.js",
      //       level: 2,
      //       children: []
      //     }
      //   ]
      // }
    ]
  }
];
