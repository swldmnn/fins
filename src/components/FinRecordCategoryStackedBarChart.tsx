import React, { FunctionComponent, useContext } from 'react';
import { PropsWithFinRecords } from './FinsCard';
import { FinRecord } from '../utils/ReportParser';
import { useTranslation } from 'react-i18next';
import { getCategoryIds, getColorByCategory } from '../utils/categoryUtil';
import { AppContext } from '../app-context';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface ChartItem {
    name: string,
    [key: string]: any
}

const FinRecordCategoryStackedBarChart: FunctionComponent<PropsWithFinRecords> = (props) => {

    const { t } = useTranslation()
    const { state, updateState } = useContext(AppContext)

    const getAbsAmount = (finRecords: FinRecord[]) => {
        const total = finRecords
            .map(finRecord => finRecord.amount)
            .reduce((sum, next) => { return sum + next }, 0)

        return Math.abs(total)
    }

    const incomesItem: ChartItem = { name: t('incomes') }
    const expensesItem: ChartItem = { name: t('expenses') }

    props.finRecords
        .filter(finRecord => finRecord.amount < 0)
        .reduce((recordMap, finRecord) => {
            const finRecords = recordMap.get(finRecord.category) ?? []
            finRecords.push(finRecord)
            recordMap.set(finRecord.category, finRecords)
            return recordMap
        }, new Map<string, FinRecord[]>())
        .forEach((finRecords, category) => {
            expensesItem[category] = (getAbsAmount(finRecords))
        })

    props.finRecords
        .filter(finRecord => finRecord.amount >= 0)
        .reduce((recordMap, finRecord) => {
            const finRecords = recordMap.get(finRecord.category) ?? []
            finRecords.push(finRecord)
            recordMap.set(finRecord.category, finRecords)
            return recordMap
        }, new Map<string, FinRecord[]>())
        .forEach((finRecords, category) => {
            incomesItem[category] = (getAbsAmount(finRecords))
        })

    return <BarChart
        width={500}
        height={500}
        data={[incomesItem, expensesItem]}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} shared={false} />
        {
            getCategoryIds().map(id => {
                return <Bar dataKey={id} stackId="a" fill={getColorByCategory(id)} key={`bar_${id}`} />
            })
        }
    </BarChart>
}

export default FinRecordCategoryStackedBarChart;