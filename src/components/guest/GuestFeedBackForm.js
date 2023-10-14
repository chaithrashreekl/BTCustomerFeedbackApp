import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./GuestFeedBackForm.scss";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { connect } from "react-redux";
import { updateFormData } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GuestFeedbackForm = (props) => {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        comments: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        company: "",
        email: "",
        comments: "",
    });

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    const isFormValid = () => {
        const { name, company, email, comments } = formData;
        const errorValues = Object.values(errors);
        return (
            name &&
            company &&
            email &&
            comments &&
            errorValues.every((error) => error === "")
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData };
        newFormData[name] = value;
        setFormData(newFormData);
        let newErrors = { ...errors };

        switch (name) {
            case "name":
                newErrors.name =
                    value.length < 2 ? "Name must be at least 2 characters long" : "";
                break;
            case "company":
                newErrors.company =
                    value.length < 2 ? "Company must be at least 2 characters long" : "";
                break;
            case "email":
                newErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ""
                    : "Email is not valid";
                break;
            case "comments":
                newErrors.comments =
                    value.length < 2 ? "Comments must be at least 2 characters long" : "";
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(true);

        const { name, company, email, comments } = formData;

        if (isFormValid()) {
            props.updateFormData(formData);

            setFormData({
                name: "",
                company: "",
                email: "",
                comments: "",
            });
            setErrors({
                name: "",
                company: "",
                email: "",
                comments: "",
            });
        } else {
            console.error("Form has errors. Please check your inputs.");
        }
    };

    return (
        <div className="feedback-form-container">
            <h2>Customer Feedback Form</h2>
            <button onClick={handleGoBack}>Go Back</button>
            <p>Please enter below details to provide feedback</p>

            <form onSubmit={handleSubmit} className="form-section">
                <TextField
                    label="Name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    variant="outlined"
                    margin="normal"
                    size="small"
                    autoComplete="off"
                />
                <TextField
                    label="Company"
                    name="company"
                    value={formData?.company}
                    onChange={handleChange}
                    error={!!errors.company}
                    helperText={errors.company}
                    variant="outlined"
                    margin="normal"
                    size="small"
                    autoComplete="off"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData?.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                    margin="normal"
                    size="small"
                    autoComplete="off"
                />
                <TextField
                    label="Comments"
                    className="name-container"
                    name="comments"
                    value={formData?.comments}
                    onChange={handleChange}
                    error={!!errors.comments}
                    helperText={errors.comments}
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    size="small"
                    autoComplete="off"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isFormValid()}
                >
                    Submit
                </Button>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Your feedback is submitted successfully!
                    </Alert>
                </Snackbar>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        formData: state.form.formData,
    };
};

export default connect(mapStateToProps, { updateFormData })(GuestFeedbackForm);
