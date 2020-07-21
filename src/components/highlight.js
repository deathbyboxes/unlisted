import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Avatar, ListItemAvatar, makeStyles } from '@material-ui/core';
import { IoMdContact } from 'react-icons/io';
import { formatNumber, messageState } from '../utils/utils';
import {deepPurple, green, deepOrange, blueGrey} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  green: {
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[800],
  },
  blue: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: blueGrey[500],
  }
}))

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

function Highlight({info, handleClick, color}) {
  const classes = useStyles();
  return (
    <ListItem button onClick={() => { handleClick(info.phone) }} key={info.phone}>
      <ListItemAvatar>
        <Avatar className={ color !== "" ? classes[color] : false }>
          { info.name ? info.name.substring(0,1).toUpperCase() : <IoMdContact fontSize="30px"/> }
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={info.name || formatNumber(info.phone)} secondary={formatText(info.message)} />
    </ListItem>
  )
}


export default Highlight;