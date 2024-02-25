import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import useStyles from './styles';
import { List, ListItem, Typography, TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Avatar from 'react-avatar';

const Chat = () => {

  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const classes = useStyles();

  const sendMessage = (e) => {
    e.preventDefault();

    //PUSHING MESSAGE IN DATABASE
    db.collection("messages").add({
      message: message,
      senderEmail: currentUser.email,
      senderUid: currentUser.uid,
      sentAt: new Date(),
    })

    setMessage('');
  }

  //FETCHING COMMUNITY CHATS FROM DATABASE
  useEffect(() => {
    db.collection(`messages`).orderBy("sentAt", "desc")
      .onSnapshot(snapshot => {
        setChats(snapshot.docs.map(doc => doc.data()))
      });
  }, [])


  return (

    <div className={classes.root}>
      <Typography
        variant='h4'
        className={classes.title}
      >
        COMMUNITY POSTS
      </Typography>
      <List style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
        <ListItem style={{ marginBottom: '1rem', backgroundColor: '#ffffff', borderRadius: '10px', padding: '1rem' }}>
          {/* FORM TO ENTER MESSAGE */}
          <form onSubmit={sendMessage} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder='Post your message...'
              value={message}
              onChange={(e) => { setMessage(e.target.value) }}
              style={{ marginRight: '1rem', flex: 1 }}
              InputProps={{ style: { backgroundColor: '#f0f0f0', borderRadius: '5px' } }}
            />
            <Button
              type='submit'
              startIcon={<SendIcon style={{ fontSize: '1.5rem' }} />}
              style={{ backgroundColor: '#007bff', color: '#ffffff', borderRadius: '5px', padding: '0.5rem 1rem', textTransform: 'none', boxShadow: 'none' }}
            >
              Send
            </Button>
          </form>
        </ListItem>
        {
          chats.map(
            (chat, index) => {
              return (
                <ListItem key={index} style={{ marginBottom: '1rem', borderRadius: '10px', backgroundColor: '#ffffff', padding: '1rem', display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    name={chat.senderEmail}
                    size='40'
                    textSizeRatio={1.75}
                    round={true}
                    style={{ marginRight: '1rem' }}
                  />
                  <div>
                    <Typography variant='subtitle2' style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: '#333333' }}>{chat.senderEmail}</Typography>
                    <Typography variant='body2' style={{ marginBottom: '0.5rem', color: '#666666' }}>
                      {new Date(chat.sentAt.seconds * 1000).toLocaleDateString("en-US")},{' '}
                      {new Date(chat.sentAt.seconds * 1000).getHours()}:{new Date(chat.sentAt.seconds * 1000).getMinutes()}
                    </Typography>
                    <Typography style={{ color: '#444444' }}>{chat.message}</Typography>
                  </div>
                </ListItem>
              )
            }
          )
        }
      </List>

    </div>
  )
}

export default Chat;