import { Box, Grid, Typography, Zoom } from '@mui/material';

const Education = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',

        color: 'grey.600',
      }}
    >
      <Typography variant="h2" sx={{ mb: '3rem' }}>
        Education
      </Typography>

      <Grid container sx={{ mb: '3rem' }}>
        <Zoom in timeout={200}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4">
              Igor Sikorsky Kyiv Polytechniy Institute
            </Typography>
            <Typography>
              Bachelor's degree, Thermal Power Engineering
            </Typography>
          </Grid>
        </Zoom>
        <Zoom in timeout={200}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',

              justifyContent: 'flex-end',
            }}
          >
            <Typography color="primary">August 2006 - June 2010</Typography>
          </Grid>
        </Zoom>
      </Grid>

      <Grid container>
        <Zoom in timeout={400}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Hillel IT School</Typography>
            <Typography>Course: Front-End Pro</Typography>
          </Grid>
        </Zoom>
        <Zoom in timeout={400}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Typography color="primary">May 2024 - September 2024</Typography>
          </Grid>
        </Zoom>
      </Grid>
    </Box>
  );
};

export default Education;
