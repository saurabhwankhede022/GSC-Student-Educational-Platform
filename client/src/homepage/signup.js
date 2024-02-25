import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { db, auth } from '../firebase';
import useStyles from './styles';
import { Button, Grid, Link, TextField, InputLabel, Typography, Select, MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Signup = () => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const history = useHistory();

    const options = {
        organizations: [
            { id: 1, name: 'Organization A' },
            { id: 2, name: 'Organization B' },
            { id: 3, name: 'Organization C' }
        ],
        roles: [
            { id: 1, name: 'Orginazation' },
            { id: 2, name: 'Teacher' },
            { id: 3, name: 'Student' },
        ]
    };

    const [selectedOrganizationError, setSelectedOrganizationError] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedRoleError, setSelectedRoleError] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    const handleOrganizationChange = (event) => {
        setSelectedOrganization(event.target.value);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };


    //SIGNUP FUNCTION

    const handleSignup = (e) => {
        e.preventDefault();
        setPasswordError('');
        setEmailError('');
        if (name === '') {
            setNameError('Name is Required');
            return;
        }
        if (selectedOrganization === '') {
            setSelectedOrganizationError('Orginazation is Required');
            return;
        }
        if (selectedRole === '') {
            setSelectedRoleError('Role is Required');
            return;
        }
        if (password !== cpassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        //Check authentication 
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            const user = {
                displayName: name,
                email: email,
                password: password,
                uid: cred.user.uid,
                role:selectedRoleError,
                organizations:selectedOrganization
            };
            console.log(user);

            //PUSHING USER DATA IN DATABASE
            const userRef = db.doc(`users/${user.uid}`);
            userRef.set({
                name, email, createdAt: new Date(), uid: user.uid, role:selectedRole, organizations:selectedOrganization
            })

            //PUSHING IN USER ACTIVITY
            db.collection("users").doc(user.uid).collection("activity")
                .add({
                    activity: "Welcome to Teams!!",
                    doneAt: new Date()
                })

        })
            .then(() => { history.push('/teams'); })
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                    default: break;
                }
            });
    }

    return (
        <main>
            <Grid
                container
                style={{ background: 'linear-gradient(to right bottom, #eee7cc, #dbe3e9)' }}
            >
                <Grid
                    item
                    className={classes.signup}
                >
                    <div style={{ "display": "flex" }}>
                        <img
                            className={classes.bigLogo}
                            src={process.env.PUBLIC_URL + 'images/logo.jpg'}
                            alt="ms_logo"
                        />
                        <Typography
                            variant="h5"
                            align="left"
                            color="textPrimary"
                            fontWeight="bold"
                            style={{ padding: "0 20px" }}
                            gutterBottom
                        >
                            Sign up
                        </Typography>
                    </div>

                    {/* FORM TO SUBMIT USER INFORMATION */}

                    <form onSubmit={handleSignup}>
                        {nameError && <Alert severity="error">{nameError}</Alert>}
                        {emailError && <Alert severity="error">{emailError}</Alert>}
                        {passwordError && <Alert severity="error">{passwordError}</Alert>}
                        {selectedOrganizationError && <Alert severity="error">{selectedOrganizationError}</Alert>}
                        {selectedRoleError && <Alert severity="error">{selectedRoleError}</Alert>}
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            color="primary"
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                            error={!!nameError}
                        />
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            color="primary"
                            label="E-mail id"
                            type="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                        />
                        <div>
                            <div className="roles" style={{ "display": "flex", margin: "20px 0", border: "1px solid gray", padding: "10px", borderRadius: "5px" }}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    label="Role"
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    style={{ width: "100%",margin:"0 10px"  }}
                                >
                                    <MenuItem value="Role">
                                        <em>None</em>
                                    </MenuItem>
                                    {options.roles.map(role => (
                                        <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                            {
                                selectedRole!=='Orginazation' && <div className="orginazations" style={{ "display": "flex", margin: "20px 0", border: "1px solid gray", padding: "10px", borderRadius: "5px" }}>
                                    <InputLabel id="organization-label">Organization</InputLabel>
                                    <Select
                                        label="Organization"
                                        value={selectedOrganization}
                                        onChange={handleOrganizationChange}
                                        style={{ width: "100%",margin:"0 10px" }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {options.organizations.map(org => (
                                            <MenuItem key={org.id} value={org.name}>{org.name}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            }
                        </div>
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            color="primary"
                            label="Create Password"
                            type="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                        />
                        <TextField
                            className={classes.textField}
                            variant="outlined"
                            color="primary"
                            label="Confirm Password"
                            type="Password"
                            onChange={(e) => setCPassword(e.target.value)}
                        />
                        <Button
                            className={classes.buttonSignup}
                            color="primary"
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            Sign up
                        </Button>
                    </form>

                    <p>
                        <Typography variant="h7" color="textPrimary" family="Roboto" gutterBottom>
                            Already a user?
                            <Link href="/signin"> Sign in </Link>
                            instead
                        </Typography>
                    </p>
                </Grid>
            </Grid>
        </main>
    );
}

export default Signup;