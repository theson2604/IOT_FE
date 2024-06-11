// import { Helmet } from 'react-helmet-async';
// // @mui
// import { styled } from '@mui/material/styles';
// import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// // hooks
// import useResponsive from '../hooks/useResponsive';
// // components
// import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// // sections
// import { LoginForm } from '../services/login';

// // ----------------------------------------------------------------------

// const StyledRoot = styled('div')(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex',
//   },
// }));

// const StyledSection = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: 480,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   boxShadow: theme.customShadows.card,
//   backgroundColor: theme.palette.background.default,
// }));

// const StyledContent = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0),
// }));

// // ----------------------------------------------------------------------

// export default function LoginPage() {
//   const mdUp = useResponsive('up', 'md');

//   return (
//     <>
//       <Helmet>
//         <title> Login </title>
//       </Helmet>

//       <StyledRoot>
//         <Logo
//           sx={{
//             position: 'fixed',
//             top: { xs: 16, sm: 24, md: 40 },
//             left: { xs: 16, sm: 24, md: 40 },
//           }}
//         />

//         {mdUp && (
//           <StyledSection>
//             <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
//               Hi, Welcome Back
//             </Typography>
//             <img src="/assets/illustrations/illustration_login.png" alt="login" />
//           </StyledSection>
//         )}

//         <Container maxWidth="sm">
//           <StyledContent>
//             <Typography variant="h4" gutterBottom>
//               Sign in to CSA
//             </Typography>

//             <Typography variant="body2" sx={{ mb: 5 }}>
//               Don’t have an account? {''}
//               <Link variant="subtitle2">Get started</Link>
//             </Typography>

//             <Stack direction="row" spacing={2}>
//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
//               </Button>

//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
//               </Button>

//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
//               </Button>
//             </Stack>

//             <Divider sx={{ my: 3 }}>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                 OR
//               </Typography>
//             </Divider>

//             <LoginForm />
//           </StyledContent>
//         </Container>
//       </StyledRoot>
//     </>
//   );
// }


import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';


const Login=()=>{

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setTimeout(() => {
      setOpen(true);
    }, 800);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  return(
      <Grid>
          <Paper elevation={20} style={paperStyle}>
              <Grid align='center'>
                  <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                  <h2>Sign In</h2>
              </Grid>
              <TextField style={{marginTop: '1rem', marginBottom: '0.5rem'}} label='Username' placeholder='Enter username' variant="outlined" fullWidth required/>
              <TextField style={{marginBottom: '0.5rem'}} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>
              <FormControlLabel
                  control={
                  <Checkbox
                      name="checkedB"
                      color="primary"
                  />
                  }
                  label="Remember me"
                />
              <Button onClick={handleSignInClick} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
              <Typography >
                    <Link href="#" >
                      Forgot password ?
              </Link>
              </Typography>
              <Typography > Do you have an account ?
                    <Link href="#" >
                      Sign Up 
              </Link>
              </Typography>
          </Paper>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Login Successful!
            </MuiAlert>
          </Snackbar>
      </Grid>
  )
}

export default Login