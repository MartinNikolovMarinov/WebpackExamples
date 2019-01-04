/* tslint:disable: no-console */
import { Hash, SearchParam } from './Hash'

export interface RouteToken {
  name: string
  isDynamic: boolean
}

export interface RouteParamsList {
  [key: string]: string
}

const routeParamRegex = /{([a-zA-Z]+)}/ // e.g {id}

function createTokens(path: string): RouteToken[] {
  return path
    .split('/')
    .reduce(
      (prevResult, hashFragment) => {
        if (hashFragment !== '') {
          prevResult.push(createToken(hashFragment))
        }

        return prevResult
      },
      [],
    )
}

function createToken(hashFragment: string): RouteToken {
  const paramMatchGroups = routeParamRegex.exec(hashFragment)
  const isDynamic = !!paramMatchGroups
  return {
    name: isDynamic ? paramMatchGroups[1] : hashFragment,
    isDynamic: isDynamic,
  }
}

function parseSearch(hash: Hash): RouteParamsList {
  return hash
    .search
    .reduce(
      (prevResult, param: SearchParam) => {
        prevResult[param.key] = param.value
        return prevResult
      },
      Object.create(null),
    )
}

/**
 *  Accepts a path and split it by / (slash).
 *  It also supports dynamic params - {yourDynamicParam}.
 */
export class Route {

  public path: string
  public params: RouteParamsList

  private readonly callback: (match: jc.RouteMatch) => void
  private readonly tokensArr: RouteToken[] = []

  constructor(path: string, callback: (match: jc.RouteMatch) => void) {
    if (typeof path !== 'string' || path === '') {
      throw new TypeError('route(): path should be non empty string.')
    }

    if (typeof callback !== 'function') {
      throw new TypeError('route(): callback should be a function.')
    }

    this.params = Object.create(null)
    this.path = path
    this.callback = callback
    this.tokensArr = createTokens(this.path)
  }

  /**
   *  The array of tokens after its path is splitted by / (slash).
   */
  public get tokens(): RouteToken[] {
    return this.tokensArr.slice(0)
  }

  /**
   *  Determines whether it matches an UrlHash.
   */
  public matches(hash: Hash): boolean {
    if (this.tokensArr.length !== hash.tokens.length) {
      return false
    }

    for (let i = 0, len = this.tokensArr.length; i < len; i++) {
      const token = this.tokensArr[i]
      const urlToken = hash.tokens[i]
      if (token.isDynamic) {
        continue
      }

      if (token.name.toLowerCase() !== urlToken.toLowerCase()) {
        return false
      }
    }

    return true
  }

  /**
   *  Populate the dynamic params from the UrlHash if such exist
   *  and executes the registered callback.
   */
  public start(hash: Hash): void {
    this.params = this.parseParams(hash)
    if (!this.callback) {
      return
    }

    try {
      this.callback({
        path: this.path,
        params: this.params,
      })
    } catch (error) {
      console.error(`start(): Couldn't start "${hash.value}" hash`)
      console.error(error)
    }
  }

  private parseParams(hash: Hash): { [key: string]: string } {
    // route params are with higher priority than search params
    return this.tokensArr.reduce(
      (prevResult, token, index) => {
        if (token.isDynamic) {
          prevResult[token.name] = hash.tokens[index]
        }

        return prevResult
      },
      parseSearch(hash),
    )
  }
}
