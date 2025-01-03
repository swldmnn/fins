import { FunctionComponent } from 'react';
import { getColorByCategory } from '../utils/categoryUtil';
import { useTranslation } from 'react-i18next';
import { PropsWithFinRecords } from './FinsCard';
import { formatNumber } from '../utils/numberUtil';
import { Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@mui/material';

const FinRecordList: FunctionComponent<PropsWithFinRecords> = (props) => {
    const { t } = useTranslation();

    const total_amount = props.finRecords
        .map(finRecord => finRecord.amount)
        .reduce((acc, next) => { return acc + next }, 0)

    const getFormattedDate = (date: Date | undefined): string => {
        if (!date) {
            return ''
        }

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return `${year}/${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}`
    }

    return <div>
        <div>
            <span>{t('total_amount')} {formatNumber(total_amount)} / {t('item_count')} {props.finRecords.length}</span>
        </div>
        <TableContainer>
            <Table size='small'>
                <TableBody>
                    {props.finRecords.map((finRecord, i) => {
                        const amountColor = finRecord.amount < 0 ? 'var(--color-expense)' : 'var(--color-income)'

                        return <TableRow key={`FinRecordList_tableRow_${i}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='right' style={{ color: amountColor, fontWeight: 'bold' }}>{formatNumber(finRecord.amount)}</TableCell>
                            <TableCell>{getFormattedDate(finRecord.date)}</TableCell>
                            <TableCell>{finRecord.account}</TableCell>
                            <TableCell><Tooltip title={finRecord.description}><Typography>{finRecord.description.substring(0, 50)}{finRecord.description.length >= 50 ? '...' : ''}</Typography></Tooltip></TableCell>
                            <TableCell>{finRecord.classification}</TableCell>
                            <TableCell style={{ backgroundColor: getColorByCategory(finRecord.category), color: 'black' }}>{finRecord.source ?? t(finRecord.category)}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}

export default FinRecordList;