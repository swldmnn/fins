import { FunctionComponent, PropsWithChildren, useContext } from 'react';
import { getColorByCategory } from '../utils/categoryUtil';
import { formatNumber } from '../utils/numberUtil';

interface LoadingIndicatorProps {
    percent: number,
}

const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = (props) => {
    const degrees = props.percent * 3.6

    return <div className='overlay'>
        <div
            className='LoadingIndicator'
            style={{ background: `conic-gradient(from 0deg at center, var(--color-contrast-0) ${degrees}deg, var(--color-0) 0deg)` }}
        />
    </div>
}

export default LoadingIndicator;