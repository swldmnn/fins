import { FunctionComponent, useContext } from 'react';
import { AppContext } from '../app-context';
import { getColorByCategory } from '../utils/categoryUtil';
import { useTranslation } from 'react-i18next';
import { PropsWithFinRecords } from './Card';

const FinRecordList:FunctionComponent<PropsWithFinRecords> = (props) => {
    const {t} = useTranslation();

    const total_amount = props.finRecords
    .map(finRecord => finRecord.amount)
    .reduce((acc, next) => {return acc + next}, 0)

    return <div>
        <div>
            <span>{t('total_amount')}: {total_amount}</span>
        </div>
        <table>
            <tbody>
                {props.finRecords.map((finRecord, i) => {
                    return <tr key={i}>
                        <td>{finRecord.amount.toString()}</td>
                        <td>{finRecord.date.toDateString()}</td>
                        <td>{finRecord.account}</td>
                        <td>{finRecord.description}</td>
                        <td>{finRecord.classification}</td>
                        <td style={{backgroundColor:getColorByCategory(finRecord.category), color:'black'}}>{finRecord.source}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default FinRecordList;