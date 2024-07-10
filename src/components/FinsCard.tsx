import React, { FunctionComponent, useContext, useState } from 'react';
import { FinRecord } from '../utils/ReportParser';
import { AppContext } from '../app-context';
import FilterBar from './FilterBar';
import { Card, Typography } from '@mui/material';

enum TransactionType {
    credit = "credit",
    debit = "debit"
}

export interface FinRecordFilters {
    categories: string[],
    transferSources: string[],
    transactionTypes: TransactionType[],
    minAmount: number,
    maxAmount: number,
}

interface FinsCardProps extends React.PropsWithChildren {
    title?: string,
    showFilters?: boolean,
    filterPresets?: FinRecordFilters
}

export interface PropsWithFinRecords extends React.PropsWithChildren {
    finRecords: FinRecord[],
}

const FinsCard: FunctionComponent<FinsCardProps> = (props) => {

    const { state, updateState } = useContext(AppContext)
    const [filters, updateFilters] = useState(props.filterPresets ?? {
        categories: [],
        transferSources: [],
        transactionTypes: [TransactionType.credit, TransactionType.debit],
        minAmount: -1,
        maxAmount: -1
    })

    const matchesTransactionTypes = (finRecord: FinRecord, transactionTypes: TransactionType[]): boolean => {
        const transactionType = finRecord.amount >= 0
            ? TransactionType.credit
            : TransactionType.debit

        return transactionTypes.includes(transactionType)
    }

    const filteredFinRecords = state?.filteredFinRecords
        .filter(finRecord => matchesTransactionTypes(finRecord, filters.transactionTypes))
        .filter(finRecord => !filters.categories.length || filters.categories.includes(finRecord.category))
        .filter(finRecord => !filters.transferSources.length || (finRecord.source && filters.transferSources.includes(finRecord.source)))
        .filter(finRecord => filters.minAmount < 0 || Math.abs(finRecord.amount) >= filters.minAmount)
        .filter(finRecord => filters.maxAmount < 0 || Math.abs(finRecord.amount) <= filters.maxAmount)

    const childrenWithFinRecoreds = React.Children.map(props.children, child => {
        if (React.isValidElement<PropsWithFinRecords>(child)) {
            return React.cloneElement(child, { finRecords: filteredFinRecords ?? [] });
        }
        return child;
    });

    return <Card sx={{ margin: '1rem', padding: '1rem' }}>
        <div className='CardHeader'>
            {props.title && <div><Typography variant='h1'>{props.title}</Typography></div>}
            {props.showFilters && <div className='CardFilters'>
                <FilterBar filters={filters} updateFilters={updateFilters} />
            </div>}
        </div>
        {childrenWithFinRecoreds}
    </Card>
}

export default FinsCard;