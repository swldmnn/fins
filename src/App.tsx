import './App.css';
import Header from './components/Header';
import FinRecordList from './components/FinRecordList';
import GlobalSettings from './components/GlobalSettings';
import "./i18n/config";
import Card from './components/Card';
import { useTranslation } from 'react-i18next';
import FinRecordCategoryTable from './components/FinRecordCategoryTable';
import { useContext } from 'react';
import { AppContext } from './app-context';
import FileChooser from './components/FileChooser';
import FinsLogo from './components/FinsLogo';

function App() {
  const { t } = useTranslation()
  const { state, updateState } = useContext(AppContext)

  return (
    <div className="App">
      {state!.finRecords.length > 0 && (
        <div>
          <Header />
          <Card title={t('title_options')}>
            <GlobalSettings></GlobalSettings>
          </Card>
          <Card title={t('title_category_table')} showFilters={false}>
            <FinRecordCategoryTable finRecords={[]} />
          </Card>
          <Card title={t('title_records')} showFilters={true}>
            <FinRecordList finRecords={[]}></FinRecordList>
          </Card>
        </div>)}
      {state?.finRecords.length === 0 && (
        <div>
          <div className='landingBox'>
            <div style={{ display: 'inline-block' }}>
              <div className="landingHeader">
                <FinsLogo></FinsLogo>
                <span>FINS</span>
              </div>
              <Card>
                <FileChooser></FileChooser>
              </Card>
            </div>
          </div>
        </div>)}
    </div>
  );
}

export default App;
