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
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";

type Props = {}

const AdvoLogin = (props: Props) => {
  const navigate = useNavigate();
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
      const response = await axios.post("/api/advocate/login", newUserCredentials);
      console.log(response.data);
      navigate('/advohome');
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
    <div>
      <section className="h-screen">
        <div className="h-full">
          <div
            className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div
              className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://img.freepik.com/free-vector/graduated-lawyer-concept-illustration_114360-16442.jpg?w=740&t=st=1702961393~exp=1702961993~hmac=56139a333a74f7a3cb8111918bcccbecd461fecc3798fe18055b5e3948826e5e"
                className="h-1/2"
                alt="Sample image" />
            </div>

            <div className="mb-16 border border-2 pt-20 pb-20 pl-8 pr-8 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 mr-12">
              <h1>Advocate Login</h1>
              <form className='border p-12'>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Input
                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput2"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    disableUnderline={true}
                    onChange={handleChange("email")} />
                  
                </div> 

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <Input
                    name="password"
                    autoComplete="password"
                    onChange={handleChange("password")}
                    placeholder="Password"
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
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value=""
                      id="exampleCheck2" />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>

                  <a href="#!" className='text-black'>Forgot password?</a>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    disabled={!isValid()}
                    onClick={submitRegistration}
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    Login
                  </button>

                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Don't have an account?
                    <NavLink to='/advo-register'><a
                      href="#!"
                      className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    > Register </a></NavLink>
                  </p>
                </div>
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdvoLogin
