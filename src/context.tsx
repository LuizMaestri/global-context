import React, { createContext, useContext, useReducer } from 'react'
import { createReducer } from './reducer'
import type { Context, FC } from 'react'
import type { IReducer, ConsumerProps } from './typings'

const GLOBAL = 'GLOBAL'

const contexts: Map<string, Context<any>> = new Map<string, Context<any>>()
const context: Context<any> = createContext(null)
contexts.set(GLOBAL, context)

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function getOrCreate(name: string = GLOBAL): Context<any> {
  const context: Context<any> = contexts.get(name) || createContext(null)
  context.displayName = capitalize(name)
  if (contexts.has(name)) {
    contexts.set(name, context)
  }
  return context
}

function createSetters(
  context: Object,
  dispatch: Function,
  prefix: string = ''
): Object {
  return Object.keys(context).reduceRight((acc, curr) => {
    const varName = prefix + curr
    const setterName = 'set' + capitalize(prefix + curr)
    acc[setterName] = (payload: any) => dispatch({ type: curr, payload })
    const subContext = context[curr]
    if (subContext instanceof Object) {
      const setters = createSetters(subContext, dispatch, varName + '_')
      return { ...acc, ...setters }
    }
    return acc
  }, {})
}

export function useGlobalContext(name: string = GLOBAL) {
  if (!contexts.has(name)) {
    throw new Error('Context not exists.')
  }
  const [context, dispatch] = useContext(getOrCreate(name))
  const reset = () => dispatch({ type: 'reset' })
  if (context instanceof Object) {
    const setters = createSetters(context, dispatch)
    return [
      context,
      {
        ...setters,
        reset
      }
    ]
  }
  return [
    context,
    {
      set: (payload: any) => dispatch({ payload }),
      reset
    }
  ]
}

export function useParcelContext(key: string, name: string = GLOBAL) {
  const [context, setters] = useGlobalContext(name)
  if (context instanceof Object) {
    const setter = 'set' + capitalize(key)
    return [context[key], setters[setter]]
  }
  throw new Error(
    'The value of context is a ' +
      typeof context +
      ' type, please use useGlobalContext hook instaed.'
  )
}

export function connect(
  Component: FC,
  initialState: any,
  name: string = GLOBAL
) {
  const context: Context<any> = getOrCreate(name)
  const reducer: IReducer = createReducer(initialState)
  return function (props: any) {
    return (
      <context.Provider value={useReducer(reducer, initialState)}>
        <Component {...props} />
      </context.Provider>
    )
  }
}

export function GlobalConsumer(props: ConsumerProps) {
  if (contexts.has(props.context)) {
    throw new Error('This context not exists.')
  }
  const context: Context<any> = getOrCreate(props.context)
  return <context.Consumer>{props.children}</context.Consumer>
}
