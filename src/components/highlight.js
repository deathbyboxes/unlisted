import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Avatar, ListItemAvatar } from '@material-ui/core';
import { IoMdContact } from 'react-icons/io';

function Highlight({info, handleClick}) {
  let text = info.message ? info.message.text.substring(0,20) : "Draft:"
  return (
    <ListItem button onClick={() => { handleClick(info.phone) }} key={info.phone}>
      <ListItemAvatar>
        <Avatar>
          <IoMdContact />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={info.name || info.phone} secondary={text.length >= 20 ? text.trim() + "..." : text} />
    </ListItem>
  )
}


export default Highlight;