import { createStore } from "redux";
import { reducer } from "./reducer";

export const _store = createStore(reducer);