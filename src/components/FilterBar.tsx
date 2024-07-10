import React, { ChangeEvent, FocusEvent, FocusEventHandler, FunctionComponent, KeyboardEvent, useState } from 'react';
import { getCategoryIds, getSourcesByCategories } from '../utils/categoryUtil';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FinRecordFilters } from './FinsCard';
import { Add, Remove } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

enum TransactionType {
    credit = "credit",
    debit = "debit"
}

interface FilterBarProps extends React.PropsWithChildren {
    filters: FinRecordFilters
    updateFilters: React.Dispatch<React.SetStateAction<FinRecordFilters>>
}

const FilterBar: FunctionComponent<FilterBarProps> = ({ filters, updateFilters }) => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    const { t } = useTranslation()
    const [minAmount, setMinAmount] = useState(-1)
    const [maxAmount, setMaxAmount] = useState(-1)

    const onCategoryChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        const selectedCategories = typeof value === 'string' ? value.split(',') : value

        updateFilters(prevFilters => ({
            ...prevFilters,
            categories: selectedCategories,
            transferSources: getSourcesByCategories(selectedCategories).filter(transferSource => prevFilters.transferSources.includes(transferSource))
        }))
    }

    const onTransferSourceChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        const selectedTransferSources = typeof value === 'string' ? value.split(',') : value

        updateFilters(prevFilters => ({
            ...prevFilters, transferSources: selectedTransferSources
        }))
    }

    const onTransactionTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        selectedTransactionTypes: string[],
    ) => {
        updateFilters(prevFilters => ({
            ...prevFilters, transactionTypes: selectedTransactionTypes.map(type => TransactionType[type as keyof typeof TransactionType])
        }))
    }

    const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const amount = event.target.value ? Number(event.target.value) : -1
        if (event.target.id === 'minAmount-input') {
            setMinAmount(amount)
        }
        if (event.target.id === 'maxAmount-input') {
            setMaxAmount(amount)
        }
    }

    const onAmountBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (event.target.id === 'minAmount-input') {
            updateFilters(prevFilters => ({
                ...prevFilters, minAmount
            }))
        }
        if (event.target.id === 'maxAmount-input') {
            updateFilters(prevFilters => ({
                ...prevFilters, maxAmount
            }))
        }
    }

    const onAmountMinKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateFilters(prevFilters => ({
                ...prevFilters, minAmount
            }))
        }
    }

    const onAmountMaxKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateFilters(prevFilters => ({
                ...prevFilters, maxAmount
            }))
        }
    }

    const allCategories = getCategoryIds()
    const allTransferSources = getSourcesByCategories(filters.categories)

    return <div className="FilterBar">
        <ToggleButtonGroup
            value={filters.transactionTypes}
            onChange={onTransactionTypeChange}
            aria-label="credit/debit"
            size='small'
        >
            <ToggleButton value="credit" aria-label="credit">
                <Add />
            </ToggleButton>
            <ToggleButton value="debit" aria-label="debit">
                <Remove />
            </ToggleButton>
        </ToggleButtonGroup>

        <TextField
            id="minAmount-input"
            label={t('min')}
            variant="outlined"
            size='small'
            sx={{ marginLeft: '8px', width: 110 }}
            type='number'
            onChange={onAmountChange}
            onBlur={onAmountBlur}
            onKeyDown={onAmountMinKeyDown} />

        <TextField
            id="maxAmount-input"
            label={t('max')}
            variant="outlined"
            size='small'
            sx={{ marginLeft: '8px', width: 110 }}
            type='number'
            onChange={onAmountChange}
            onBlur={onAmountBlur}
            onKeyDown={onAmountMaxKeyDown} />

        <FormControl sx={{ m: 1, width: 150, marginTop: 0, marginRight: 0 }} size='small'>
            <InputLabel id="filter-category-label">{t('select_category')}</InputLabel>
            <Select
                labelId="filter-category-select-label"
                id="filter-category-select"
                multiple
                value={filters.categories}
                onChange={onCategoryChange}
                input={<OutlinedInput label={t('select_category')} />}
                renderValue={(selected) => selected.map(entry => t(entry)).join(', ')}
                MenuProps={MenuProps}
            >
                {allCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                        <Checkbox checked={filters.categories.indexOf(category) > -1} />
                        <ListItemText primary={t(category)} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 150, marginTop: 0 }} size='small' disabled={!filters.categories.length}>
            <InputLabel id="filter-transaction-source-label">{t('select_source')}</InputLabel>
            <Select
                labelId="filter-transaction-source-select-label"
                id="filter-transaction-source-select"
                multiple
                value={filters.transferSources}
                onChange={onTransferSourceChange}
                input={<OutlinedInput label={t('select_source')} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {allTransferSources.map((transferSource) => (
                    <MenuItem key={transferSource} value={transferSource}>
                        <Checkbox checked={filters.transferSources.indexOf(transferSource) > -1} />
                        <ListItemText primary={transferSource} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>
}

export default FilterBar;