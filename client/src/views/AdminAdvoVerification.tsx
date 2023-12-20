import React, { useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close'; 
import DoneIcon from '@mui/icons-material/Done';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemText,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Button,
    Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../img/logo-wbag.png';
import axios from 'axios';


const AdminAdvoVerification: React.FC = () => {
    const [advocateData, setAdvocateData] = useState([]);
    useEffect(() => {
        // Fetch data from Flask route using Axios
        axios.get('/api/admin/advocate-details')
            .then(response => {
                setAdvocateData(response.data.advocates);
            })
            .catch(error => {
                console.error('Error fetching advocate details:', error);
            });
    }, []);

    const handleAcceptAdvocate = (advocateId) => {
        // Add logic to accept the advocate
        console.log(`Advocate ${advocateId} accepted`);
        axios.post('/api/admin/verify-advocate', { advocateId })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                // Handle error
                console.error('Error accepting advocate:', error);
            });
    };

    const handleRejectAdvocate = (advocateId) => {
        // Add logic to accept the advocate
        console.log(`Advocate ${advocateId} rejected`);
        axios.post('/api/admin/reject-advocate', { advocateId })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                // Handle error
                console.error('Error rejected advocate:', error);
            });
    };

    const handleViewDocument = (documentUrl) => {
        if (documentUrl) {
            axios.post('/api/admin/get-doc', { documentUrl }, { responseType: 'arraybuffer' })
                .then(response => {
                    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    window.open(pdfUrl, '_blank');
                })
                .catch(error => {
                    console.error('Error viewing document:', error);
                });
        }
    };
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar (20%) */}
            <div style={{ flex: '0 0 20%' }} className='bg-sky-200 p-2'>
                <img src={logo} className='m-auto w-4/6'></img>
                <List>
                    <a><ListItem
                        component={Link}
                        to='/admin-home'
                        className='hover:bg-blue-500 translate-y-1 hover:scale-105 transition ease-in-out delay-90'
                    >
                        <DashboardIcon></DashboardIcon>
                        <ListItemText className='m-2' primary='Dashboard' />
                    </ListItem></a>
                    <ListItem
                        component={Link}
                        to='/category'
                        className='hover:bg-blue-500 translate-y-1 hover:scale-105 transition ease-in-out delay-90'
                    >
                        <CategoryIcon></CategoryIcon>
                        <ListItemText className='m-2' primary='Category' />
                    </ListItem>
                    <ListItem
                        component={Link}
                        to='/admin-advocate-verified'
                        className='bg-blue-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'
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
            <div style={{ flex: '1', padding: '16px' }}>
                <Container>
                    <AppBar position='static' className='rounded'>
                        <Toolbar>
                            <Typography variant='h6'>Advocate Verification</Typography>
                        </Toolbar>
                    </AppBar>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Advocate ID</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Specialization</TableCell>
                                    <TableCell>Languages</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {advocateData.length > 0 ? (
                                    advocateData.map((advocate) => (
                                        <TableRow key={advocate.advocate_id}>
                                            <TableCell>{advocate.advocate_id}</TableCell>
                                            <TableCell>{advocate.fname}</TableCell>
                                            <TableCell>{advocate.lname}</TableCell>
                                            <TableCell>{advocate.city}</TableCell>
                                            <TableCell>{advocate.specialization}</TableCell>
                                            <TableCell>{advocate.languages}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() => handleAcceptAdvocate(advocate.advocate_id)}
                                                    color="success"
                                                >
                                                    <DoneIcon/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleRejectAdvocate(advocate.advocate_id)}
                                                    color="error"
                                                >
                                                    <CloseIcon/>
                                                </IconButton>
                                                <Button
                                                    onClick={() => handleViewDocument(advocate.degree_doc)}
                                                    color="primary"
                                                >
                                                    View Document
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7}>No advocate data available</TableCell>
                                    </TableRow>
                                )}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        </div>
    );
};

export default AdminAdvoVerification;
