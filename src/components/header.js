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
import DialogBox from "./dialogBox";
import {deepPurple, green, deepOrange, blueGrey} from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  green: {
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[800],
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  },
  blue: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: blueGrey[500],
    "& hr": {
      margin: theme.spacing(0, 2, 0, 0)
    }
  }
}));

function Header({ contact, textCopy, closeMsg, color }) {
  const classes = useStyles();
  const [secOpen, setSecOpen] = React.useState(false)
  const [open, setOpen] = React.useState(false);

  function handleOpen(btn) {
    if(btn==="convo")
      setSecOpen(true)
    else
      setOpen(true)
  }

  function handleClose (btn) {
    if(btn==="convo")
      setSecOpen(false)
    else
      setOpen(false)
  };

  return (
    <>
    <AppBar className={classes[color]}>
      <Toolbar>
        <IconButton onClick={closeMsg} edge="start" color="inherit">
          <IoMdArrowRoundBack />
        </IconButton>
        <Divider orientation="vertical" flexItem light />
        <Typography variant="h6" className={classes.title}>
          {contact}
        </Typography>
        <IconButton onClick={() => {handleOpen()}} edge="end" color="inherit">
          <IoMdInformationCircleOutline />
        </IconButton>
      </Toolbar>
    </AppBar>
    <DialogBox secOpen={secOpen} open={open} textCopy={textCopy} action={handleClose} />
    </>
  );
}

export default Header;
