import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { List, Divider, Button, Grid, Drawer, Modal} from '@material-ui/core';
import Thread from './Thread';
import Box from '@material-ui/core/Box';
import { sizing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles'
import Highlight from '../components/highlight';

const msgState = {
  UNREAD: 0,
  READ: 1,
  DRAFT: 2
}

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

function AllMessages({allMessages}) {
  console.log(allMessages)
  const[msgOpen, setMsgOpen] = React.useState(false)
  const classes = useStyles();
  const threadContainerRef = React.useRef(null)
  function handleMsgOpen() {
    setMsgOpen(true)
  }

  function handleMsgClose() {
    setMsgOpen(false)
  }

  const threadHLs = allMessages.map((thread) => {
    console.log(thread.messages[thread.messages.length - 1])
    const info = {
      name: thread.name,
      phone: thread.phone,
      message: thread.messages[thread.messages.length - 1].message.substring(0,10)
    }
    return <Highlight info={info} />
  });

  return(
    <>
      <List>
        {threadHLs || null}
      </List>
      
      <Drawer 
        className={classes.root} 
        anchor="right" 
        elevation={3} 
        open={msgOpen} 
        ModalProps={{hideBackdrop:true}} 
        PaperProps={{className: classes.paper, ref: threadContainerRef}}
      >
        <Thread closeMsg={ handleMsgClose } containerRef={threadContainerRef}/>
      </Drawer>
    </>
  )
}


export default AllMessages;