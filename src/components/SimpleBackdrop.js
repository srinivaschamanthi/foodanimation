import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { UseOnlineStatus } from "../utils/useOnlineStatus";

export default function SimpleBackdrop() {
  const onlineStatus = UseOnlineStatus();

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={onlineStatus}
      >
        <CircularProgress color="inherit" />
        <h1>Looks like you ar offline🔴! Check your internet connection</h1>
      </Backdrop>
    </div>
  );
}
