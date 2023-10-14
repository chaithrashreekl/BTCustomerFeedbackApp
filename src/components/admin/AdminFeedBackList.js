import React from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./AdminFeedBackList.scss";
import { useNavigate } from "react-router-dom";

const AdminFeedbackList = ({ formData }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div className="admin-feedback-list-container">
            <h2>Customer Feedback List</h2>
            <button onClick={handleGoBack}>Go Back</button>

            <TableContainer
                component={Paper}
                width="50%"
                style={{ marginTop: "10px" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#80808029" }}>
                            <TableCell>Name</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Comments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {formData.map((item, key) => (
                            <TableRow
                                key={item.name}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.company}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.comments}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        formData: state.form.formData,
    };
};

export default connect(mapStateToProps)(AdminFeedbackList);
