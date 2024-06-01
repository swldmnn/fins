import React, { useContext, useRef } from "react";
import { AppContext } from "../app-context";
import { FinRecord, VrPdfParser } from "../utils/ReportParser";
import { useTranslation } from "react-i18next";


declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
  }
}

const FileChooser = () => {

  const { t } = useTranslation();
  const { state, updateState } = useContext(AppContext)
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const parser = new VrPdfParser

  const handleClick = () => {
    hiddenFileInput.current?.click();
  }

  const handleChange = async (event: React.FormEvent<HTMLInputElement>) => {
    const files: File[] = []
    const finRecords: FinRecord[] = []

    for (const file of event?.currentTarget?.files ?? []) {
      if (file.name.endsWith('.pdf')) {
        files.push(file)
        finRecords.push(...await parser.parse(file))
      }
    }

    if (state) {
      const sortedRecords = finRecords.sort((finRecord1, finRecord2) => {
        if (finRecord1.date === finRecord2.date) return 0
        if (finRecord1.date < finRecord2.date) return -1
        return 1
      })

      const accounts = [...new Set(sortedRecords.map(finRecord => finRecord.account) ?? [])]

      state.files = files
      state.finRecords = sortedRecords
      state.timeRange.start = sortedRecords.at(0)?.date
      state.timeRange.selectedStart = sortedRecords.at(0)?.date
      state.timeRange.end = sortedRecords.at(-1)?.date
      state.timeRange.selectedEnd = sortedRecords.at(-1)?.date
      state.selectedAccounts = accounts
    }

    updateState({ state })
  }

  return (
    <div className="FileChooser">
      <button className="FileChooserButton" onClick={handleClick}>
        {t('open_files')}
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        className="hidden"
        webkitdirectory=""
      />
      <span>{`${state?.files.length} ${t('opened')}`}</span>
    </div>
  )
}

export default FileChooser