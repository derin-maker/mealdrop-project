import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import useAuthStore from '../store/authStore'

export default function Landing() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 3,
        py: 2.5,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <Typography sx={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 800,
          fontSize: '1.4rem',
          background: 'linear-gradient(135deg, #E63946 0%, #F4A261 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
        }}>
          🍔 MealDrop
        </Typography>
      </Box>
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
      }}>
        <Typography sx={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 800,
          fontSize: { xs: '2.8rem', md: '5rem' },
          color: 'white',
          lineHeight: 1.05,
          letterSpacing: '-2px',
          mb: 1,
        }}>
          Welcome to
        </Typography>
        <Typography sx={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 800,
          fontSize: { xs: '2.8rem', md: '5rem' },
          lineHeight: 1.05,
          letterSpacing: '-2px',
          mb: 3,
          background: 'linear-gradient(135deg, #E63946 0%, #F4A261 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          MealDrop
        </Typography>
        <Typography sx={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: { xs: '1rem', md: '1.1rem' },
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          mb: 5,
          maxWidth: 320,
          lineHeight: 1.6,
        }}>
          Hot meals, cold drinks, delivered fast to your door.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/home')}
          sx={{
            background: 'linear-gradient(135deg, #E63946 0%, #F4A261 100%)',
            color: 'white',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 800,
            fontSize: '1rem',
            px: 5,
            py: 1.8,
            borderRadius: '999px',
            boxShadow: '0 8px 32px rgba(230,57,70,0.4)',
            textTransform: 'none',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 40px rgba(230,57,70,0.5)',
              background: 'linear-gradient(135deg, #C1121F 0%, #E07B39 100%)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          Start Ordering 🍔
        </Button>
      </Box>
    </Box>
  )
}