export interface SearchParam {
  key: string
  value: string
}

function parseSearch(hash: string, searchIndex: number): SearchParam[] {
  if (searchIndex < 0) {
    return []
  }

  return hash
    .substring(searchIndex + 1)
    .split('&')
    .map(parseSearchPair)
}

function parseSearchPair(keyValuePair: string): SearchParam {
  const args = keyValuePair.split('=')
  return {
    key: args[0],
    value: args[1] !== undefined ? args[1] : '',
  }
}

function parseTokens(hash: string, searchIndex: number): string[] {
  return hashWithoutSearch(hash, searchIndex)
    .split('/')
    .filter((token) => token !== '')
}

function hashWithoutSearch(hash: string, searchIndex: number): string {
  return searchIndex < 0 ? hash : hash.substring(0, searchIndex)
}

/**
 *  Represents the hash string in a url.
 */
export class Hash {

  private valueStr: string = ''
  private searchParams: SearchParam[] = []
  private tokensArr: string[] = []

  public get value(): string {
    return this.valueStr
  }

  public set value(hash: string) {
    hash = hash !== undefined ? hash : ''
    hash = hash[0] !== '#' ? hash : hash.substring(1)
    const searchIndex = hash.indexOf('?')

    this.valueStr = hash
    this.searchParams = parseSearch(hash, searchIndex)
    this.tokensArr = parseTokens(hash, searchIndex)
  }

  public get tokens(): string[] {
    return this.tokensArr.slice(0)
  }

  public get search(): SearchParam[] {
    return this.searchParams.slice(0)
  }
}
