export default (state, action) => {
    switch(action.type) {
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                authenticated: action.payload
            }
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            }
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            }
        default:
            return state;
    }
}