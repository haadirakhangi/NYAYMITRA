import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Paper,
  Avatar,
  FormControl,
  Input,
  InputLabel,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";

const AdvoLogin: React.FC = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    hidePassword: true,
    error: null,
    errorOpen: false,
  });

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  const showPassword = () => {
    setState((prevState) => ({ ...prevState, hidePassword: !prevState.hidePassword }));
  };

  const isValid = () => {
    return state.email !== "";
  };

  const errorClose = () => {
    setState({
      ...state,
      errorOpen: false,
    });
  };

  const submitRegistration = async (e: FormEvent) => {
    e.preventDefault();

    const newUserCredentials = {
      email: state.email,
      password: state.password,
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/advocate/login", newUserCredentials);
      console.log(response.data);
      // Handle success, you can log the response or perform additional actions
    } catch (error) {
      // Handle error, you can log the error or show a user-friendly message
      console.error('Login failed:', error);
      setState({
        ...state,
        error: 'Login failed. Please try again.',
        errorOpen: true,
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <h1 className="text-[50px]">Advocate Login</h1>
      <Paper style={{ padding: "20px", textAlign: "center" }}>
        <Avatar style={{ backgroundColor: "#00bcd4", margin: "10px" }}>
          <PeopleAltIcon />
        </Avatar>
        <form style={{ width: "100%", marginTop: "10px" }} onSubmit={submitRegistration}>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              disableUnderline={true}
              onChange={handleChange("email")}
            />
          </FormControl>

          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              autoComplete="password"
              disableUnderline={true}
              onChange={handleChange("password")}
              type={state.hidePassword ? "password" : "input"}
              endAdornment={
                state.hidePassword ? (
                  <InputAdornment position="end">
                    <VisibilityOffTwoToneIcon fontSize="medium" onClick={showPassword} />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <VisibilityTwoToneIcon fontSize="medium" onClick={showPassword} />
                  </InputAdornment>
                )
              }
            />
          </FormControl>
          <h1 style={{ marginTop: "20px", marginLeft: "10px" }}>
            Don't have an Account ?{" "}
            <span>
              <NavLink to="/advo-register">
                <strong>Get Started</strong>
              </NavLink>
            </span>
          </h1>
          <Button
            disabled={!isValid()}
            disableRipple
            fullWidth
            variant="outlined"
            style={{ marginTop: "20px" }}
            type="submit"
          >
            Join
          </Button>
        </form>

        {state.error ? (
          <Snackbar
            variant="error"
            key={state.error}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={state.errorOpen}
            onClose={errorClose}
            autoHideDuration={3000}
          >
            <div style={{ backgroundColor: "#d32f2f", padding: "10px" }}>
              <span style={{ marginRight: "8px" }}>
                <ErrorIcon fontSize="large" color="error" />
              </span>
              <span> {state.error} </span>
              <IconButton key="close" aria-label="close" onClick={errorClose}>
                <CloseIcon color="error" />
              </IconButton>
            </div>
          </Snackbar>
        ) : null}
      </Paper>
    </div>
  );
};

export default AdvoLogin;
