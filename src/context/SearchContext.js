import { createContext, useReducer } from "react"

const INTIAL_STATE = {
    destination: undefined,
    date: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined
    }


}

export const SearchContext = createContext(INTIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":

            return action.payload;
        case "RESET_SEARCH":
            return INTIAL_STATE;
        default:
            return state;
    }
}
export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INTIAL_STATE);



    return (
        <SearchContext.Provider value={{ city: state.city, date: state.date, options: state.options, dispatch }}>
            {children}
        </SearchContext.Provider>
    )
}