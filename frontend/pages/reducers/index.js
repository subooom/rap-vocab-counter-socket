import { combineReducers } from 'redux';

import artistReducer from './artistReducer'
import topTenReducer from './topTenReducer'

export default combineReducers({artists: artistReducer, topTen: topTenReducer})