import "./index.less";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar
  // Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { Children, memo } from "react";

const MuiAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open, width }) => {
  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),

    ...(open && {
      marginLeft: width,
      width: `calc(100% - ${width}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  };
});
export default memo((props) => {
  const {
    open,
    width,
    onChange = () => {},
    windosWidth,
    user: { user: { id } = {} } = {},
    children
  } = props;
  return (
    <div className="header">
      <CssBaseline />
      <MuiAppBar position="fixed" open={open} width={width}>
        <Toolbar>
          {id ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onChange}
              edge="start"
              sx={{
                marginRight: 5,
                ...(windosWidth > 600 && open && { display: "none" })
              }}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : null}

          <div className="right-header">
            {Children.map(children, (child) => {
              return <>{child}</>;
            })}
          </div>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
});
