import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  IoMdArrowRoundBack,
  IoMdInformationCircleOutline
} from "react-icons/io";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  title: {
    flexGrow: 1
  }
}));

function Header({ contact, action }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <IoMdArrowRoundBack />
        </IconButton>
        <Divider orientation="vertical" flexItem light />
        <Typography variant="h6" className={classes.title}>
          {contact}
        </Typography>
        <IconButton onClick={action} edge="end" color="inherit">
          <IoMdInformationCircleOutline />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
