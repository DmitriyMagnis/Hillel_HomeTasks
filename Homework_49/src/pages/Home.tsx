import { Stack, Typography, Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Stack>
        <Typography variant="h2" sx={{ fontWeight: 500 }}>
          Dmitriy{' '}
          <Typography
            component="span"
            sx={{ fontSize: '3.75rem', color: 'primary.main' }}
          >
            Chernobrivets
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'grey.600',
            mb: '3rem ',
          }}
        >
          Web developer. Creative front-end developer crafting engaging,
          responsive web experiences with precision.
        </Typography>
        <Typography
          sx={{
            fontSize: '1.25rem',
            mb: '3rem',
            color: 'grey.500',
          }}
        >
          I am experienced in leveraging agile frameworks to provide a robust
          synopsis for high level overviews. Iterative approaches to corporate
          strategy foster collaborative thinking to further the overall value
          proposition.
        </Typography>
        <Box>
          <IconButton size="large">
            <FacebookIcon color="primary" sx={{ fontSize: '50px' }} />
          </IconButton>
          <IconButton size="large">
            <GitHubIcon color="primary" sx={{ fontSize: '50px' }} />
          </IconButton>
          <IconButton size="large">
            <LinkedInIcon color="primary" sx={{ fontSize: '50px' }} />
          </IconButton>
          <IconButton size="large">
            <TelegramIcon color="primary" sx={{ fontSize: '50px' }} />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
