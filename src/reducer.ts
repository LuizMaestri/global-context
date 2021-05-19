import type { IReducer, IAction } from './typings'

export function createReducer(initialState: any): IReducer {
  return function (state: any = initialState, action: IAction): any {
    const { type, payload } = action
    if (state instanceof Object) {
      if (type) {
        if (type === 'reset') {
          return { ...initialState }
        }
        const newState = { ...state }
        let aux = newState
        const levels = (type as string).split('_')
        const last = levels.pop()
        for (const level of levels) {
          aux = aux[level]
        }
        aux[last as string] = payload
        return newState
      }
    } else {
      if (typeof state === typeof payload) {
        return payload
      }
      return state
    }
  }
}
