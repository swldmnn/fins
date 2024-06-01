import React, { useContext } from 'react';
import { AppContext } from '../app-context';
import { useTranslation } from "react-i18next";

const TimeRangeSelector = () => {
    const { t } = useTranslation();
    const { state, updateState } = useContext(AppContext)

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const date = new Date(event.currentTarget.value)
        const targetId = (event.currentTarget.id)

        if (state) {
            if (targetId === "timeRangeStart") {
                state.timeRange.selectedStart = date
            }
            if (targetId === "timeRangeEnd") {
                state.timeRange.selectedEnd = date
            }
            updateState({ state })
        }
    }

    const start = state?.timeRange.start
    const selectedStart = state?.timeRange.selectedStart ?? state?.timeRange.start
    const end = state?.timeRange.end
    const selectedEnd = state?.timeRange.selectedEnd ?? state?.timeRange.end

    return (
        <div>
            {start && end && (<div>
                <input
                    type="date"
                    id="timeRangeStart"
                    value={getDateInputString(selectedStart)}
                    min={getDateInputString(start)}
                    max={getDateInputString(selectedEnd)}
                    onChange={handleChange}
                />
                <span> - </span>
                <input
                    type="date"
                    id="timeRangeEnd"
                    value={getDateInputString(selectedEnd)}
                    min={getDateInputString(selectedStart)}
                    max={getDateInputString(end)}
                    onChange={handleChange}
                />
            </div>)}
            {(!state?.timeRange.start || !state?.timeRange.end) && (<div>
                {t('no_time_range')}
            </div>)}
        </div>
    )
}

function getDateInputString(date: Date | undefined): string {
    if (!date) {
        return ''
    }

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
}

export default TimeRangeSelector;