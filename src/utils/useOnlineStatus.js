import React, { useEffect, useState } from "react";

export function UseOnlineStatus() {
  const [onlineStatus,setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
        setOnlineStatus(false)
    });
    window.addEventListener("online", () => {
        setOnlineStatus(true)
    });
  }, []);

  return onlineStatus;
}
