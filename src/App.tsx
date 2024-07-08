import './App.css';
import "./i18n/config";
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from './app-context';
import { Box } from '@mui/material';
import LandingPage from './pages/LandingPage';
import DashBoardPage from './pages/DashboardPage';

function App() {
  const { t } = useTranslation()
  const { state, updateState } = useContext(AppContext)

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {state?.finRecords.length === 0 && (
        <LandingPage />
      )}
      {state!.finRecords.length > 0 && (
        <DashBoardPage />)}
    </Box>
  );
}

export default App;
