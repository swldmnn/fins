
type Configuration = {
    categories: Category[]
}

type Category = {
    id: string,
    sortIndex: number,
    color: string,
    transfer_sources: TransferSource[]
}

type TransferSource = {
    name: string,
    key_phrases: string[]
}

let config = {} as Configuration

try {
    const response = await fetch(`/conf/config.json`)
    const data = await response.json()
    console.log('Using custom config..')
    config = data as Configuration
} catch (err) {
    console.log('Could not load custom config. Using default config..')
    config = await import('../config.json')
}

export default config