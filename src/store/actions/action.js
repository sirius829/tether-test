export const updateOrderBook = (data) => ({
    type: 'UPDATE_ORDER_BOOK',
    payload: data,
});

export const connectWebSocket = () => ({
    type: 'CONNECT_WEBSOCKET',
});

export const disconnectWebSocket = () => ({
    type: 'DISCONNECT_WEBSOCKET',
});

export const updatePrecision = (data) => ({
    type: "UPDATE_PRECISION",
    payload: data
})
