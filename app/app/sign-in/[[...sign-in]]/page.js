'use client'

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { AppBar, Box, Button, Container, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

export default function SignInPage() {
  return (
    <Container maxWidth={false} sx={{ backgroundColor: '#1a1a2e', py: 4, minHeight: '100vh' }}>
      <AppBar position="static" color="primary" sx={{ boxShadow: 'none', backgroundColor: '#0f3460' }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{
              flexGrow: 1
            }}
          >
            <IconButton edge="start" color="inherit" aria-label="home" href="/">
              <HomeIcon />
            </IconButton>
            <Button color="inherit" href="/">
              TaskMaster
            </Button>
          </Typography>
          
          <Button color="inherit" component={Link} href="/app/sign-up">Sign up</Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center', my: 4 }}
        minHeight={'100%'}
      >
        
        <Box sx={{ width: 'false', bgcolor: '#0f3460', p: 4, borderRadius: 2 }}>
          <SignIn />
        </Box>
      </Box>
    </Container>
  );
}
