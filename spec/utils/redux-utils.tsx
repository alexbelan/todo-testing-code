import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { setupStore, type AppStore, type RootState } from '../../src/store/configureStore'

import taskSliceReducer from '../../src/store/taskSlice'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithReduxProviders(
    ui: React.ReactElement,
    {
      preloadedState = {},
      store = setupStore(preloadedState),
      ...renderOptions
    }: ExtendedRenderOptions = {}
  ) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
      return <Provider store={store}>{children}</Provider>
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
  }