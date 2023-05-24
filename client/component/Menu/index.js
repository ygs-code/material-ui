import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DescriptionIcon from "@mui/icons-material/Description";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { addRouterApi } from "client/router";
import { findTreeData } from "client/utils";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)"
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit"
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired
};

export default addRouterApi((props) => {
  const { onChange = () => {}, open, routePaths, pushRoute } = props;
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState(["0-0"]);
  const menus = [
    {
      key: "0",
      title: "office文档",
      icon: DescriptionIcon,
      children: [
        {
          key: "0-0",
          title: "word文档",
          icon: DescriptionIcon,
          url: routePaths.officeDocument
        }
        // {
        //   key: "0-1",
        //   title: "excel工作表",
        //   icon: DescriptionIcon
        // },
        // {
        //   key: "0-2",
        //   title: "ppt演示稿",
        //   icon: DescriptionIcon
        // }
      ]
    }
  ];

  useEffect(() => {
    if (open === false) {
      setExpanded([]);
    }
  }, [open]);

  const runderTreeItem = (data = []) => {
    return data.map((item) => {
      const { children = [], title, url, icon, key, labelInfo } = item;

      if (children.length) {
        return (
          <StyledTreeItem
            nodeId={key}
            labelText={title}
            labelIcon={icon}
            labelInfo={labelInfo}
            key={key}
            // color="#1a73e8"
            // bgColor="#e8f0fe"
            onClick={() => {
              // pushRoute(url)
            }}>
            {runderTreeItem(children)}
          </StyledTreeItem>
        );
      }

      return (
        <StyledTreeItem
          nodeId={key}
          key={key}
          labelText={title}
          labelIcon={icon}
          labelInfo={labelInfo}
          color="#1a73e8"
          bgColor="#e8f0fe"
          onClick={() => {
            pushRoute(url);
          }}
        />
      );
    });
  };

  return (
    <TreeView
      onNodeSelect={(event, selected) => {
        const { children = [] } = findTreeData(
          menus, // 树形数组或者数组数据
          selected, // 需要查找的value
          "key" //需要查找数组对象的key
        );

        if (children.length) {
          return false;
        }
        setSelected([selected]);
      }}
      defaultSelected={selected}
      selected={selected}
      onNodeToggle={(event, expanded) => {
        if (expanded.length) {
          onChange(true);
        }
        setExpanded(expanded);
        // setSelected(expanded);
      }}
      expanded={expanded}
      aria-label="gmail"
      // defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}>
      {runderTreeItem(menus)}
      {/*
      <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
      <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
      <StyledTreeItem
        nodeId="3"
        labelText="Categories"
        labelIcon={DescriptionIcon}>
        <StyledTreeItem
          nodeId="5"
          labelText="Social"
          labelIcon={SupervisorAccountIcon}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Updates"
          labelIcon={InfoIcon}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="7"
          labelText="Forums"
          labelIcon={ForumIcon}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
        <StyledTreeItem
          nodeId="8"
          labelText="Promotions"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} />

        */}
    </TreeView>
  );
});
