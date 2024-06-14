import { useContext } from 'react';
import { AppContext } from '../app-context';
import { MultiSelect, Option } from 'react-multi-select-component';
import MultiSelection from './MultiSelection';
import { useTranslation } from 'react-i18next';

const AccountSelector = () => {
    const {t} = useTranslation()
    const { state, updateState } = useContext(AppContext)

    const onChange = (selectedValues: string[]) => {
        if (state) {
            state.selectedAccounts = selectedValues
            updateState({ state })
        }
    }

    const accounts: string[] = [...new Set(state?.finRecords.map(finRecord => finRecord.account) ?? [])]

    const selectedAccounts: string[] = state?.selectedAccounts ?? []

    return <div>
        <div><h3>{t('account_selection_title')}</h3></div>
        <MultiSelection
        values={accounts}
        selectedValues={selectedAccounts}
        onChange={onChange}
    />
    </div>
}

export default AccountSelector;