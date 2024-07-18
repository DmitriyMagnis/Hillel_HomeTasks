import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Zoom,
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

const icons = [
  { Icon: JsIcon },
  { Icon: ReactIcon },
  { Icon: CssIcon },
  { Icon: HtmlIcon },
  { Icon: ScssIcon },
  { Icon: NodeIcon },
  { Icon: WebpackIcon },
  { Icon: FigmaIcon },
];

const workflowItems = [
  { title: 'Mobile-First, Responsive Design' },
  { title: 'Modern Web Applications' },
  { title: 'Cross Browser Testing & Debugging' },
  { title: 'Agile Development & Scrum' },
];

const Skills = () => {
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
        Skills
      </Typography>
      <Typography variant="h6">PROGRAMMING LANGUAGES & TOOLS</Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          py: 5,
          '& svg': {
            fontSize: '50px',

            '&:hover': {
              cursor: 'pointer',
              color: 'black',
            },
          },
        }}
      >
        {icons.map(({ Icon }, i) => (
          <Zoom key={i} in timeout={(i + 1) * 100}>
            <div>
              <Icon />
            </div>
          </Zoom>
        ))}
      </Stack>
      <Box>
        <Typography variant="h6">WORKFLOW</Typography>
        <List sx={{ width: '100%' }}>
          {workflowItems.map(({ title }, i) => (
            <Zoom key={title} in timeout={(i + 1) * 100}>
              <ListItem>
                <ListItemAvatar>
                  <DoneIcon fontSize="medium" />
                </ListItemAvatar>
                <ListItemText primary={title} />
              </ListItem>
            </Zoom>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Skills;
