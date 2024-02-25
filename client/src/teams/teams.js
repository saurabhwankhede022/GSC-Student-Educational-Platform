import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import useStyles from './styles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Grid ,Button} from '@material-ui/core';
import Avatar from 'react-avatar';

const Teams = () => {

    const classes = useStyles();
    const [teams, setTeams] = useState([]);
    
    //FETCHING TEAMS DATA FROM DATABASE
    useEffect(() => {
        db.collection("teams").onSnapshot(snapshot => {
            setTeams(snapshot.docs.map(doc => doc.data()))
        });
    }, [])


    return (

        <div className={classes.content}>

        <div className={classes.grow}>

            {/* TOP BAR IN TEAMS SECTION */}

            <AppBar 
                position="static" 
                className={classes.appbar} 
                elevation={0}
            >
                <Toolbar>
                    <Typography 
                        className={classes.title} 
                        variant="h6" 
                        noWrap
                    >
                        All Teams
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>  
                        <Tooltip title="Settings" placement="bottom">
                            <IconButton aria-label="settings" className={classes.menuButton} >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Create a team' placement='bottom'>
                            <IconButton aria-label="settings" className={classes.menuButton} href='/create-team'>
                                <GroupAddIcon/>
                                <Typography variant='body2'>Create a team</Typography>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.sectionMobile}>
                        <Tooltip title="Settings" placement="bottom">
                            <IconButton aria-label="settings" className={classes.menuButton} >
                                <SettingsIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Create a team' placement='bottom'>
                            <IconButton aria-label="settings" className={classes.menuButton} href='/create-team'>
                                <GroupAddIcon/>
                                <Typography variant='body2'>Create a team</Typography>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>

            {/* GRID TO DISPLAY ALL THE TEAMS */}

            <Grid 
                container 
                className={classes.grid}
                spacing={5}
            >
            {
     teams.map((team) => {
        return (
            <Grid item xs={12} md={6} lg={4} key={team.code} className={classes.gridItem} style={{ marginBottom: '30px' }}>
                <Link to={`/teams/${team.code}`} className={classes.link} style={{ textDecoration: 'none', color: '#333' }}>
                    <div className={classes.paper} style={{ backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease', border: '1px solid #ddd' }}>
                        <div align='center' style={{ marginBottom: '20px', paddingTop: '20px' }}>
                            <Avatar value={team.name} size='90' textSizeRatio={1.75} style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: '2px solid #fff' }} />
                        </div>
                        <Typography align='center' variant='h6' style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
                            {team.name}
                        </Typography>
                        <Typography align='center' variant='subtitle1' style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
                            Created on {new Date(team.createdAt.seconds * 1000).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                        </Typography>
                        <Typography align='center' variant='subtitle2' style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
                            by {team.creatorEmail}
                        </Typography>
                        <div align='center'>
                            <Button variant="outlined" color="primary" style={{ borderRadius: '20px', padding: '8px 20px', fontSize: '0.9rem', textTransform: 'none', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
                                View Details
                            </Button>
                        </div>
                    </div>
                </Link>
            </Grid>
        )
    })
        
        
            }
        </Grid>
        </div>
    </div>
    )
}

export default Teams;