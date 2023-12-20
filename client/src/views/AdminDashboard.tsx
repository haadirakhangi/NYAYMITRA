import React, { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Container,
    Input,
    Button,
    AppBar,
    InputLabel,
    Toolbar,
    Typography,
    MenuItem,
    Select,
    FormControl,
    Box,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
// import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import logo from '../img/logo-wbag.png';
import { styled } from '@mui/material/styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

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

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];

const statesOfIndia = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
];

const AdminDashboard: React.FC = () => {
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [fineSelectedFiles, setFineSelectedFiles] = useState<FileList | null>(null);
    const [inputQuestion, setInputQuestion] = useState<string>('');
    const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);



    const handleStateChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setSelectedState(event.target.value as string);
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedFiles(files);
    };

    const handleFineFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setFineSelectedFiles(files);
    };

    const handleSubmit = async () => {
        console.log("I am sending shit")
        if (!selectedFiles) {
            console.error('No file selected.');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('documents', selectedFiles[i]);
        }

        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/admin/update-vectordb',
                formData
            );
            console.log('File sent successfully', response.data);
            // Handle the response as needed
        } catch (error) {
            console.error('Error sending file:', error);
        }
    };


    const handleQuestionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputQuestion(event.target.value);
    };

    const handleFineSubmit = async () => {
        console.log("I am sending stuff");

        if (!inputQuestion) {
            console.error('No question input provided.');
            return;
        }

        const formData = new FormData();

        // Append input question to FormData
        formData.append('question', inputQuestion);

        try {
            const response = await axios.post(
                '/api/admin/generate-questions',
                formData
            );
            setGeneratedQuestions(response.data.questions)
            console.log('Files and question sent successfully', response.data);
            // Handle the response as needed
        } catch (error) {
            console.error('Error sending files and question:', error);
        }
    };

    const handleQuestionChangeAtIndex = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        console.log(generatedQuestions)        
        const updatedQuestions = [...generatedQuestions];
        updatedQuestions[index] = event.target.value;
        setGeneratedQuestions(updatedQuestions);
    };
    
    const handleDrafting = async () => {
        console.log("I am drafting stuff");
        if (!fineSelectedFiles) {
            console.error('No file selected.');
            return;
        }
        const formData = new FormData();
        // Append files to FormData
        for (let i = 0; i < fineSelectedFiles.length; i++) {
            formData.append('documents', fineSelectedFiles[i]);

        // Append input question to FormData
        generatedQuestions.forEach((question) => formData.append("questions", question));

        try {
            const response = await axios.post(
                '/api/admin/update-drafting',
                formData
            );
            console.log('Files and question sent successfully', response.data);
            // Handle the response as needed
        } catch (error) {
            console.error('Error sending files and question:', error);
        }
    };
}

    
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar (20%) */}
            <div style={{ flex: '0 0 20%' }} className='bg-sky-200 p-2'>
                <img src={logo} className='m-auto w-4/6'></img>
                <List>
                    <ListItem
                        component={Link}
                        to='/admin-home'
                        className='bg-blue-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'
                    >
                        <DashboardIcon></DashboardIcon>
                        <ListItemText className='m-2' primary='Dashboard' />
                    </ListItem>
                    <ListItem
                        component={Link}
                        to='/admin-category'
                        className='hover:bg-blue-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'
                    >
                        <CategoryIcon></CategoryIcon>
                        <ListItemText className='m-2' primary='Category' />
                    </ListItem>
                    <ListItem
                        component={Link}
                        to='/admin-advocate-verified'
                        className='hover:bg-blue-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'
                    >
                        <VerifiedIcon></VerifiedIcon>
                        <ListItemText className='m-2' primary='Advocate Verifications' />
                    </ListItem>
                    <ListItem
                        component={Link}
                        to='/logout'
                        className='hover:bg-blue-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'
                    >
                        <LogoutIcon></LogoutIcon>
                        <ListItemText className='m-2' primary='Logout' />
                    </ListItem>
                </List>
            </div>

            {/* Main Content (80%) */}
            <div style={{ flex: '1', padding: '10px' }}>
                <Container>
                    <AppBar position='static' className='rounded'>
                        <Toolbar>
                            <Typography variant='h6'>Admin Dashboard</Typography>
                        </Toolbar>
                    </AppBar>
                    <Box>
                        <FormControl
                            style={{ marginTop: '16px', marginBottom: '16px' }}
                            className='mb-5'
                        >
                            <Select
                                value={selectedState}
                                onChange={handleStateChange}
                                displayEmpty
                            >
                                <MenuItem value='' disabled>
                                    Select State
                                </MenuItem>
                                {statesOfIndia.map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant='h5'>Add New Documents</Typography>


                    </Box>
                    <Box style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                        <Typography variant='h5' style={{ marginTop: '16px', marginBottom: '16px' }}>
                            Upload Documents to Update The chatbots
                        </Typography>
                        <Button
                            component='label'
                            variant='contained'
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput
                                type='file'
                                multiple
                                onChange={handleFileChange}
                            />
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            style={{ marginLeft: '10px' }}
                            onClick={handleSubmit}
                        >
                            Update Data
                        </Button>
                    </Box>
                    <Box style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' ,flex:'auto'}}>
                        <Typography variant='h5' style={{ marginTop: '30px', marginBottom: '16px' }}>
                            Input Question
                        </Typography>
                        <FormControl required fullWidth margin="normal" style={{flex:'auto'}}>
                            <InputLabel htmlFor="question">Question</InputLabel>
                            <Input
                                name="question"
                                autoComplete="Question"
                                value={inputQuestion}
                                onChange={handleQuestionChange}
                            />
                        </FormControl>
                        <Button
                            variant='contained'
                            color='primary'
                            style={{ marginLeft: '10px' }}
                            onClick={handleFineSubmit}
                        >
                            Genrate Questions
                        </Button>
                        {generatedQuestions.map((question, index) => (
                            <FormControl key={index} fullWidth margin="normal">
                                <InputLabel htmlFor={`question-${index}`}>{`Question ${index + 1}`}</InputLabel>
                                <Input
                                    id={`question-${index}`}
                                    name={`question-${index}`}
                                    autoComplete={`Question ${index + 1}`}
                                    value={question}
                                    onChange={(e) => handleQuestionChangeAtIndex(e, index)}
                                />
                            </FormControl>
                        ))}
                        <Typography variant='h5' style={{ marginTop: '16px', marginBottom: '16px' }}>
                            Upload Documents for document drafting
                        </Typography>
                        <Button
                            component='label'
                            variant='contained'
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput
                                type='file'
                                multiple
                                onChange={handleFineFileChange}
                            />
                        </Button>

                        <Button
                            variant='contained'
                            color='primary'
                            style={{ marginLeft: '10px' }}
                            onClick={handleDrafting}
                        >
                            Update Data
                        </Button>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default AdminDashboard;
