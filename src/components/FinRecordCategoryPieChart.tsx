import React, { FunctionComponent, useContext } from 'react';
import { PropsWithFinRecords } from './FinsCard';
import { FinRecord } from '../utils/ReportParser';
import { useTranslation } from 'react-i18next';
import { getColorByCategory } from '../utils/categoryUtil';
import { formatNumber } from '../utils/numberUtil';
import { AppContext } from '../app-context';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts';

interface ChartItem {
    name: string,
    value: number,
    fill: string,
}

const FinRecordCategoryPieChart: FunctionComponent<PropsWithFinRecords> = (props) => {

    const { t } = useTranslation()
    const { state, updateState } = useContext(AppContext)

    const mapFinRecordListToChartItem = (category: string, finRecords: FinRecord[]) => {
        const total = finRecords
            .map(finRecord => finRecord.amount)
            .reduce((sum, next) => { return sum + next }, 0)

        return { name: t(category), value: Math.abs(total), fill: getColorByCategory(category) } as ChartItem
    }

    const incomeItems: ChartItem[] = []
    const expenseItems: ChartItem[] = []

    props.finRecords
        .filter(finRecord => finRecord.amount < 0)
        .reduce((recordMap, finRecord) => {
            const finRecords = recordMap.get(finRecord.category) ?? []
            finRecords.push(finRecord)
            recordMap.set(finRecord.category, finRecords)
            return recordMap
        }, new Map<string, FinRecord[]>())
        .forEach((finRecords, category) => {
            expenseItems.push(mapFinRecordListToChartItem(category, finRecords))
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
            incomeItems.push(mapFinRecordListToChartItem(category, finRecords))
        })

    return <PieChart width={400} height={400}>
        <Pie
            dataKey="value"
            nameKey="name"
            startAngle={180}
            endAngle={0}
            data={incomeItems}
            cx="50%"
            cy="48%"
            outerRadius={180}
            fill='var(--color-contrast-0)'
        />
        <Pie
            dataKey="value"
            nameKey="name"
            startAngle={360}
            endAngle={180}
            data={expenseItems}
            cx="50%"
            cy="52%"
            outerRadius={180}
            fill='var(--color-contrast-0)'
        />
        <Tooltip/>
    </PieChart>
}

export default FinRecordCategoryPieChart;