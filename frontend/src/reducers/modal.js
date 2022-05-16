const defaultState= {
    isShow: false,
    msg: "",
}

export const actionModal = (state = defaultState, action) =>{
    switch (action.type) {
        case "SHOW_MSG":
            return {...state, isShow: true, msg: action.msg}
        case "HIDE_MSG":
            return {...state, isShow: false, msg: ""}
        default:
            return state
    }
}