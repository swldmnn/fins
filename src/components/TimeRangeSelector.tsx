import React, { ChangeEvent, useContext } from 'react';
import { AppContext } from '../app-context';
import { useTranslation } from "react-i18next";

const TimeRangeSelector = () => {
    const { t } = useTranslation();
    const { state, updateState } = useContext(AppContext)

    const handleDateInputChange = (event: React.FormEvent<HTMLInputElement>) => {
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

    const handleQuickSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.currentTarget.value

        if(selectedValue === '--') {
            return
        }

        if (state?.timeRange.start && state?.timeRange.end) {
            if (selectedValue === 'all') {
                state.timeRange.selectedStart = state.timeRange.start
                state.timeRange.selectedEnd = state.timeRange.end
            } else {
                const startDate = new Date(`${selectedValue}-01-01T00:00:00`);
                const endDate = new Date(`${selectedValue}-12-31T23:59:00`);

                state.timeRange.selectedStart = state.timeRange.start > startDate ? state.timeRange.start : startDate
                state.timeRange.selectedEnd = state.timeRange.end < endDate ? state.timeRange.end : endDate
            }

            updateState({ state })
        }
    }

    const start = state?.timeRange.start
    const selectedStart = state?.timeRange.selectedStart ?? state?.timeRange.start
    const end = state?.timeRange.end
    const selectedEnd = state?.timeRange.selectedEnd ?? state?.timeRange.end

    const startYear = start?.getFullYear()
    const endYear = end?.getFullYear()
    const years = startYear && endYear ? Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i) : []

    return (
        <div>
            <div><h3>{t('time_range_selection_title')}</h3></div>
            {start && end && (<div>
                <div>
                    <span>{t('time_range_quickselect')}</span>
                <select onChange={handleQuickSelectChange}>
                    <option value='--' key='timerange_quickselect_no'>--</option>
                    <option value='all' key='timerange_quickselect_all'>{t('time_range_all')}</option>
                    {
                        years.map(year => {
                            return <option value={year} key={year}>{year}</option>
                        })
                    }
                </select>
                </div>
                <div>
                <input
                    type="date"
                    id="timeRangeStart"
                    value={getDateInputString(selectedStart)}
                    min={getDateInputString(start)}
                    max={getDateInputString(selectedEnd)}
                    onChange={handleDateInputChange}
                />
                <span> - </span>
                <input
                    type="date"
                    id="timeRangeEnd"
                    value={getDateInputString(selectedEnd)}
                    min={getDateInputString(selectedStart)}
                    max={getDateInputString(end)}
                    onChange={handleDateInputChange}
                />
                </div>
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