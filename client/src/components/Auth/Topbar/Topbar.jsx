import classes from "./Topbar.module.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";

const Topbar = () => {
  return (
    <div className={classes.topbar}>
      <div className={classes.topbarWrapper}>
        <div className={classes.topLeft}>
          <span className={classes.logo}>KasraLogo</span>
        </div>
        <div className={classes.topright}>
          <div className={classes.TopbarIconContainer}>
            <NotificationsNoneIcon />
            <span className={classes.topbadgeicon}>2</span>
          </div>
          <div className={classes.TopbarIconContainer}>
            <SettingsIcon />
          </div>
          <img
            src="https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt=""
            className={classes.avatar}
          />
        </div>
      </div>
    </div>
  );
};
export default Topbar;
