import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { MultiSelect, Option } from 'react-multi-select-component';

interface MultiSelectionProps {
    values: string[]
    selectedValues: string[]
    translateLabels?: boolean
    onChange: (selectedValues: string[]) => void
}

const MultiSelection: FunctionComponent<MultiSelectionProps> = (props) => {
    const { t } = useTranslation();

    const options: Option[] = props.values.map(value => { return { label: props.translateLabels ? t(value) : value, value } })
    const selectedOptions: Option[] = props.selectedValues.map(value => { return { label: props.translateLabels ? t(value) : value, value } })

    return <div className="MultiSelection">
        <MultiSelect
            options={options}
            value={selectedOptions}
            onChange={(selectedOptions: Option[]) => props.onChange(selectedOptions.map(option => option.value))}
            labelledBy="Select" />
    </div>
}

export default MultiSelection;