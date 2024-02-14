import { configureStore } from '@reduxjs/toolkit'
import taskListReducer from './taskSlice';
import { loadState, saveState } from 'src/utils/persist';

const persistedState = loadState();

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      taskList: taskListReducer
    },
    preloadedState
  })
}

export const store = configureStore({
  reducer: {
    taskList: taskListReducer
  },
  devTools: true,
  preloadedState: persistedState,
})

store.subscribe(() => {
  saveState({
    ...store.getState()
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;