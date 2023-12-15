import React, { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Container,
    Input,
    Button,
    AppBar,
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
import { Chart } from 'react-google-charts';
import { Link } from 'react-router-dom';
import logo from '../img/logo-wbag.png';
import { styled } from '@mui/material/styles';
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
    const [chartType, setChartType] = useState<string>('PieChart');

    const handleStateChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setSelectedState(event.target.value as string);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedFiles(files);
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
                        to='/category'
                        className='hover:bg-blue-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'
                    >
                        <CategoryIcon></CategoryIcon>
                        <ListItemText className='m-2' primary='Category' />
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
            <div style={{ flex: '1', padding: '16px' }}>
                <Container>
                    <AppBar position='static' className='rounded'>
                        <Toolbar>
                            <Typography variant='h6'>Admin Dashboard</Typography>
                        </Toolbar>
                    </AppBar>
                    <Box m={3}>
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
                        <Typography variant='h5'>Chart</Typography>
                        <Button
                            variant='contained'
                            color='primary'
                            style={{ marginLeft: '10px' }}
                            onClick={() => setChartType(chartType === 'PieChart' ? 'Histogram' : 'PieChart')}
                        >
                            {chartType === 'PieChart' ? 'Show Histogram' : 'Show Pie Chart'}
                        </Button>
                        <Box m={3}>
                            <Chart
                                width={'100%'}
                                height={'400px'}
                                chartType={chartType}
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Task', 'Hours per Day'],
                                    ['Work', 11],
                                    ['Eat', 2],
                                    ['Commute', 2],
                                    ['Watch TV', 2],
                                    ['Sleep', 7],
                                ]}
                                options={
                                    chartType === 'Histogram'
                                        ? { title: 'My Daily Activities', legend: { position: 'none' } }
                                        : { title: 'My Daily Activities' }
                                }
                                rootProps={{ 'data-testid': '1' }}
                            />
                            <Typography variant='h5' style={{ marginTop: '16px', marginBottom: "16px" }}>
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
                            <Button variant='contained'
                                color='primary'
                                style={{ marginLeft: "10px" }}
                                onClick={handleSubmit}>
                                Update Data
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default AdminDashboard;
