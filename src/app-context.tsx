import React from "react"
import { FinRecord } from "./utils/ReportParser"

export interface TimeRange {
    start: Date | undefined,
    end: Date | undefined,
    selectedStart: Date | undefined,
    selectedEnd: Date | undefined
}

export interface AppState {
    files: File[],
    finRecords: FinRecord[],
    filteredFinRecords: FinRecord[],
    timeRange: TimeRange,
    selectedAccounts: string[]
}

export interface AppStateHolder {
    state?: AppState,
    updateState: (newState: Partial<AppStateHolder>) => void
}

export const defaultState: AppStateHolder = {
    state: {
        files: [], 
        finRecords: [],
        filteredFinRecords: [], 
        timeRange: {
            start: undefined, 
            end: undefined,
            selectedStart: undefined,
            selectedEnd: undefined
        },
        selectedAccounts: []
    },
    updateState: (newState?: Partial<AppStateHolder>) => { },
}

export const AppContext = React.createContext<AppStateHolder>(defaultState)