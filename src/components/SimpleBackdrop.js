import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { UseOnlineStatus } from "../utils/useOnlineStatus";

export default function SimpleBackdrop() {
  const onlineStatus = UseOnlineStatus();

  const [open, setOpen] = React.useState(false);

  return (
    <div >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={onlineStatus}
      >
        <div className="backdrop">
        <CircularProgress color="inherit" />
        <h3>Looks like you are offline🔴!</h3>
        <h2>Check your internet connection</h2>
        </div>
      </Backdrop>
    </div>
  );
}
