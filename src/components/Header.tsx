import { AppBar, Toolbar, Typography } from '@mui/material';
import { FinsLogo } from './FinsLogo';

function Header() {
  return (
    <AppBar position='static' enableColorOnDark sx={{ bgcolor: 'primary.dark' }}>
      <Toolbar>
        <FinsLogo color='primary' sx={{ width: '10rem', height: '3rem' }}></FinsLogo>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
