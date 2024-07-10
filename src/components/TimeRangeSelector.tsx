import React, { ChangeEvent, useContext, useState } from 'react';
import { AppContext } from '../app-context';
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';

const TimeRangeSelector = () => {
    const { t } = useTranslation();
    const { state, updateState } = useContext(AppContext)
    const [selectedYear, updateSelectedYear] = useState('--')

    const handleDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    const handleQuickSelectChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value

        if (selectedValue === '--') {
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

            updateSelectedYear(selectedValue)
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
            {start && end && (<div>
                <div style={{ display: 'flex' }}>
                    <FormControl sx={{ width: 150 }} size='small'>
                        <InputLabel id="account-select-label">{t('time_range_selection_title')}</InputLabel>
                        <Select
                            labelId="account-select-label"
                            id="account-select"
                            value={selectedYear}
                            label={t('time_range_selection_title')}
                            onChange={handleQuickSelectChange}
                        >
                            <MenuItem value={'--'}>--</MenuItem>
                            <MenuItem value={'all'}>{t('time_range_all')}</MenuItem>
                            {
                                years.map(year => {
                                    return <MenuItem value={year} key={year}>{year}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>

                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="timeRangeStart"
                        label={t('from')}
                        variant="outlined"
                        size='small'
                        sx={{ marginLeft: '8px', width: 150 }}
                        type='date'
                        value={getDateInputString(selectedStart)}
                        InputProps={{
                            inputProps: {
                                min: getDateInputString(start),
                                max: getDateInputString(selectedEnd)
                            }
                        }}
                        onChange={handleDateInputChange}
                    />

                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="timeRangeEnd"
                        label={t('to')}
                        variant="outlined"
                        size='small'
                        sx={{ marginLeft: '8px', width: 150 }}
                        type='date'
                        value={getDateInputString(selectedEnd)}
                        InputProps={{
                            inputProps: {
                                min: getDateInputString(selectedStart),
                                max: getDateInputString(end)
                            }
                        }}
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