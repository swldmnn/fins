import { useContext } from 'react';
import { AppContext } from '../app-context';
import { useTranslation } from 'react-i18next';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material';

const AccountSelector = () => {
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
    const { state, updateState } = useContext(AppContext)

    const onChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        const selectedValues = typeof value === 'string' ? value.split(',') : value

        if (state) {
            state.selectedAccounts = selectedValues
            updateState({ state })
        }
    }

    const accounts: string[] = [...new Set(state?.finRecords.map(finRecord => finRecord.account) ?? [])]

    const selectedAccounts: string[] = state?.selectedAccounts ?? []

    return <div>
        <FormControl sx={{ m: 1, width: 200 }} size='small'>
            <InputLabel id="filter-transaction-source-label">{t('account_selection_title')}</InputLabel>
            <Select
                labelId="filter-transaction-source-select-label"
                id="filter-transaction-source-select"
                multiple
                value={selectedAccounts}
                onChange={onChange}
                input={<OutlinedInput label={t('account_selection_title')} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {accounts.map((account) => (
                    <MenuItem key={account} value={account}>
                        <Checkbox checked={selectedAccounts.indexOf(account) > -1} />
                        <ListItemText primary={account} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>
}

export default AccountSelector;