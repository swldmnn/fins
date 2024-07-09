import { useTranslation } from "react-i18next"
import FinRecordCategoryLineChart from "../components/FinRecordCategoryLineChart"
import FinRecordCategoryStackedBarChart from "../components/FinRecordCategoryStackedBarChart"
import FinRecordCategoryTable from "../components/FinRecordCategoryTable"
import FinRecordList from "../components/FinRecordList"
import FinsCard from "../components/FinsCard"
import GlobalSettings from "../components/GlobalSettings"
import Header from "../components/Header"
import { Grid } from "@mui/material"

const DashBoardPage = () => {
    const { t } = useTranslation()

    return <Grid container spacing={1}>
        <Grid item xs={12}>
            <Header />
        </Grid>
        <Grid item xs={12}>
            <FinsCard title={t('title_options')}>
                <GlobalSettings></GlobalSettings>
            </FinsCard>
        </Grid>
        <Grid item lg={7} md={12} sm={12} xs={12}>
            <FinsCard title={t('title_category_table')} showFilters={false}>
                <FinRecordCategoryTable finRecords={[]} />
            </FinsCard>
        </Grid>
        <Grid item lg={5} md={12} sm={12} xs={12}>
            <FinsCard title={t('title_category_stack')} showFilters={false}>
                <FinRecordCategoryStackedBarChart finRecords={[]} />
            </FinsCard>
        </Grid>
        <Grid item xs={12}>
            <FinsCard title={t('title_category_line')} showFilters={true}>
                <FinRecordCategoryLineChart finRecords={[]} />
            </FinsCard>
        </Grid>
        <Grid item xs={12}>
            <FinsCard title={t('title_records')} showFilters={true}>
                <FinRecordList finRecords={[]}></FinRecordList>
            </FinsCard>
        </Grid>
    </Grid>
}

export default DashBoardPage