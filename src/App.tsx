import './App.css';
import Header from './components/Header';
import FinRecordList from './components/FinRecordList';
import GlobalSettings from './components/GlobalSettings';
import "./i18n/config";
import Card from './components/Card';
import { useTranslation } from 'react-i18next';
import FinRecordCategoryTable from './components/FinRecordCategoryTable';

function App() {
  const { t } = useTranslation()

  return (
    <div className="App">
      <Header></Header>
      <Card title={t('title_options')}>
        <GlobalSettings></GlobalSettings>
      </Card>
      <Card title={t('title_category_table')} showFilters={false}>
        <FinRecordCategoryTable finRecords={[]} />
      </Card>
      <Card title={t('title_records')} showFilters={true}>
        <FinRecordList finRecords={[]}></FinRecordList>
      </Card>
    </div>
  );
}

export default App;
