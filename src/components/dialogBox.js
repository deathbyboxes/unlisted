import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import { IoMdInformationCircleOutline, IoMdArrowRoundBack } from "react-icons/io";
import { Slider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function DialogBox(props) {
  const [status, setStatus] = React.useState('');
  const textAreaRef = React.useRef(null);
  const classes = useStyles();

  function handleSubmit (e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus("SUCCESS")
      } else {
        setStatus("ERROR")
      }
    };
    xhr.send(data);
  }

  function valuetext(value) {
    return `${value} stars`;
  }

  return (
    <div>
      <Dialog
        open={props.secOpen}
        onClose={() => {props.action("convo")}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Thanks so much!"}</DialogTitle>
        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/xeqrprzy"
          method="POST"
        >
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
            />
            <div className={classes.margin} />
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
            />
            <div className={classes.margin} />
            <TextField
              fullWidth
              label="Any comments for me?"
              name="comments"
              variant="outlined"
              multiline
              rowsMax="3"
            />
            <div className={classes.margin} />
            <Typography id="non-linear-slider" gutterBottom gutterTop>
              Rate the Conversation
            </Typography>
            <Slider
              fullWidth
              label="Rating"
              name="rating"
              step={1}
              min={1}
              max={5}
              defaultValue={3}
              marks
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
            />
            <div className={classes.margin} />
            <TextField 
              inputProps={ { ref: textAreaRef } }
              value={props.textCopy}
              fullWidth
              required
              variant="outlined"
              label="Full Conversation"
              name="conversation"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {props.action("convo")}} color="secondary">
              Cancel
            </Button>
            <Button value="Submit" type="submit" color="primary" autoFocus>
              { status === "SUCCESS" ? "Thanks!" : "Send" }
              { status === "ERROR" && "Ooops! There was an error." }
            </Button>
            
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={props.open}
        onClose={() => {props.action()}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Before You Begin!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You get a text from someone that says:
            <br/><br/>
            <b>"Hey, I'm not sure where Tony is, but you can try 
            this number, they might know where he's been.
            <br/>
            (907) 555-4323"</b>
            <br/><br/>
            Your goal, text this number to find out
            where Tony was last seen.
            <br/><br/>
            When you finish with the story, press 
            the <IoMdArrowRoundBack /> button 
            on the top right of the window to send me your conversation! 
            It will help me with further development.
            <br/><br/>
            Press the <IoMdInformationCircleOutline /> at any point
            to come back to these directions. Thanks! Enjoy!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {props.action()}} color="primary" autoFocus>
            Got It
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}

export default DialogBox;
