import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import JsIcon from '../components/Icons/JsIcon';
import ReactIcon from '../components/Icons/ReactIcon';
import CssIcon from '../components/Icons/CssIcon';
import HtmlIcon from '../components/Icons/HtmlIcon';
import ScssIcon from '../components/Icons/ScssIcon';
import NodeIcon from '../components/Icons/NodeIcon';
import WebpackIcon from '../components/Icons/WebpackIcon';
import FigmaIcon from '../components/Icons/FirgmaIcon';

const Skills = () => {
  return (
    <Box sx={{ fontWeight: 400, color: 'grey.600' }}>
      <Typography variant="h2" sx={{ mb: '3rem' }}>
        Skills
      </Typography>
      <Typography variant="h6">PROGRAMMING LANGUAGES & TOOLS</Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          '& svg': {
            fontSize: '50px',
          },
        }}
      >
        <JsIcon />
        <ReactIcon />
        <CssIcon />
        <HtmlIcon />
        <ScssIcon />
        <NodeIcon />
        <WebpackIcon />
        <FigmaIcon />
      </Stack>
      <Box>
        <Typography variant="h6">WORKFLOW</Typography>
        <List sx={{ width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <DoneIcon fontSize="medium" />
            </ListItemAvatar>
            <ListItemText primary="Mobile-First, Responsive Design" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <DoneIcon fontSize="medium" />
            </ListItemAvatar>
            <ListItemText primary="Modern Web Applications" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <DoneIcon fontSize="medium" />
            </ListItemAvatar>
            <ListItemText primary="Cross Browser Testing & Debugging" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <DoneIcon fontSize="medium" />
            </ListItemAvatar>
            <ListItemText primary="Agile Development & Scrum" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Skills;
