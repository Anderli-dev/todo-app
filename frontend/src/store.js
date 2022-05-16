import {createStore} from "redux"
import {actionModal} from "./reducers/modal"

export  const store = createStore(
    actionModal
)