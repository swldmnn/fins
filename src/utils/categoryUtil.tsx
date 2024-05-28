import config from '../config.json'

export function getCategoryAndSource(recordText: string): { category: string, source: string | undefined } {

    let category = 'cat_unknown'
    let source = undefined

    config.categories.some(cat => {
        return cat.transfer_sources.find(transferSource => {
            if (transferSource.key_phrases.find(keyPhrase => {return recordText.indexOf(keyPhrase) >= 0}) !== undefined) {
                source = transferSource.name
                category = cat.id
                return true
            }
            return false
        }) !== undefined
    })

    return { category, source }
}

export function getColorByCategory(categoryId: string): string | undefined {
    return config.categories.find(category => category.id === categoryId)?.color
}

export function getCategoryIds(): string[] {
    return config.categories.map(category => category.id)
}