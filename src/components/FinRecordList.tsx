import { FunctionComponent, useContext } from 'react';
import { AppContext } from '../app-context';
import { getColorByCategory } from '../utils/categoryUtil';
import { useTranslation } from 'react-i18next';
import { PropsWithFinRecords } from './Card';
import { formatNumber } from '../utils/numberUtil';

const FinRecordList: FunctionComponent<PropsWithFinRecords> = (props) => {
    const { t } = useTranslation();

    const total_amount = props.finRecords
        .map(finRecord => finRecord.amount)
        .reduce((acc, next) => { return acc + next }, 0)

    return <div>
        <div>
            <span>{t('total_amount')} {formatNumber(total_amount)} / {t('item_count')} {props.finRecords.length}</span>
        </div>
        <table>
            <tbody>
                {props.finRecords.map((finRecord, i) => {
                    const amountColor = finRecord.amount < 0 ? 'var(--color-expense)' : 'var(--color-income)'

                    return <tr key={i}>
                        <td style={{ textAlign: 'right', color: amountColor, fontWeight: 'bold' }}>{formatNumber(finRecord.amount)}</td>
                        <td>{finRecord.date.toDateString()}</td>
                        <td>{finRecord.account}</td>
                        <td>{finRecord.description}</td>
                        <td>{finRecord.classification}</td>
                        <td style={{ backgroundColor: getColorByCategory(finRecord.category), color: 'black' }}>{finRecord.source ?? t(finRecord.category)}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default FinRecordList;