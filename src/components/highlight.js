import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { IoMdContact } from 'react-icons/io';

function Highlight({info}) {
  return (
    <ListItem button>
      <ListItemIcon>
        <IoMdContact />
      </ListItemIcon>
      <ListItemText primary={info.name || info.phone} />
      <ListItemText primary={info.message} />
    </ListItem>
  )
}


export default Highlight;