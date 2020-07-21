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
import { RandomNumber } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,.03)',
    width: '100%'
  },
  paper: {
    width: '100%'
  },
  unread: {

  },
  read: {

  }
}));

function AllMessages({allMessages, addMessage}) {
  const[msgOpen, setMsgOpen] = React.useState(false)
  const[curThread, setCurThread] = React.useState("")
  const classes = useStyles();
  const threadContainerRef = React.useRef(null)


  function handleMsgClose() {
    setMsgOpen(false)
  }

  function handleThreadClick(phone) {
    setMsgOpen(true)
    setCurThread(allMessages.filter(thread => thread.phone === phone)[0])
  }

  const threadHLs = allMessages.map((thread, i) => {
    const info = {
      name: thread.name,
      phone: thread.phone,
      message: thread.messages[thread.messages.length - 1],
    }
    return (
      <>
      <Highlight handleClick={handleThreadClick} info={info} color={thread.color} />
      { !(i === allMessages.length - 1) && <Divider key={info.phone + "-divider"} /> }
      </>
    )
  });

  return(
    <>
      <List>
        {threadHLs}
      </List>
      
      <Drawer 
        className={classes.root} 
        anchor="right" 
        elevation={3} 
        open={msgOpen} 
        ModalProps={{hideBackdrop:true}} 
        PaperProps={{className: classes.paper, ref: threadContainerRef}}
      >
        <Thread addMessage={addMessage} closeMsg={ handleMsgClose } thread={curThread} containerRef={threadContainerRef}/>
      </Drawer>
    </>
  )
}


export default AllMessages;