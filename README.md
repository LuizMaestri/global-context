# global-context

> pure react global state manager

[![NPM](https://img.shields.io/npm/v/global-context.svg)](https://www.npmjs.com/package/global-context) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save global-context
```
or

```bash
yarn add global-context
```

## Functions

```tsx
function connect(Component: FC, initialState: any, name: string = GLOBAL)
import { connect } from 'global-context'
```

```tsx
function useGlobalContext(name: string = GLOBAL)
import { useGlobalContext } from 'global-context'
```

```tsx
function useParcelContext(key: string, name: string = GLOBAL)
import { useParcelContext } from 'global-context'
```

```tsx
function GlobalConsumer(props: ConsumerProps)
import { GlobalConsumer } from 'global-context'
```

## Usage

```tsx
// MyComponent.tsx
import React from 'react'
import { connect, useParcelContext } from 'global-context'

export function MyComponent (): React.FC {
  const [globalContext, setGlobalContext] = useParcelContext('globalContext')
  return (
    <>
      <button type="button" onClick={() => setGlobalContext('true')}>
        voltar contexto
      </button>
      <div>{globalContext}</div>
    </>
}
// index.tsx
import React from 'react'
import { MyComponent } from './MyComponent'
import { connect, useGlobalContext } from 'global-context'

function Example () {
  const [context, setters] = useGlobalContext()
  return (
    <>
      <MyComponent/>
      <button type="button" onClick={() => setters.setGlobalContext('teste')}>
        alterar contexto
      </button>
    </>
  )
}

export default connect(Example, { globalContext: 'true' })
```

## TODO

- [ ] Improve docs
- [ ] Create tests
- [ ] Create web page
- [ ] Create github actions

## License

MIT © [LuizMaestri](https://github.com/LuizMaestri)
