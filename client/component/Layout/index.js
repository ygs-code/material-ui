import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  // AppBar,
  Box,
  CssBaseline,
  Divider,
  IconButton
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
  // rgbToHex
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import AccountMenu from "client/component/AccountMenu";
import Header from "client/component/Header";
import Menu from "client/component/Menu/index.js";
import { mapRedux } from "client/redux/index";
import { stabilization } from "client/utils";
import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useState
} from "react";

import Main from "./Main";
import Sider from "./Sider";

const $stabilization = stabilization();

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

// const MuiAppBar = styled(AppBar, {
//   shouldForwardProp: (prop) => prop !== "open"
// })(({ theme, open, width }) => {
//   return {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),

//     ...(open && {
//       marginLeft: width,
//       width: `calc(100% - ${width}px)`,
//       transition: theme.transitions.create(["width", "margin"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen
//       })
//     })
//   };
// });

const Index = (props) => {
  const {
    children,
    state: { user: { userInfo = {} } = {} } = {},
    menuProps = {},
    mainProps = {},
    headerProps = {},
    siderProps = {},
    HeaderComponent = null
  } = props;
  const { user: { id } = {} } = userInfo;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(
    document.documentElement.clientWidth < 600 ? 0 : 240
  );

  const [windosWidth, setWindosWidth] = useState(
    document.documentElement.clientWidth
  );

  /*
   小于950是平板
   小于600是手机
  */
  const getWindosWidth = useCallback(async () => {
    await $stabilization(300);
    if (document.documentElement.clientWidth < 600) {
      setWidth(0);
    } else {
      setWidth(240);
    }

    setWindosWidth(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getWindosWidth);
    return () => {
      window.removeEventListener("resize", getWindosWidth);
    };
  }, []);

  const onChangeDrawerOpen = useCallback(async () => {
    setOpen(!open);
  }, [open]);

  return (
    <Box sx={{ display: "flex" }}>
      {/*顶部*/}

      <Header
        {...headerProps}
        user={{ ...userInfo }}
        open={open}
        width={width}
        windosWidth={windosWidth}
        onChange={onChangeDrawerOpen}
        onClick={(type) => {
          console.log("type=", type);
        }}>
        {HeaderComponent ? (
          <HeaderComponent
            open={open}
            width={width}
            windosWidth={windosWidth}
            onChange={onChangeDrawerOpen}></HeaderComponent>
        ) : (
          <div className="account-menu-box">
            <AccountMenu {...props} onClick={() => {}} user={{ ...userInfo }} />
          </div>
        )}
      </Header>
      <CssBaseline />

      {/*菜单*/}

      {id ? (
        <Sider
          {...siderProps}
          open={open}
          width={width}
          windosWidth={windosWidth}
          onChange={() => {
            onChangeDrawerOpen();
          }}>
          <DrawerHeader>
            <IconButton onClick={onChangeDrawerOpen}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <Menu
            {...menuProps}
            onChange={(flag) => {
              setOpen(flag);
            }}
            open={open}
            width={width}
            windosWidth={windosWidth}
          />
        </Sider>
      ) : null}

      {/*中间子页面*/}
      <Main
        user={{ ...userInfo }}
        sx={{
          height: "calc(100vh - 30px)",
          overflow: "auto"
        }}
        menuProps={menuProps}
        mainProps={mainProps}
        open={open}
        width={width}
        windosWidth={windosWidth}>
        {Children.map(children, (child) => {
          return cloneElement(child, props);
          // return child;
        })}
      </Main>
    </Box>
  );
};

// 装饰器
export const layout = (props = {}) => {
  return (Component) => {
    return class extends React.Component {
      render() {
        return (
          <Index {...this.props} {...props}>
            <Component {...this.props} {...props} />
          </Index>
        );
      }
    };
  };
};

export default mapRedux(["user"])(Index);
// mapRedux(["user"])(Index);
