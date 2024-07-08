import './App.css';
import Header from './components/Header';
import FinRecordList from './components/FinRecordList';
import GlobalSettings from './components/GlobalSettings';
import "./i18n/config";
import FinsCard from './components/FinsCard';
import { useTranslation } from 'react-i18next';
import FinRecordCategoryTable from './components/FinRecordCategoryTable';
import { useContext } from 'react';
import { AppContext } from './app-context';
import FileChooser from './components/FileChooser';
import FinRecordCategoryStackedBarChart from './components/FinRecordCategoryStackedBarChart';
import FinRecordCategoryLineChart from './components/FinRecordCategoryLineChart';
import { FinsLogo } from './components/FinsLogo';
import { Box } from '@mui/material';

function App() {
  const { t } = useTranslation()
  const { state, updateState } = useContext(AppContext)

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {state?.finRecords.length === 0 && (
        <div className='landingBox'>
          <FinsLogo sx={{ width: '10rem', height: '3rem' }} color='primary'></FinsLogo>
          <FinsCard>
            <FileChooser showFileCount={false}></FileChooser>
          </FinsCard>
        </div>
      )}
      {state!.finRecords.length > 0 && (
        <div>
          <Header />
          <FinsCard title={t('title_options')}>
            <GlobalSettings></GlobalSettings>
          </FinsCard>
          <div className='cardBox'>
            <FinsCard title={t('title_category_table')} showFilters={false}>
              <FinRecordCategoryTable finRecords={[]} />
            </FinsCard>
            <FinsCard title={t('title_category_stack')} showFilters={false}>
              <FinRecordCategoryStackedBarChart finRecords={[]} />
            </FinsCard>
            <div style={{ width: '100%' }}>
              <FinsCard title={t('title_category_line')} showFilters={true}>
                <FinRecordCategoryLineChart finRecords={[]} />
              </FinsCard>
            </div>
            <div style={{ width: '100%' }}>
              <FinsCard title={t('title_records')} showFilters={true}>
                <FinRecordList finRecords={[]}></FinRecordList>
              </FinsCard>
            </div>
          </div>
        </div>)}
    </Box>
  );
}

export default App;
