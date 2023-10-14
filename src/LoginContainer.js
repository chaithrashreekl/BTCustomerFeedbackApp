import React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import "./LoginContainer.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginContainer() {
    const navigate = useNavigate();

    const handleLogin = (val) => {
        if (val === "admin") {
            navigate("/login");
        } else if (val === "guest") {
            navigate("/guest-feedback-form");
        }
    };

    return (
        <div className="login-container">
            <h3 className="heading-container">Login as</h3>

            <div className="login-section">
                <Button
                    variant="contained"
                    className="selected-button"
                    onClick={() => handleLogin("admin")}
                >
                    Administrator
                </Button>
                <Button
                    variant="contained"
                    className="selected-button"
                    onClick={() => handleLogin("guest")}
                >
                    Guest
                </Button>
            </div>
        </div>
    );
}

export default LoginContainer;
