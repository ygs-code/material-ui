import { Drawer, SwipeableDrawer } from "@mui/material";
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
const openedMixin = (theme, width) => {
  return {
    width,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
  };
};

const closedMixin = (theme) => {
  return {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`
    }
  };
};

const MuiDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open"
})((props) => {
  const { theme, open, width } = props;

  return {
    width,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme, width),
      "& .MuiDrawer-paper": openedMixin(theme, width)
    }),
    ...(!open && {
      ...closedMixin(theme, width),
      "& .MuiDrawer-paper": closedMixin(theme, width)
    })
  };
});

export default (props) => {
  const { width, open, children, onChange = () => {}, windosWidth } = props;
  // const [windosWidth, setWindosWidth] = useState(
  //   document.documentElement.clientWidth
  // );

  // /*
  //  小于950是平板
  //  小于600是手机

  // */
  // const getWindosWidth = useCallback(async () => {
  //   await $stabilization(300);
  //   setWindosWidth(document.documentElement.clientWidth);
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", getWindosWidth);
  //   return () => {
  //     window.removeEventListener("resize", getWindosWidth);
  //   };
  // }, []);

  if (windosWidth >= 950) {
    return (
      <MuiDrawer width={width} key={"box"} variant="permanent" open={open}>
        {Children.map(children, (child) => {
          return <>{child}</>;
        })}
      </MuiDrawer>
    );
  } else if (windosWidth < 950 && windosWidth >= 600) {
    return (
      <Drawer
        key={"main"}
        sx={{
          width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        {Children.map(children, (child) => {
          return <>{child}</>;
        })}
      </Drawer>
    );
  }
  return (
    <SwipeableDrawer
      anchor={"top"}
      open={open}
      onClose={() => {
        onChange(false);
      }}
      onOpen={() => {
        onChange(true);
      }}>
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
    </SwipeableDrawer>
  );
};
