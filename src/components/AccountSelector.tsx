import { useContext } from 'react';
import { AppContext } from '../app-context';
import { MultiSelect, Option } from 'react-multi-select-component';
import MultiSelection from './MultiSelection';

const AccountSelector = () => {
    const { state, updateState } = useContext(AppContext)

    const onChange = (selectedValues: string[]) => {
        if (state) {
            state.selectedAccounts = selectedValues
            updateState({ state })
        }
    }

    const accounts: string[] = [...new Set(state?.finRecords.map(finRecord => finRecord.account) ?? [])]

    const selectedAccounts: string[] = state?.selectedAccounts ?? []

    return <MultiSelection
        values={accounts}
        selectedValues={selectedAccounts}
        onChange={onChange}
    />
}

export default AccountSelector;