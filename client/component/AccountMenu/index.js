import "./index.less";

import Logout from "@mui/icons-material/Logout";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { logOut } from "client/assets/js/request";
import Message from "client/component/Message";
import { addRouterApi } from "client/router";
import React, { useRef } from "react";

export default addRouterApi((props) => {
  const {
    user: { user: { id, name, phone } = {} } = {},
    onClick = () => {},
    routePaths,
    pushRoute
  } = props;

  const message = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="account-menu">
      <Message ref={message} />
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <span className="user-name">{name}</span>{" "}
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              // width: 32,
              // height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem
          onClick={() => {
            onClick(id ? "account" : "logIn");

            id ? null : pushRoute(routePaths.logIn);
          }}>
          <Avatar
            fontSize="small"
            sx={{
              color: "rgb(117, 117, 117)",
              width: 19,
              height: 19
            }}></Avatar>
          {id ? "账号:" + name : "请登录"}
        </MenuItem>

        {id ? (
          <>
            <MenuItem onClick={handleClose}>
              <PhoneIphoneIcon
                fontSize="small"
                sx={{ color: "rgb(117, 117, 117)", width: 24, height: 24 }}
              />{" "}
              手机:{phone}
            </MenuItem>
            <MenuItem
              onClick={() => {
                onClick("setIng");
              }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              设置
            </MenuItem>

            <MenuItem
              onClick={async () => {
                await logOut();

                message.current.success("注销成功");
                setTimeout(() => {
                  pushRoute(routePaths.logIn);
                }, 1500);
              }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              退出登录
            </MenuItem>
          </>
        ) : null}

        <Divider />
      </Menu>
    </div>
  );
});
