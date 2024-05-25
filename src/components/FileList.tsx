import React, { useContext } from 'react';
import { AppContext } from '../app-context';

const FileList = () => {
    const { state, updateState } = useContext(AppContext)
    return <div>
        <ul>
            {state?.files.map((file, i) => { return <li key={i}>{file.name}</li> })}
        </ul>
    </div>
}

export default FileList;