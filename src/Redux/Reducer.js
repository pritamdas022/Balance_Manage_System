import dataReducer from "./IncomeDataSlice";
import expReducer from "./ExpenseDataSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  incom: dataReducer,
  exp: expReducer,
});
export default rootReducer;
