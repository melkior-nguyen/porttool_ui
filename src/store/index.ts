import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import todoSaga from "./auth/saga";
import monitorSaga from "./monitor/saga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// Run the saga
sagaMiddleware.run(todoSaga);
sagaMiddleware.run(monitorSaga);

export default store;
