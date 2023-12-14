import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import {
    Paper,
    Avatar,
    FormControl,
    Input,
    InputLabel,
    Button,
    Select,
    MenuItem,
    Snackbar,
    createTheme,
    IconButton,
    ThemeProvider,
    FormHelperText,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AdvoRegister = () => {
    const indianStates = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
    ];

    const indianLanguages = [
        "English",
        "Hindi",
        "Bengali",
        "Telugu",
        "Marathi",
        "Tamil",
        "Urdu",
    ];

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [state, setState] = useState<State>({
        error: null,
        errorOpen: false,
        officeAddress: "",
        pincode: "",
        state: "",
        city: "",
        firstName: "",
        lastName: "",
        experience: "",
        specialization: "",
        typeCourt: "",
        languages: [],
        email: "",
        password: "",
        llbDocument: null,
    });

    const handleChange = (name: keyof State) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>) => {
        if (name === "languages") {
            setState({
                ...state,
                [name]: Array.isArray(e.target.value) ? e.target.value : [e.target.value as string],
            });
        } else {
            setState({
                ...state,
                [name]: e.target.value as string,
            });
        }
    };

    const errorClose = () => {
        setState({
            ...state,
            errorOpen: false,
        });
    };

    const submitRegistration = (e: FormEvent) => {
        e.preventDefault();

        const newUserCredentials = {
            officeAddress: state.officeAddress,
            pincode: state.pincode,
            state: state.state,
            city: state.city,
            firstName: state.firstName,
            lastName: state.lastName,
            experience: state.experience,
            specialization: state.specialization,
            typeCourt: state.typeCourt,
            languages: state.languages,
            email: state.email,
            password: state.password,
        };

        axios
            .post("http://127.0.0.1:5000/advocate/register", newUserCredentials)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Registration failed:', error);
                setState({
                    ...state,
                    error: 'Registration failed. Please try again.',
                    errorOpen: true,
                });
            });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setState({
            ...state,
            llbDocument: file,
        });
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#00bcd4", // cyan.400
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Navbar/>
            <div style={{ margin: "auto", marginTop: "20px", padding: "10px", width: "100vh", backgroundColor: "#26c6da", borderRadius: "10px" }}>
                <Paper style={{ padding: "20px", marginTop: "50px", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "center" }}>
                        <Avatar style={{ fontSize: "20px", backgroundColor: "#2196F3" }} sx={{ width: 50, height: 50 }}>
                            <PeopleAltIcon />
                        </Avatar>
                        <div style={{ marginLeft: "10px", fontSize: "20px" }}>Advocate Registration</div>
                    </div>


                    <form onSubmit={submitRegistration}>
                        <Grid container spacing={2}>
                            {/* Group 1 */}
                            <Grid item xs={12} >
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                                        <Input
                                            name="firstName"
                                            autoComplete="firstName"
                                            onChange={handleChange("firstName")}
                                        />
                                    </FormControl>

                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                        <Input
                                            name="lastName"
                                            autoComplete="lastName"
                                            onChange={handleChange("lastName")}
                                        />
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={12} >
                                {/* Group 2 */}
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input
                                            name="email"
                                            autoComplete="email"
                                            onChange={handleChange("email")}
                                        />
                                    </FormControl>

                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            onChange={handleChange("password")}
                                        />
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={12} >
                                {/* Group 3 */}
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="pincode">Pincode</InputLabel>
                                        <Input
                                            name="pincode"
                                            autoComplete="pincode"
                                            onChange={handleChange("pincode")}
                                        />
                                    </FormControl>

                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="officeAddress">Office Address</InputLabel>
                                        <Input
                                            name="officeAddress"
                                            autoComplete="officeAddress"
                                            onChange={handleChange("officeAddress")}
                                        />
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={12} >
                                {/* Group 4 */}
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="state">Indian States</InputLabel>
                                        <Select
                                            value={state.state}
                                            onChange={handleChange("state")}
                                            input={<Input />}
                                        >
                                            {indianStates.map((state) => (
                                                <MenuItem key={state} value={state}>
                                                    {state}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="city">City</InputLabel>
                                        <Input
                                            name="city"
                                            autoComplete="city"
                                            onChange={handleChange("city")}
                                        />
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Group 5 */}
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="specialization">Advocate Specialization</InputLabel>
                                        <Select
                                            value={state.specialization}
                                            onChange={handleChange("specialization")}
                                            input={<Input />}
                                        >
                                            {/* Add MenuItem components for each specialization */}
                                        </Select>
                                    </FormControl>

                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="experience">Experience</InputLabel>
                                        <Input
                                            name="experience"
                                            autoComplete="experience"
                                            onChange={handleChange("experience")}
                                        />
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Group 6 */}
                                <div style={{ display: "flex", gap: "20px" }}>
                                    <FormControl required fullWidth margin="normal">
                                        <InputLabel htmlFor="typeCourt">Type of Court</InputLabel>
                                        <Select
                                            value={state.typeCourt}
                                            onChange={handleChange("typeCourt")}
                                            input={<Input />}
                                        >
                                            {/* Add MenuItem components for each type of court */}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth required margin="normal">
                                        <InputLabel htmlFor="languages">Indian Languages</InputLabel>
                                        <Select
                                            multiple
                                            value={state.languages}
                                            onChange={handleChange("languages")}
                                            input={<Input />}
                                            renderValue={(selected) => (selected as string[]).join(", ")}
                                        >
                                            {indianLanguages.map((language) => (
                                                <MenuItem key={language} value={language}>
                                                    {language}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="normal">
                                    <label><b>Upload LLB Degree Document</b></label>
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload file
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                    {/* <FormHelperText>Upload a PDF or Word document (.pdf, .doc, .docx)</FormHelperText> */}
                                </FormControl>

                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    style={{ marginTop: "20px", backgroundColor: "#4CAF50", color: "white" }}
                                >
                                    Request to Join
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    {state.error ? (
                        <Snackbar
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            open={state.errorOpen}
                            onClose={errorClose}
                            autoHideDuration={3000}
                        >
                            <div>
                                <ErrorIcon style={{ marginRight: "8px" }} />
                                {state.error}
                                <IconButton key="close" aria-label="close" onClick={errorClose}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </Snackbar>
                    ) : null}
                </Paper>
            </div>
        </ThemeProvider>

    );
};

export default AdvoRegister;
