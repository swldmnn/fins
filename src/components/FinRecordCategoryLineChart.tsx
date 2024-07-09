import React, { FunctionComponent, useContext } from 'react';
import { PropsWithFinRecords } from './FinsCard';
import { FinRecord } from '../utils/ReportParser';
import { useTranslation } from 'react-i18next';
import { getCategoryIds, getColorByCategory } from '../utils/categoryUtil';
import { AppContext } from '../app-context';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface ChartItem {
    name: string,
    [key: string]: any
}

const FinRecordCategoryLineChart: FunctionComponent<PropsWithFinRecords> = (props) => {

    const { t } = useTranslation()
    const { state, updateState } = useContext(AppContext)

    const getAbsAmount = (finRecords: FinRecord[]) => {
        const total = finRecords
            .map(finRecord => finRecord.amount)
            .reduce((sum, next) => { return sum + next }, 0)

        return Math.abs(total)
    }

    const chartItems: ChartItem[] = Array.from(props.finRecords
        .reduce((recordMap, finRecord) => {
            const itemKey = `${finRecord.date.getMonth()}-${finRecord.date.getFullYear()}`
            const item = recordMap.get(itemKey) ?? { name: itemKey } as ChartItem
            const value = item?.[finRecord.category] ?? 0
            item[finRecord.category] = value + finRecord.amount
            recordMap.set(itemKey, item)
            return recordMap
        }, new Map<string, ChartItem>())
        .values())

    return <ResponsiveContainer width="100%" height={500}>
        <LineChart
            data={chartItems}
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
            <Tooltip content={CustomTooltip} shared={false} />
            {
                getCategoryIds().map(id => {
                    return <Line type="monotone" dataKey={id} stroke={getColorByCategory(id)} strokeWidth={4} key={`line_${id}`} />
                })
            }
        </LineChart>
    </ResponsiveContainer>
}

export default FinRecordCategoryLineChart;