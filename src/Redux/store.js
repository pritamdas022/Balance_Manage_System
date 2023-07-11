// import { configureStore } from "@reduxjs/toolkit";
// import dataReducer from "./IncomeDataSlice";
// import ExpReducer from "./ExpenseDataSlice";

// const store = configureStore({
//   reducer: {
//     data: dataReducer,
//     Expdata: ExpReducer,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "reduxjs-toolkit-persist/es/constants";
import persistStore from "reduxjs-toolkit-persist/es/persistStore";
import rootReducer from "./Reducer";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistedStore = persistStore(store);
export { store, persistedStore };
