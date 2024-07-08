import { AppBar, Toolbar, Typography } from '@mui/material';
import { FinsLogo } from './FinsLogo';

function Header() {
  return (
    <AppBar position='static' className="Header" enableColorOnDark sx={{ bgcolor: 'primary.dark' }}>
      <Toolbar>
        <FinsLogo color='primary' sx={{ width: '2.4rem', height: '2.4rem' }}></FinsLogo>
        <Typography variant="h1" color="primary">FINS</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
