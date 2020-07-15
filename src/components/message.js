import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import lblue from "@material-ui/core/colors/lightBlue";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import { RandomNumber } from "../utils/utils";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    transformOrigin: "right bottom"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    borderRadius: "10px"
  },
  me: {
    backgroundColor: lblue[600],
    color: "rgba(255,255,255,0.9)"
  },
  date: {
    marginBottom: ".5em"
  },
  messageBox: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%"
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "70%"
    }
  }
}));

function Message(props) {
  const classes = useStyles();
  const from = props.from;
  let time = RandomNumber(3, 4) * 1000;

  const classNames = {
    [classes.paper]: true,
    [classes.me]: from === "Me"
  };

  return (
    <React.Fragment>
      <Grow in className={classes.root}>
        <Box
          display="flex"
          flexDirection={from === "Me" ? "row-reverse" : "row"}
          p={1}
        >
          <Box className={classes.messageBox}>
            <Paper className={classNames}>
              <div className={classes.date}>
                <Typography variant="caption" className={classes.date}>
                  {props.date}
                </Typography>
              </div>
              {props.message}
            </Paper>
          </Box>
        </Box>
      </Grow>
    </React.Fragment>
  );
}

export default Message;
