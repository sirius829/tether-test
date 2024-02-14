const initialState = {
    orderBook: [],
    isWebSocketConnected: false,
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

        default:
            return state;
    }
};

export default rootReducer;