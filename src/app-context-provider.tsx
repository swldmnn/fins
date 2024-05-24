import React, { useState } from "react";
import { AppStateHolder, AppContext, defaultState } from "./app-context";

interface Props {
  children: React.ReactNode;
}

const applyFilters = (stateHolder: AppStateHolder): AppStateHolder => {
  if (!stateHolder.state?.finRecords) {
    return stateHolder
  }

  const finRecords = stateHolder.state.finRecords
  const timeRangeStart = stateHolder.state.timeRange.selectedStart ?? stateHolder.state.timeRange.start
  const timeRangeEnd = stateHolder.state.timeRange.selectedEnd ?? stateHolder.state.timeRange.end

  const filteredFinRecords = finRecords
    .filter(finRecord => !timeRangeStart || !timeRangeEnd || finRecord.date >= timeRangeStart && finRecord.date <= timeRangeEnd)
    .filter(finRecord => stateHolder.state?.selectedAccounts.includes(finRecord.account))
    

  stateHolder.state.filteredFinRecords = filteredFinRecords
  return stateHolder
}

export const AppContextProvider: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {

  const [state, setState] = useState(defaultState);

  const updateState = (newState: Partial<AppStateHolder>) => {
    setState(applyFilters({ ...state, ...newState }));
  };

  return (
    <AppContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </AppContext.Provider>
  );
};