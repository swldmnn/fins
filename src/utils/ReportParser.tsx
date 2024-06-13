import pdfToText from 'react-pdftotext'
import { getCategoryAndSource } from './categoryUtil'

enum FinRecordType {
    Transaction,
    Balance,
    Unknown
}

export type FinRecord = {
    type: FinRecordType
    date: Date,
    amount: number
    source: string | undefined
    description: string
    account: string
    category: string
    classification: string | undefined
}

export interface RecordParser {
    parse: (file: File) => Promise<FinRecord[]>
}

export class VrPdfParser implements RecordParser {

    async parse(file: File): Promise<FinRecord[]> {
        const pdfText = await pdfToText(file) as string

        const headerEnd = pdfText.search('alter Kontostand')
        const contentEnd = pdfText.search('neuer Kontostand')
        
        const contentText = pdfText.substring(headerEnd, contentEnd)
        const headerText = pdfText.substring(0, headerEnd)
        const dateText = headerText.match('\\d+\\/\\d{4}')?.[0]
        const ibanText = headerText.match('[a-zA-Z]{2}\\d{2}\\s+\\d{4}\\s+\\d{4}\\s+\\d{4}\\s+\\d{4}\\s+\\d{2}')?.[0]

        if (!dateText || !ibanText) {
            console.warn(`Date: ${dateText} or IBAN: ${ibanText} missing in file ${file.name}`)
            return []
        }

        const transactions: FinRecord[] = []
        const transactionMarkers = [...contentText.matchAll(/\d{2}\.\d{2}\.\s+\d{2}\.\d{2}\./g)];
        transactionMarkers.forEach((transactionMarker, index) => {
            if (transactionMarker.index) {
                const transactionStart = transactionMarker.index
                const transactionEnd = index == transactionMarkers.length - 1 ? contentEnd : transactionMarkers[index + 1].index
                const transactionText = contentText.substring(transactionStart, transactionEnd)

                transactions.push(this.parseTransaction(
                    this.parseTransactionText(transactionText),
                    ibanText,
                    dateText,
                    transactionMarker.toString()
                ))
            }
        })

        return transactions
    }

    parseTransaction(
        transactionText: string,
        ibanText: string,
        dateText: string,
        transactionMarker: string
    ): FinRecord {
        const amountText = transactionText.match('\\d+(\\.\\d{3})*,\\d{2}\\s[SH]')?.[0]
        const dayMonthText = transactionMarker.match('\\d{2}\\.\\d{2}')?.[0]
        const yearText = dateText.split('/')?.[1]
        const [dd, mm, yyyy] = `${dayMonthText}.${yearText}`.split('.')

        let amount: Number = 0
        let description: string = transactionText
        let classification = undefined
        let type: FinRecordType = FinRecordType.Unknown

        if (amountText !== undefined) {
            const amountStart = transactionText.indexOf(amountText)
            const descStart = amountStart + amountText.length

            type = FinRecordType.Transaction
            amount = Number(amountText.slice(0, -2).replaceAll('.', '').replaceAll(',', '.')) * (amountText?.endsWith('S') ? -1 : 1)
            description = transactionText.substring(descStart).trim()
            classification = transactionText.substring(transactionMarker.length-1, amountStart).trim()
        }

        const {category, source} = getCategoryAndSource(transactionText)

        return {
            type,
            account: ibanText.replaceAll(' ', ''),
            date: new Date(`${yyyy}-${mm}-${dd}Z`),
            amount: amount,
            source,
            description: description.length !== 0 ? description : classification,
            category,
            classification
        } as FinRecord
    }

    parseTransactionText(transactionText: string): string {
        const singleSpacedTransactionText = transactionText.replace(/\s\s+/g, ' ');

        const cutOutStart = singleSpacedTransactionText.search('Übertrag auf Blatt')
        if (cutOutStart < 0) {
            return singleSpacedTransactionText
        }

        const cutOutEndText = singleSpacedTransactionText.match('Übertrag von Blatt\\s\\d\\s+\\d+(\\.\\d{3})*,\\d{2}\\s[SH]\\s+Wert\\s+Vorgang')?.[0]
        if(!cutOutEndText) {
            return singleSpacedTransactionText
        }

        const cutOutEnd = singleSpacedTransactionText.indexOf(cutOutEndText) + cutOutEndText?.length
        return singleSpacedTransactionText.substring(0, cutOutStart) + singleSpacedTransactionText.substring(cutOutEnd)
    }
}