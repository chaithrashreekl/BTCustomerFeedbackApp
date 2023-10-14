import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./AdminLogIn.scss";
import AdminFeedbackList from "./AdminFeedBackList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [FeedBackList, setFeedBackList] = useState(false);
    const [isInvalidCredential, setIsInvalidCredential] = useState(true);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => { }, [isInvalidCredential]);

    const handleGoBack = () => {
        navigate("/");
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleAdminLogIn = (e) => {
        e.preventDefault();
        console.log("username", username);

        axios
            .get("https://run.mocky.io/v3/d8f14747-2907-4ab2-8f75-a613f21b952f")
            .then((response) => {
                console.log("response", response.data);
                if (
                    username === response.data.username &&
                    password === response.data.password
                ) {
                    setFeedBackList(true);
                } else {
                    setIsInvalidCredential(true);
                    setOpen(true);
                }
            })
            .catch((error) => {
                console.error(error);
                setIsInvalidCredential(true);
            });
    };

    return (
        <div className="admin-login-container">
            {FeedBackList ? (
                <AdminFeedbackList />
            ) : (
                <div>
                    <button onClick={handleGoBack}>Go Back</button>

                    <div className="form-container">
                        <h4>Enter Administrator credentials to Login</h4>

                        <form onSubmit={handleAdminLogIn} className="admin-form-section">
                            <TextField
                                id="outlined-basic"
                                label="User name"
                                variant="outlined"
                                margin="normal"
                                size="small"
                                className="name-container"
                                value={username}
                                onChange={handleUsernameChange}
                                autoComplete="off"
                            />

                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                size="small"
                                type="password"
                                className="password-container"
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="off"
                            />

                            <Button
                                variant="contained"
                                className="login-button"
                                type="submit"
                            >
                                LogIn
                            </Button>
                        </form>
                        {isInvalidCredential ? (
                            <Snackbar
                                open={open}
                                autoHideDuration={4000}
                                onClose={handleClose}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity="error"
                                    sx={{ width: "100%" }}
                                >
                                    Invalid username or password. Please enter correct
                                    credentials.
                                </Alert>
                            </Snackbar>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
