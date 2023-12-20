import React, { useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Container,
    Typography,
    List,
    Grid,
    Card,
    CardContent,
    ListItem,
    ListItemText,
    Paper,
    Avatar,
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../img/logo-wbag.png';
import axios from 'axios';

const AdminCategory = () => {
    const [documentData, setDocumentData] = useState({ documents: {}, response: false });
    const handleViewDocument = (category, docName) => {
        axios.post('/api/admin/get-cat-doc', { category, docName }, { responseType: 'arraybuffer' })
            .then(response => {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                window.open(pdfUrl, '_blank');
            })
            .catch(error => {
                console.error('Error viewing document:', error);
            });
    };
    useEffect(() => {
        // Fetch data from Flask route using Axios
        axios.get('/api/admin/view')
            .then(response => {
                setDocumentData(response.data);
            })
            .catch(error => {
                console.error('Error fetching document details:', error);
            });
    }, []);

    const DocumentList = ({ category, docs }) => (
        <div key={category} style={{ marginBottom: '20px' }}>
            <Typography variant="h4" gutterBottom>
                {category}
            </Typography>
            <Grid container spacing={2}>
                {docs.map((doc) => (
                    <Grid item key={doc.doc_name} xs={12} sm={6} md={4}>
                        <Card style={{ minHeight: '200px' ,flex:'auto' }}>
                            <CardContent>
                                <Avatar>
                                    <CategoryIcon />
                                </Avatar>
                                <Typography variant="h6" component="div" style={{ marginTop: '10px', whiteSpace: 'normal' }}>
                                    {doc.doc_name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div">
                                    Beneficiaries: {doc.beneficiaries.join(', ')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
    

    return (
        <div style={{ display: 'flex', height: '100vh', width:'auto'}}>
            {/* Sidebar (20%) */}
            <div style={{ flex: '0 0 20%' }} className='bg-sky-200 p-2'>
                <img src={logo} className='m-auto'></img>
                <List>
                    <ListItem component={Link} to="/admin-home" className='hover:bg-sky-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'>
                        <DashboardIcon></DashboardIcon>
                        <ListItemText className='m-2' primary="Dashboard" />
                    </ListItem>
                    <ListItem component={Link} to="/category" className='hover:bg-sky-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'>
                        <CategoryIcon></CategoryIcon>
                        <ListItemText className='m-2' primary="Category" />
                    </ListItem>
                    <ListItem component={Link} to="/logout" className='hover:bg-sky-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'>
                        <LogoutIcon></LogoutIcon>
                        <ListItemText className='m-2' primary="Logout" />
                    </ListItem>
                </List>
            </div>

            {/* Main Content (80%) */}
            <div style={{ flex: '1', padding: '16px' }}>
                <Container>
                    <Paper elevation={3} className='p-4'>
                        <Typography variant='h3' gutterBottom>
                            Document Details
                        </Typography>
                        {documentData.response && Object.entries(documentData.documents).map(([category, docs]) => (
                            <DocumentList key={category} category={category} docs={docs} />
                        ))}
                    </Paper>
                </Container>
            </div>
        </div>
    );
};

export default AdminCategory;
