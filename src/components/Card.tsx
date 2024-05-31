import React, { FunctionComponent, useContext, useState } from 'react';
import { FinRecord } from '../utils/ReportParser';
import { AppContext } from '../app-context';
import MultiSelection from './MultiSelection';
import { getCategoryIds, getSourcesByCategories } from '../utils/categoryUtil';

enum TransactionType {
    credit = "credit",
    debit = "debit"
}

interface FinRecordFilters {
    categories: string[],
    transferSources: string[],
    transactionTypes: TransactionType[]
}

interface CardProps extends React.PropsWithChildren {
    title?: string,
    showFilters?: boolean,
    filterPresets?: FinRecordFilters
}

export interface PropsWithFinRecords extends React.PropsWithChildren {
    finRecords: FinRecord[],
}

const Card: FunctionComponent<CardProps> = (props) => {

    const { state, updateState } = useContext(AppContext)
    const [filters, updateFilters] = useState(props.filterPresets ?? { categories: [], transferSources: [], transactionTypes: [] })

    const onCategoryChange = (selectedCategories: string[]) => {
        updateFilters(prevFilters => ({
            ...prevFilters,
            categories: selectedCategories,
            transferSources: getSourcesByCategories(selectedCategories).filter(transferSource => prevFilters.transferSources.includes(transferSource))
        }))
    }

    const onTransferSourceChange = (selectedTransferSources: string[]) => {
        updateFilters(prevFilters => ({
            ...prevFilters, transferSources: selectedTransferSources
        }))
    }

    const onTransactionTypeChange = (selectedTransactionTypes: string[]) => {
        updateFilters(prevFilters => ({
            ...prevFilters, transactionTypes: selectedTransactionTypes.map(type => TransactionType[type as keyof typeof TransactionType])
        }))
    }

    const filteredFinRecords = filters.categories.length
        ? state?.filteredFinRecords.filter(finRecord => filters.categories.includes(finRecord.category))
        : state?.filteredFinRecords

    const childrenWithFinRecoreds = React.Children.map(props.children, child => {
        if (React.isValidElement<PropsWithFinRecords>(child)) {
            return React.cloneElement(child, { finRecords: filteredFinRecords ?? [] });
        }
        return child;
    });

    return <div className="Card">
        {props.title && <div className='CardTitle'>{props.title}</div>}
        {props.showFilters && <div>
            <MultiSelection
                values={getCategoryIds()}
                selectedValues={filters.categories}
                onChange={(selectedFilters) => onCategoryChange(selectedFilters)}
                translateLabels={true} />

            <MultiSelection
                values={getSourcesByCategories(filters.categories)}
                selectedValues={filters.transferSources}
                onChange={(selectedFilters) => onTransferSourceChange(selectedFilters)} />

            <MultiSelection
                values={Object.values(TransactionType).map(type => type.toString()).filter(value => isNaN(Number(value)))}
                selectedValues={filters.transactionTypes.map(type => type.toString())}
                onChange={(selectedFilters) => onTransactionTypeChange(selectedFilters)}
                translateLabels={true} />
        </div>}
        {childrenWithFinRecoreds}
    </div>
}

export default Card;