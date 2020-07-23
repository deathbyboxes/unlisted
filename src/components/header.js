import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core";
import {deepPurple, green, deepOrange, blueGrey, cyan, teal} from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    textAlign: 'center',
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    textAlign: 'center',
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  green: {
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[800],
    textAlign: 'center',
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  blue: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: blueGrey[500],
    textAlign: 'center',
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  cyan: {
    color: theme.palette.getContrastText(cyan[700]),
    backgroundColor: cyan[700],
  },
  default: {
    color: theme.palette.getContrastText(teal[600]),
    backgroundColor: teal[600],
    textAlign: 'center',
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  }
}));

function Header({ tools, color }) {
  const classes = useStyles();

  return (
    <AppBar className={classes[color]}>
      <Toolbar>

        {tools}
      
      </Toolbar>
    </AppBar>
  );
}

export default Header;
