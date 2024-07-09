import { AppBar, Toolbar, Typography } from '@mui/material';
import { FinsLogo } from './FinsLogo';

function Header() {
  return (
    <div className='Header'>
        <FinsLogo color='primary' sx={{ width: '10rem', height: '3rem' }}></FinsLogo>
        </div>
  );
}

export default Header;
