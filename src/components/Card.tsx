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
    transactionTypes: TransactionType[],
    amountLimit: number,
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
    const [filters, updateFilters] = useState(props.filterPresets ?? { categories: [], transferSources: [], transactionTypes: [], amountLimit: 0 })

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

    const onAmountLimitChange = (amountLimit: number) => {
        updateFilters(prevFilters => ({
            ...prevFilters, amountLimit
        }))
    }

    const matchesTransactionTypes = (finRecord: FinRecord, transactionTypes: TransactionType[]): boolean => {
        const transactionType = finRecord.amount >= 0
            ? TransactionType.credit
            : TransactionType.debit

        return !transactionTypes.length || transactionTypes.includes(transactionType)
    }

    const filteredFinRecords = state?.filteredFinRecords
        .filter(finRecord => matchesTransactionTypes(finRecord, filters.transactionTypes))
        .filter(finRecord => !filters.categories.length || filters.categories.includes(finRecord.category))
        .filter(finRecord => !filters.transferSources.length || (finRecord.source && filters.transferSources.includes(finRecord.source)))
        .filter(finRecord => Math.abs(finRecord.amount) >= filters.amountLimit)

    const childrenWithFinRecoreds = React.Children.map(props.children, child => {
        if (React.isValidElement<PropsWithFinRecords>(child)) {
            return React.cloneElement(child, { finRecords: filteredFinRecords ?? [] });
        }
        return child;
    });

    return <div className="Card">
        <div className='CardHeader'>
            {props.title && <div><h1>{props.title}</h1></div>}
            {props.showFilters && <div className='CardFilters'>
                <MultiSelection
                    values={Object.values(TransactionType).map(type => type.toString()).filter(value => isNaN(Number(value)))}
                    selectedValues={filters.transactionTypes.map(type => type.toString())}
                    onChange={(selectedFilters) => onTransactionTypeChange(selectedFilters)}
                    translateLabels={true} />

                <MultiSelection
                    values={getCategoryIds()}
                    selectedValues={filters.categories}
                    onChange={(selectedFilters) => onCategoryChange(selectedFilters)}
                    translateLabels={true} />

                <MultiSelection
                    values={getSourcesByCategories(filters.categories)}
                    selectedValues={filters.transferSources}
                    onChange={(selectedFilters) => onTransferSourceChange(selectedFilters)} />

                <input
                    type='number' min={0}
                    value={filters.amountLimit}
                    onChange={(e) => onAmountLimitChange(Number(e.target.value))} />

            </div>}
        </div>
        {childrenWithFinRecoreds}
    </div>
}

export default Card;