import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import useStyles from './styles';
import { List, ListItem, Typography } from '@material-ui/core';

const Activity = () => {

    const { currentUser } = useAuth();
    const [activities, setActivities] = useState([]);
    const classes = useStyles();
    
    //FETCHING ACTIVITIES OF CURRENT USER FROM DATABASE
    useEffect(() => {
        db.collection(`users/${currentUser.uid}/activity`).orderBy("doneAt", "desc")
        .onSnapshot(snapshot => {
            setActivities(snapshot.docs.map(doc => doc.data()))
        });
    }, [currentUser.uid])

    return (
        <div className={classes.root}>
            <Typography
                variant='h4'
                className={classes.title}
            >
                YOUR ACTIVITY
            </Typography>
            
            {/* LIST OF ACTIVITIES */}
            <List style={{ padding: 0 }}>
  {activities.map((activity, index) => (
    <ListItem key={index} style={{ borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '15px', background: '#fff', borderRadius: '8px' }}>
        <img 
          src={process.env.PUBLIC_URL + '/images/logo.jpg'} // corrected the path
          alt='teams_logo'
          style={{ width: '50px', height: '50px', marginRight: '15px', borderRadius: '50%' }}
        />
        <div>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
            {new Date(activity.doneAt.seconds * 1000).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })},{' '}
            {new Date(activity.doneAt.seconds * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
          </span>
          <p style={{ fontSize: '16px', margin: 0, color: '#666' }}>
            <b>{activity.activity}</b>
          </p>
        </div>
      </div>
    </ListItem>
  ))}
</List>


        </div>
    )
}

export default Activity;