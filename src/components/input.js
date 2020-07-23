import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { IoMdSend } from "react-icons/io";
import { AppBar, Toolbar } from "@material-ui/core";
import { createDate, formatDate } from "../utils/utils";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: "1em",
    top: "auto",
    bottom: 0,
    backgroundColor: "#fff"
  },
  form: {
    width: "100%",
    padding: "10px 0",
    marginBlockEnd: "0"
  },
  input: {
    maxHeight: "150px",
    overflow: "auto !important"
  },
  border: {
    borderRadius: "25px"
  }
}));

const msg = {
  from: "",
  date: "",
  text: ""
};

function Input({action, phone}) {
  const classes = useStyles();
  const [message, setMessage] = React.useState(msg);

  function handleSubmit(event) {
    event.preventDefault();
    let t = new Date();
    let m = message;
    m.date = t;
    m.from = "Me";
    action(phone, m);
    setMessage(msg);
  }

  function handleChange(event) {
    const val = event.target.value;
    setMessage(prevState => {
      return { ...prevState, text: val };
    });
  }

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs>
              <FormControl fullWidth variant="outlined" size="small">
                <OutlinedInput
                  id="component-outlined"
                  placeholder="Your message..."
                  inputProps={{ className: classes.input }}
                  onChange={handleChange}
                  value={message.text}
                  className={classes.border}
                  margin="dense"
                />
              </FormControl>
            </Grid>
            <Grid item>
              <IconButton
                type="submit"
                name="Submit"
                color="primary"
                edge="end"
              >
                <IoMdSend />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Toolbar>
    </AppBar>
  );
}

export default Input;
