import { useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { handleOrderBookUpdate } from './OrderBookUpdate';
import { handleServiceEvent } from './eventHandle';

const WEBSOCKET_URL = 'wss://api.bitfinex.com/ws/2';
const SYMBOL = 'tBTCUSD';
let socket;
let precision = 'P0';

export const subscribeToOrderBook = (precision) => {
    const payload = {
        event: 'subscribe',
        channel: 'book',
        symbol: SYMBOL,
        prec: precision,
        len: '25',
    };
    socket.send(JSON.stringify(payload));
};

export const unsubscribeFromOrderBook = () => {
    if (!socket) {
        return;
    }
    const payload = {
        event: 'unsubscribe',
        channel: 'book',
    };
    socket.send(JSON.stringify(payload));
};

export const connect = (dispatch) => {
    if (socket) {
        socket.close();
    }
    socket = new ReconnectingWebSocket(WEBSOCKET_URL);
    const handleOpen = (event) => {
        console.log('WebSocket open', event);
    };

    const handleClose = (event) => {
        console.log('WebSocket close', event);
    };

    const handleError = (event) => {
        console.error('WebSocket error', event);
    };

    const handleMessage = (event) => {
        const data = JSON.parse(event.data);

        if (!Array.isArray(data)) {
            handleServiceEvent(data, socket);
        } else {
            handleOrderBookUpdate(data, dispatch);
        }
    };

    socket.onopen = handleOpen;
    socket.onclose = handleClose;
    socket.onerror = handleError;
    socket.onmessage = handleMessage;
    subscribeToOrderBook(precision);
};

export const disconnect = () => {
    if (socket?.OPEN) {
        socket.close();
    }
};



export const increasePrecision = (dispatch) => {

    let newPrecision;
    switch (precision) {
        case 'P4':
            newPrecision = 'P3';
            break;
        case 'P3':
            newPrecision = 'P2';
            break;
        case 'P2':
            newPrecision = 'P1';
            break;
        case 'P1':
            newPrecision = 'P0';
            break;
        default:
            return;
    }

    unsubscribeFromOrderBook();
    precision = newPrecision;
    connect(dispatch);
    return newPrecision;
};

export const decreasePrecision = (dispatch) => {
    let newPrecision;
    switch (precision) {
        case 'P0':
            newPrecision = 'P1';
            break;
        case 'P1':
            newPrecision = 'P2';
            break;
        case 'P2':
            newPrecision = 'P3';
            break;
        case 'P3':
            newPrecision = 'P4';
            break;
        default:
            return;
    }

    unsubscribeFromOrderBook();
    precision = newPrecision;
    connect(dispatch);
    return newPrecision;
};

export const send = (message) => {
    socket.send(message);
};

