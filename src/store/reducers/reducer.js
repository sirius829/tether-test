const initialState = {
    orderBook: [],
    isWebSocketConnected: false,
    precision: 0
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_ORDER_BOOK':
            return {
                ...state,
                orderBook: action.payload,
            };

        case 'CONNECT_WEBSOCKET':
            return {
                ...state,
                isWebSocketConnected: true,
            };

        case 'DISCONNECT_WEBSOCKET':
            return {
                ...state,
                isWebSocketConnected: false,
            };
        case 'UPDATE_PRECISION':
            return {
                ...state,
                precision: action.payload
            }
        default:
            return state;
    }
};

export default rootReducer;