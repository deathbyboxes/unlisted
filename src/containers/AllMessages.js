import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { List, Divider, Button, Grid, Drawer, Modal, Typography, Fab} from '@material-ui/core';
import Thread from './Thread';
import Header from '../components/header';
import Box from '@material-ui/core/Box';
import { sizing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles'
import Highlight from '../components/highlight';
import { RandomNumber } from '../utils/utils';
import { IoMdChatbubbles } from 'react-icons/io';

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

  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
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
  
  const ToolbarTools = props => (
    <Typography variant="h6" className={classes.title}>
      {props.title}
    </Typography>
  )

  const threadHLs = allMessages.map((thread, i) => {
    const info = {
      name: thread.name,
      phone: thread.phone,
      message: thread.messages[thread.messages.length - 1],
    }
    return (
      <div key={info.phone}>
      <Highlight handleClick={handleThreadClick} info={info} color={thread.color} />
      { !(i === allMessages.length - 1) && <Divider /> }
      </div>
    )
  });

  return(
    <>
      <Header 
        tools={ 
          <ToolbarTools 
            title={"Messages"} 
          />
        } 
        color={"default"}
      />

      <div style={{ height: "55px" }}>&nbsp;</div>

      <List>
        {threadHLs}
      </List>

      <Fab color="primary" aria-label="new" className={classes.fab}>
        <IoMdChatbubbles fontSize="24px" />
      </Fab>
      
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