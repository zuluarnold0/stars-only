//packages
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

//local
import  rootReducer  from './rootReducer';

//creates app store for all app state
export const store = createStore(rootReducer, applyMiddleware(thunk));