'use client'

import { SignUp, SignedIn, SignedOut } from '@clerk/nextjs';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';

const Background = styled('div')({
  backgroundColor: '#1a1a2e',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
});

const Header = styled(AppBar)({
  backgroundColor: '#0f3460',
  boxShadow: 'none',
});

const Footer = styled(Box)({
  backgroundColor: '#0f3460',
  color: '#fff',
  padding: '20px 0',
  textAlign: 'center',
  marginTop: 'auto',
});

export default function SignUpPage() {
  return (
   
      <Background>
        <Header position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TaskMaster
            </Typography>
            
            <Button color="inherit" component={Link} href="/app/sign-in">Sign In</Button>
          </Toolbar>
        </Header>
        <Container>
          <Typography variant="h5" component="h1" gutterBottom>
                Sign Up
          </Typography>
        </Container>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <Box sx={{ width: 'false', bgcolor: '#0f3460', p: 4, borderRadius: 2 }}>
            
            <SignUp />
          </Box>
        </Container>

        <Footer>
          <Typography variant="body2">© 2024 TaskMaster. All rights reserved.</Typography>
        </Footer>
      </Background>

  );
}
