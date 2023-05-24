import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import React, { Children } from "react";

export default (props) => {
  const { cancel, confirm, open = false, title, children, sx } = props;

  return (
    <div>
      <Dialog open={open} onClose={cancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={sx}>
          {Children.map(children, (child) => {
            return <> {child}</>;
          })}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              cancel();
            }}
            variant="outlined">
            取消
          </Button>
          <Button onClick={confirm} variant="contained">
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
