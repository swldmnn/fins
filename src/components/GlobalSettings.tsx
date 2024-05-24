import React, { useContext } from 'react';
import { AppContext } from '../app-context';
import FileChooser from './FileChooser';
import TimeRangeSelector from './TimeRangeSelector';
import AccountSelector from './AccountSelector';

const GlobalSettings = () => {
    const { state, updateState } = useContext(AppContext)

    return <div className="GlobalSettings">
        <FileChooser></FileChooser>
        <div className="Bumper"></div>
        <TimeRangeSelector></TimeRangeSelector>
        <div className="Bumper"></div>
        <AccountSelector></AccountSelector>
    </div>
}

export default GlobalSettings;