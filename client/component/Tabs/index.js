// import { Tabs } from "antd";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";

export default (props) => {
  const { items = [], onChange, value } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          {...props}
          onChange={onChange}
          aria-label="basic tabs example">
          {items.map((item, index) => {
            const { label, value, key, tab } = item;
            return (
              <Tab
                label={label}
                key={index}
                {...{
                  id: `simple-tab-${index}`,
                  "aria-controls": `simple-tabpanel-${index}`
                }}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
};
