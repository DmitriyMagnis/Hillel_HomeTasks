import { Stack, Typography, Box, IconButton, Zoom } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

const icons = [
  { Icon: TelegramIcon },
  { Icon: LinkedInIcon },
  { Icon: GitHubIcon },
  { Icon: FacebookIcon },
];

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
        <Zoom in timeout={200}>
          <Typography variant="h2" sx={{ fontWeight: 500 }}>
            Dmitriy{' '}
            <Typography
              component="span"
              sx={{ fontSize: '3.75rem', color: 'primary.main' }}
            >
              Chernobrivets
            </Typography>
          </Typography>
        </Zoom>
        <Zoom in timeout={300}>
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
        </Zoom>
        <Zoom in timeout={400}>
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
        </Zoom>
        <Box>
          {icons.map(({ Icon }, i) => (
            <Zoom key={i} in timeout={(i + 1) * 100 + 500}>
              <IconButton size="large">
                <Icon color="primary" sx={{ fontSize: '50px' }} />
              </IconButton>
            </Zoom>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
