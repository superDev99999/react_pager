import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducer.js';

export const store = createStore(rootReducer, applyMiddleware(logger));
