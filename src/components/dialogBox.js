import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField";
import { IoMdInformationCircleOutline } from "react-icons/io";

function DialogBox(props) {
  const [open, setOpen] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const textAreaRef = React.useRef(null);
  const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit (e) {
    console.log("submitting")
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

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.action}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Copy Conversation"}</DialogTitle>
        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/xeqrprzy"
          method="POST"
        >
          <DialogContent>
            <TextField 
              inputProps={ { ref: textAreaRef } }
              value={props.textCopy}
              rowsMax="5"
              multiline
              fullWidth
              name="conversation"
            />
            <DialogContentText id="alert-dialog-description">
              Press submit to send me your conversation!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button value="Submit" type="submit" color="primary" autoFocus>
              { status === "SUCCESS" ? <p>Thanks!</p> : "Send" }
              { status === "ERROR" && <p>Ooops! There was an error.</p> }
            </Button>
            
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
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
            the <IoMdInformationCircleOutline /> button 
            on the top right of the window to send me your conversation! 
            It will help me with further development.
            <br/><br/>
            Thank you so much! Enjoy!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Got It
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}

export default DialogBox;
