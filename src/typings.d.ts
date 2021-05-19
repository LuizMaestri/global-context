import type { Reducer, ReactNode } from 'react'

export interface IAction {
  type?: string
  payload?: any
}
export interface IReducer extends Reducer<any, IAction> {}

export interface ConsumerProps {
  context: string
  children: (props: any) => ReactNode
}
