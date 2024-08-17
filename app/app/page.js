'use client'
import { Grid, Box, TextField, Button, Typography, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Home() {
    return (
        <Grid container sx={{ height: '100vh', backgroundColor: '#1e1e1e', color: '#fff', padding: '1rem' }}>

            {/* Left Menu/Dashboard */}
            <Grid item xs={12} md={3} sx={{ padding: '1rem', border: '1px solid #fff' }}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Typography variant="h6" gutterBottom>
                        Menu/Dashboard
                    </Typography>
                    <Button variant="outlined" startIcon={<SettingsIcon />} sx={{ color: '#fff', borderColor: '#fff' }}>
                        Settings
                    </Button>
                </Box>
            </Grid>

            {/* Chatbot */}
            <Grid item xs={12} md={6} sx={{ padding: '1rem', border: '1px solid #fff' }}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Typography variant="h6" gutterBottom>
                        Chat Bot
                    </Typography>
                    <Paper sx={{ flexGrow: 1, backgroundColor: '#2c2c2c', padding: '1rem', color: '#fff' }}>
                        {/* Chat content goes here */}
                    </Paper>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Type here"
                        sx={{ marginTop: '1rem', backgroundColor: '#2c2c2c', input: { color: '#fff' }, borderColor: '#fff' }}
                    />
                </Box>
            </Grid>

            {/* Tasks/Calendar */}
            <Grid item xs={12} md={3} sx={{ padding: '1rem', border: '1px solid #fff' }}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Typography variant="h6" gutterBottom>
                        Tasks
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <Paper sx={{ height: '60%', backgroundColor: '#2c2c2c', padding: '1rem', color: '#fff', marginBottom: '1rem' }}>
                            {/* Task list goes here */}
                        </Paper>
                        <Paper sx={{ height: '30%', backgroundColor: '#2c2c2c', padding: '1rem', color: '#fff' }}>
                            {/* Calendar goes here */}
                        </Paper>
                    </Box>
                    <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }}>
                        Manage Tasks
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}