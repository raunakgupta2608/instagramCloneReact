export const initialState = false;

export const overlayReducer = (state, action) => {
    if(action.type == "toggle") {
        return !state;
    }
    return initialState;
}