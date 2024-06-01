import React, { FunctionComponent, useContext } from 'react';
import { PropsWithFinRecords } from './Card';
import { FinRecord } from '../utils/ReportParser';
import { useTranslation } from 'react-i18next';
import { getColorByCategory } from '../utils/categoryUtil';
import { formatNumber } from '../utils/numberUtil';
import { AppContext } from '../app-context';

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

    const totalsItem = mapFinRecordListToTableItem('cat_total', props.finRecords)

    return <div>
        <table>
            <thead className='TableHeaderRow'>
                <td>{t('header_category')}</td>
                <td>{t('header_income_total')}</td>
                <td>{t('header_income_avg')} {monthCount}</td>
                <td>{t('header_expense_total')}</td>
                <td>{t('header_expense_avg')} {monthCount}</td>
                <td>{t('header_difference')}</td>
            </thead>
            <tbody>
                {tableItems.map((tableItem, i) => {
                    return <tr key={i}>
                        <td style={{ backgroundColor: getColorByCategory(tableItem.category), color: 'black' }}>{t(tableItem.category)}</td>
                        <td style={{ textAlign: 'right' }}>{tableItem.incomeTotal === 0 ? '' : formatNumber(tableItem.incomeTotal)}</td>
                        <td style={{ textAlign: 'right' }}>{tableItem.incomeAvg === 0 ? '' : formatNumber(tableItem.incomeAvg)}</td>
                        <td style={{ textAlign: 'right' }}>{tableItem.expenseTotal === 0 ? '' : formatNumber(tableItem.expenseTotal)}</td>
                        <td style={{ textAlign: 'right' }}>{tableItem.expenseAvg === 0 ? '' : formatNumber(tableItem.expenseAvg)}</td>
                        <td style={{ textAlign: 'right' }}>{formatNumber(tableItem.incomeTotal + tableItem.expenseTotal)}</td>
                    </tr>
                })}
                <tr className='TableHeaderRow'>
                    <td>{t(totalsItem.category)}</td>
                    <td style={{ textAlign: 'right' }}>{formatNumber(totalsItem.incomeTotal)}</td>
                    <td style={{ textAlign: 'right' }}>{formatNumber(totalsItem.incomeAvg)}</td>
                    <td style={{ textAlign: 'right' }}>{formatNumber(totalsItem.expenseTotal)}</td>
                    <td style={{ textAlign: 'right' }}>{formatNumber(totalsItem.expenseAvg)}</td>
                    <td style={{ textAlign: 'right' }}>{formatNumber(totalsItem.incomeTotal + totalsItem.expenseTotal)}</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default FinRecordCategoryTable;