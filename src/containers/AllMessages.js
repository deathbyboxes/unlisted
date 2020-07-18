import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Button, Slide, Grid, Drawer, Modal, Paper } from '@material-ui/core';
import Thread from './Thread';
import Box from '@material-ui/core/Box';
import { sizing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,.03)',
    width: '100%'
  },
  paper: {
    width: '100%'
  }
}));

function AllMessages() {
  const[msgOpen, setMsgOpen] = React.useState(false)
  const classes = useStyles();
  function handleMsgOpen() {
    setMsgOpen(true)
  }

  function handleMsgClose() {
    setMsgOpen(false)
  }

  return(
    <>
      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="stretch" 
        className={classes.root}
      >
        <Grid item>
          <Button 
            onClick={ handleMsgOpen } 
            variant="contained" 
            color="secondary" 
            style={{top: "50%"}}
          >
            Open Message
          </Button>
        </Grid>
      </Grid>
      <Drawer 
        className={classes.root} 
        anchor="right" 
        elevation={3} 
        open={msgOpen} 
        ModalProps={{hideBackdrop:true}} 
        PaperProps={{className: classes.paper}}
      >
        <Thread closeMsg={ handleMsgClose } />
      </Drawer>
    </>
  )
}


export default AllMessages;