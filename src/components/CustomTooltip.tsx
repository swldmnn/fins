import { formatNumber } from '../utils/numberUtil';
import { useTranslation } from 'react-i18next';

const CustomTooltip = ({ active, payload, label }: any) => {
    const { t } = useTranslation()

    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                {
                    payload.map((element: any) => {
                        const value = formatNumber(element.payload[element.dataKey])
                        return <p key={`tooltip_${element.dataKey}`}>
                            <span style={{ color: element.color, paddingRight: '0.5rem' }}>■</span>
                            {`${t(element.dataKey)}: ${value}`}
                        </p>
                    })
                }
            </div>
        )
    }
    return null;
}

export default CustomTooltip;