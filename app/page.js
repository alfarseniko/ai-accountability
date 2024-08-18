'use client';

import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import { ArrowForward } from '@mui/icons-material';
import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
  transform: 'translateY(-100%)',
  transition: 'transform 0.5s ease-in-out',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 10,
  '&.scrolled': {
    transform: 'translateY(0)',
  },
});

const HeroSection = styled(Box)({
  backgroundImage: 'url("/hero-background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#fff',
  flexDirection: 'column',
  padding: '0 20px',
  position: 'relative',
  zIndex: 1,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(26,26,46,0.8), rgba(26,26,46,0.8))',
    zIndex: -1,
  },
});

const HeroTitle = styled(Typography)({
  fontSize: '3rem',
  fontWeight: 700,
});

const HeroSubtitle = styled(Typography)({
  marginTop: '20px',
  fontSize: '1.5rem',
  fontWeight: 300,
  color: '#a9a9a9',
});

const FeaturesSection = styled(Container)({
  marginTop: '50px',
  marginBottom: '50px',
});

const FeatureBox = styled(Paper)({
  backgroundColor: '#0f3460',
  padding: '20px',
  textAlign: 'center',
  color: '#fff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'all 0.3s ease-in-out',
  },
  '& svg': {
    fontSize: '2rem',
    marginBottom: '10px',
  },
});

const AnimatedButton = styled(Button)({
  backgroundColor: '#ef476f',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#d43f5e',
    boxShadow: '0 0 10px #ef476f, 0 0 20px #ef476f, 0 0 30px #ef476f',
  },
});

const Footer = styled(Box)({
  backgroundColor: '#0f3460',
  color: '#fff',
  padding: '20px 0',
  textAlign: 'center',
  marginTop: 'auto',
});

export default function Home() {
  const { isSignedIn } = useUser();
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Background>
      <AppBar position="static" color="primary" sx={{ boxShadow: 'none', backgroundColor: '#2C3E50' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TaskMaster
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/app/sign-in" sx={{ fontWeight: 'bold' }}>Login</Button>
            <Button color="inherit" href="/app/sign-up" sx={{ fontWeight: 'bold' }}>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <HeroSection>
        <animated.div style={props}>
          <HeroTitle>Master Your Day with TaskMaster</HeroTitle>
          <HeroSubtitle>Your ultimate accountability partner</HeroSubtitle>
          <SignedIn>
            <AnimatedButton
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
              href="/app"
            >
              Go to App
            </AnimatedButton>
          </SignedIn>
          <SignedOut>
            <AnimatedButton
              variant="contained"
              color="primary"
              sx={{ mt: 3, mr: 2, px: 4, py: 1.5, fontWeight: 'bold', backgroundColor: '#2980B9' }}
              href="/app/sign-up"
            >
              Get Started
            </AnimatedButton>
          </SignedOut>
        </animated.div>
      </HeroSection>

      <FeaturesSection>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureBox>
              <ArrowForward />
              <Typography variant="h5" component="div" gutterBottom>
                Create Your Tasks
              </Typography>
              <Typography>Use AI to plan your day with precision.</Typography>
            </FeatureBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureBox>
              <ArrowForward />
              <Typography variant="h5" component="div" gutterBottom>
                Stay On Track
              </Typography>
              <Typography>Get reminders and prompts before deadlines.</Typography>
            </FeatureBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureBox>
              <ArrowForward />
              <Typography variant="h5" component="div" gutterBottom>
                Improve Daily
              </Typography>
              <Typography>Receive suggestions to overcome obstacles.</Typography>
            </FeatureBox>
          </Grid>
        </Grid>
      </FeaturesSection>

      <Footer>
        <Typography variant="body2">© 2024 TaskMaster. All rights reserved.</Typography>
      </Footer>
    </Background>
  );
}
