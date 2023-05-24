import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, {
  Children,
  cloneElement
  // useCallback,
  // useEffect,
  // useState
} from "react";
// import { stabilization } from "client/utils";

// const $stabilization = stabilization();

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, width }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${width}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);
export default (props) => {
  const {
    width,
    open,
    children,
    onChange = () => {},
    windosWidth,
    p = 3,
    mainProps = {},
    sx = {},
    user: { user: { id } = {} } = {}
  } = props;

  console.log("menuProps=====", mainProps);
  return !id || windosWidth >= 950 ? (
    <Box
      component="main"
      key={"box"}
      sx={{ flexGrow: 1, p, ...sx }}
      {...mainProps}>
      <DrawerHeader />
      {Children.map(children, (child) => {
        return (
          <>
            {cloneElement(child, {
              windosWidth,
              onChangeOpen: onChange
            })}
          </>
        );
      })}
    </Box>
  ) : (
    <Main key={"main"} open={open} width={width} sx={{ ...sx }} {...mainProps}>
      <DrawerHeader />
      {Children.map(children, (child) => {
        return (
          <>
            {cloneElement(child, {
              windosWidth,
              onChangeOpen: onChange
            })}
          </>
        );
      })}
    </Main>
  );
};
