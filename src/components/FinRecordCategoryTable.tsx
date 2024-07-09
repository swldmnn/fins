import { FunctionComponent, useContext } from 'react';
import { PropsWithFinRecords } from './FinsCard';
import { FinRecord } from '../utils/ReportParser';
import { useTranslation } from 'react-i18next';
import { getColorByCategory, getSortIndexByCategory } from '../utils/categoryUtil';
import { formatNumber } from '../utils/numberUtil';
import { AppContext } from '../app-context';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface TableItem {
    category: string,
    incomeTotal: number,
    incomeAvg: number,
    expenseTotal: number,
    expenseAvg: number,
}

const FinRecordCategoryTable: FunctionComponent<PropsWithFinRecords> = (props) => {
    const monthDiff = (d1?: Date, d2?: Date): number => {
        if (!d1 || !d2) {
            return 1
        }

        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth() + 1;
        return months <= 0 ? 0 : months;
    }

    const { t } = useTranslation()
    const { state, updateState } = useContext(AppContext)
    const monthCount = monthDiff(state?.timeRange.selectedStart, state?.timeRange.selectedEnd)

    const mapFinRecordListToTableItem = (category: string, finRecords: FinRecord[]) => {
        const monthCount = monthDiff(state?.timeRange.selectedStart, state?.timeRange.selectedEnd)
        const incomeTotal = finRecords
            .map(finRecord => finRecord.amount)
            .filter(amount => amount >= 0)
            .reduce((sum, next) => { return sum + next }, 0)

        const expenseTotal = finRecords
            .map(finRecord => finRecord.amount)
            .filter(amount => amount < 0)
            .reduce((sum, next) => { return sum + next }, 0)

        const incomeAvg = incomeTotal / monthCount
        const expenseAvg = expenseTotal / monthCount

        return { category, incomeTotal, incomeAvg, expenseTotal, expenseAvg } as TableItem
    }

    const tableItems: TableItem[] = []

    props.finRecords
        .reduce((recordMap, finRecord) => {
            const finRecords = recordMap.get(finRecord.category) ?? []
            finRecords.push(finRecord)
            recordMap.set(finRecord.category, finRecords)
            return recordMap
        }, new Map<string, FinRecord[]>())
        .forEach((finRecords, category) => {
            tableItems.push(mapFinRecordListToTableItem(category, finRecords))
        })

    tableItems.sort((a,b) => getSortIndexByCategory(a.category) - getSortIndexByCategory(b.category))

    const totalsItem = mapFinRecordListToTableItem('cat_total', props.finRecords)

    return <TableContainer component={Box}>
        <Table size='small'>
            <TableHead>
                <TableRow className='tableHeaderRow'>
                    <TableCell sx={{fontWeight: 'bold'}}>{t('header_category')}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{t('header_income_total')}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{t('header_income_avg')} {monthCount}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{t('header_expense_total')}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{t('header_expense_avg')} {monthCount}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{t('header_difference')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableItems.map((tableItem, i) => {
                    return <TableRow key={i}>
                        <TableCell style={{ backgroundColor: getColorByCategory(tableItem.category), color: 'black' }}>{t(tableItem.category)}</TableCell>
                        <TableCell align='right'>{tableItem.incomeTotal === 0 ? '' : formatNumber(tableItem.incomeTotal)}</TableCell>
                        <TableCell align='right'>{tableItem.incomeAvg === 0 ? '' : formatNumber(tableItem.incomeAvg)}</TableCell>
                        <TableCell align='right'>{tableItem.expenseTotal === 0 ? '' : formatNumber(tableItem.expenseTotal)}</TableCell>
                        <TableCell align='right'>{tableItem.expenseAvg === 0 ? '' : formatNumber(tableItem.expenseAvg)}</TableCell>
                        <TableCell align='right'>{formatNumber(tableItem.incomeTotal + tableItem.expenseTotal)}</TableCell>
                    </TableRow>
                })}
                <TableRow className='tableHeaderRow' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{fontWeight: 'bold'}}>{t(totalsItem.category)}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{formatNumber(totalsItem.incomeTotal)}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{formatNumber(totalsItem.incomeAvg)}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{formatNumber(totalsItem.expenseTotal)}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{formatNumber(totalsItem.expenseAvg)}</TableCell>
                    <TableCell sx={{fontWeight: 'bold'}} align='right'>{formatNumber(totalsItem.incomeTotal + totalsItem.expenseTotal)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}

export default FinRecordCategoryTable;