import React, { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    MenuItem,
    Select,
    FormControl,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router-dom';
import logo from "../img/logo_light.png";

const data = [
    { name: 'January', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'February', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'March', uv: 2000, pv: 9800, amt: 2290 },
    // Add more data as needed
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

const AdminCategory: React.FC = () => {
    const [selectedState, setSelectedState] = useState<string>('');

    const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedState(event.target.value as string);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar (20%) */}
            <div style={{ flex: '0 0 20%'}}  className='bg-sky-200 p-2'>
                <img src={logo} className='m-auto'>
                </img>
                <List>
                    <ListItem component={Link} to="/admin-home" className='hover:bg-sky-500 hover:-translate-y-1 hover:scale-105 transition ease-in-out delay-90'>
                        <DashboardIcon></DashboardIcon>
                        <ListItemText className='m-2' primary="Dashboard"  />
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
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">Admin Dashboard</Typography>
                        </Toolbar>
                    </AppBar>
                    <Box m={3}>
                        <Typography variant="h5">Chart</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                {/* Add more lines or customize the chart as needed */}
                            </LineChart>
                        </ResponsiveContainer>
                        <FormControl style={{ marginTop: '16px' }}>
                            <Select value={selectedState} onChange={handleStateChange} displayEmpty>
                                <MenuItem value="" disabled>
                                    Select State
                                </MenuItem>
                                {statesOfIndia.map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default AdminCategory;
