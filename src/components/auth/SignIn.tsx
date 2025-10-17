import { useState } from 'react';
import { auth } from 'services/firebase';
import { Alert, Button, Box, TextField, Typography, Avatar, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email as string, password as string);
    } catch {
      setError('Invalid email or password');
    } finally {
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {loading ? <LoopIcon /> : <LockOutlinedIcon />}
        </Avatar>
        <Typography component='h1' variant='h5'>
          {loading ? 'Signing in...' : 'Sign in'}
        </Typography>
      </Box>
      {!loading && (
        <Box component='form' onSubmit={handleSignIn} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            type='email'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={!email || !password}>
            Sign In
          </Button>
          {error && <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
      )}
    </Container>
  );
};
