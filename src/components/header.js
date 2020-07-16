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

function Header({ contact, textCopy }) {
  const classes = useStyles();
  const [secOpen, setSecOpen] = React.useState(false)
  const [open, setOpen] = React.useState(true);

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
    <AppBar className={classes.root}>
      <Toolbar>
        <IconButton onClick={() => {handleOpen("convo")}} edge="start" color="inherit">
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
