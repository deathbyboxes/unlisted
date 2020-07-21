import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Avatar, ListItemAvatar } from '@material-ui/core';
import { IoMdContact } from 'react-icons/io';
import { formatNumber, messageState } from '../utils/utils';

function formatText(message) {
  let fmtText = ""
  let txt = ""
  if (message) {
    txt = message.text.substring(0,20)
    txt = txt.length >= 20 ? txt.trim() + "..." : txt
    if (message.state === messageState().DRAFT)
      fmtText += "Draft: "
    else {
      fmtText += message.from !== "Me" ? message.from + ": " : "You: " 
    } 
    fmtText += txt
  } else {
    fmtText += "Draft: "
  }

  return fmtText
}

function Highlight({info, handleClick}) {
  return (
    <ListItem button onClick={() => { handleClick(info.phone) }} key={info.phone}>
      <ListItemAvatar>
        <Avatar>
          { info.name ? info.name.substring(0,1).toUpperCase() : <IoMdContact fontSize="30px"/> }
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={info.name || formatNumber(info.phone)} secondary={formatText(info.message)} />
    </ListItem>
  )
}


export default Highlight;