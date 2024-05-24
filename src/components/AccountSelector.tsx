import { useContext } from 'react';
import { AppContext } from '../app-context';
import { MultiSelect, Option } from 'react-multi-select-component';

const AccountSelector = () => {
    const { state, updateState } = useContext(AppContext)

    const onChange = (selectedOptions: Option[]) => {
        if (state) {
            state.selectedAccounts = selectedOptions.map(option => option.value)
            updateState({ state })
        }
    }

    const options: Option[] = [...new Set(state?.finRecords.map(finRecord => finRecord.account) ?? [])]
        .map(account => { return { label: account, value: account } as Option });

    const selectedOptions: Option[] = state?.selectedAccounts
        .map(account => { return { label: account, value: account } as Option }) ?? []

    return <div className="AccountSelector">
        <MultiSelect
            options={options}
            value={selectedOptions}
            onChange={onChange}
            labelledBy="Select"
        />
    </div>
}

export default AccountSelector;