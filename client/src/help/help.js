import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import useStyles from './styles';
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import GroupIcon from '@material-ui/icons/Group';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HelpIcon from '@material-ui/icons/Help';
import Speech from 'react-speech';

const Help = () => {

    const classes = useStyles();
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);

    //FETCHING USERS DATA FROM DATABASE
    useEffect(() => {
        db.collection(`users`).onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        });
    }, [])

    //TEXT FOR VOICE ASSISTANT 
    const text = "Hello Students! Welcome to S S G M C E! You can use teams to create groups, meetings and chat with the community, you can even manage your daily tasks and todos and can also view your activities in this app! Thank you!";

    return (
        <div className={classes.root}>
            <Typography
                variant='h4'
                className={classes.title}
            >
                HELP
            </Typography>
            
            <Typography className={classes.title}>
                Hey &nbsp;
                {
                    users.find((user) => user.uid === currentUser.uid)?.name
                }!
                Welcome to SSGMCE! Here's a quick guide for you!
            </Typography>

            <Speech
                style={{ marginLeft: '25vw' }}
                textAsButton={true}
                displayText="Click to listen"
                text={text}
                voice="Google UK English Female"
                rate="0.90"
            />

            <List className={classes.listRoot}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <NotificationsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Activity" secondary="You can view all your activities" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <MessageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Community Chat" secondary="You can communicate with all users of this app" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <GroupIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Teams" secondary="You can create teams, start or join meetings and even send messages" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AssignmentIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Tasks" secondary="You can manage all your tasks and todos" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <DateRangeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Calendar" secondary="You can keep a track of all the scheduled meetings" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <HelpIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Help" secondary="You can use it as a guide" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={process.env.PUBLIC_URL + '/images/Saurabh.jpeg'} />
                    </ListItemAvatar>
                    <ListItemText primary="Saurabh Anil Wankhede: Admin and Developer" secondary="Contact me for any issues: ssgm_306670@ssgmce.ac.in" />
                </ListItem>

            </List>

        </div>
    )
}

export default Help;