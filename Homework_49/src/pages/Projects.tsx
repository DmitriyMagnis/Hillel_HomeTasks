import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Grow,
  Stack,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';

const Projects = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        fontWeight: 400,
        color: 'grey.600',
      }}
    >
      <Typography variant="h2" sx={{ mb: '3rem' }}>
        Projects
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <Grow in>
            <Card>
              <CardMedia
                sx={{ minHeight: 140 }}
                image="../../public/candle.png"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  TECHNOLOGIES
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    label="HTML"
                    size="small"
                    color="primary"
                    sx={{ color: 'white' }}
                  />
                  <Chip
                    label="CSS"
                    size="small"
                    color="primary"
                    sx={{ color: 'white' }}
                  />
                  <Chip
                    label="JS"
                    size="small"
                    color="primary"
                    sx={{ color: 'white' }}
                  />
                </Stack>
                <Typography gutterBottom variant="h5">
                  HM-CANDLER
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover the art of eco-friendly candle-making with our
                  high-quality soy wax products, designed to bring comfort and
                  harmony to your home.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  target="_blank"
                  to="https://github.com/DmitriyMagnis/Pure-Project-HtmlCssJs-/tree/main"
                  size="small"
                  startIcon={<GitHubIcon />}
                >
                  Github
                </Button>
                <Button
                  component={Link}
                  target="_blank"
                  to="https://pure-project-html-css-js.vercel.app/"
                  size="small"
                  startIcon={<RemoveRedEyeIcon />}
                >
                  Live Preview
                </Button>
              </CardActions>
            </Card>
          </Grow>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Projects;
