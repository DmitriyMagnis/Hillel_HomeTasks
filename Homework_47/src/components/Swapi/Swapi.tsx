import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchSwapyItemById,
  selectSwapyState,
} from '../../redux/slices/swapiSlice';
import { schema } from './schema';

const Swapi = () => {
  const dispatch = useAppDispatch();
  const { item, loading, error } = useAppSelector(selectSwapyState);
  const formik = useFormik<{ peopleId: string }>({
    initialValues: {
      peopleId: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(fetchSwapyItemById(values.peopleId));
      console.log(values);
    },
  });
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={6}>
        <Paper component="form" onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              size="small"
              label="Enter Id For Search People"
              placeholder="1"
              id="peopleId"
              name="peopleId"
              sx={{ m: 1 }}
              value={formik.values.peopleId}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.peopleId)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    https://swapi.dev/api/people/
                  </InputAdornment>
                ),
              }}
            />

            <IconButton
              disabled={!formik.isValid}
              type="submit"
              sx={{ p: '10px' }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {error && (
          <Paper sx={{ p: 2 }}>
            <Typography>Not Found</Typography>
          </Paper>
        )}
        {loading && <CircularProgress size="30px" color="inherit" />}
        {item && (
          <Paper
            sx={{
              p: 2,
            }}
          >
            <Stack spacing={2} textAlign="start">
              <Typography>{item.name}</Typography>
              <Divider />
              <Typography>Height: {item.height}</Typography>
              <Divider />
              <Typography>Weight: {item.mass} kg</Typography>
            </Stack>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default Swapi;
