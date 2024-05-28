import React, { FunctionComponent, useContext, useState } from 'react';
import { FinRecord } from '../utils/ReportParser';
import { AppContext } from '../app-context';
import MultiSelection from './MultiSelection';
import { getCategoryIds } from '../utils/categoryUtil';

interface CardProps extends React.PropsWithChildren {
    title?: string,
    showFilters?: boolean
}

export interface PropsWithFinRecords extends React.PropsWithChildren {
    finRecords: FinRecord[],
}

const Card: FunctionComponent<CardProps> = (props) => {

    const { state, updateState } = useContext(AppContext)
    const [filters, updateFilters] = useState([] as string[])

    const onFilterChange = (selectedFilters: string[]) => {
        updateFilters(selectedFilters)
    }

    const filteredFinRecords = filters.length 
    ? state?.filteredFinRecords.filter(finRecord => filters.includes(finRecord.category))
    : state?.filteredFinRecords

    const childrenWithFinRecoreds = React.Children.map(props.children, child => {
        if (React.isValidElement<PropsWithFinRecords>(child)) {
            return React.cloneElement(child, { finRecords: filteredFinRecords ?? [] });
        }
        return child;
    });

    return <div className="Card">
        {props.title && <div className='CardTitle'>{props.title}</div>}
        {props.showFilters &&
            <MultiSelection
                values={getCategoryIds()}
                selectedValues={filters}
                onChange={(selectedFilters) => onFilterChange(selectedFilters)}
                translateLabels={true} />}
        {childrenWithFinRecoreds}
    </div>
}

export default Card;