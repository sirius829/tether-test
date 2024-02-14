import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket, updatePrecision } from "../store/actions/action";
import { connect, decreasePrecision, disconnect, increasePrecision } from "../services/WebsocketService";

const OrderBook = () => {
    const { orderBook, precision, isWebSocketConnected } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isWebSocketConnected) {
            connect(dispatch);
        } else {
            disconnect();
        }

        return () => {
            disconnect();
        }
    }, [isWebSocketConnected]);

    const handleConnect = () => {
        dispatch(connectWebSocket())
    }

    const handleDisconnect = () => {
        dispatch(disconnectWebSocket())
    }

    const increasePrecisions = () => {
        dispatch(updatePrecision(Math.min(precision + 1, 4)));
        increasePrecision(dispatch);
    }

    const decreasePrecisions = () => {
        dispatch(updatePrecision(Math.max(precision - 1, 0)));
        decreasePrecision(dispatch);
    }
    return (
        <div className="container mx-auto p-2 flex flex-col justify-center gap-3">

            <div className="flex justify-center gap-2 items-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleConnect}>Connect</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDisconnect}>Disconnect</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={increasePrecisions}>Increase precision</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={decreasePrecisions}>Decrease precision</button>
                <span>Precision: {precision}</span>
            </div>
            <table className="table-auto border border-gray-400 border-collapse text-center mt-4">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th colSpan={4}>BTC</th>
                        <th colSpan={4}>USD</th>
                    </tr>
                    <tr className="bg-blue-300 text-white">
                        <th>Count</th>
                        <th>Amount</th>
                        <th>Total</th>
                        <th>Price</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Amount</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {orderBook && orderBook?.bids?.length && orderBook.bids.map((bid, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td>{bid.count}</td>
                            <td>{bid.amount.toFixed(precision)}</td>
                            <td>{bid.total.toFixed(precision)}</td>
                            <td>{bid.price.toFixed(precision)}</td>
                            <td>
                                {orderBook.asks[index]
                                    ? orderBook.asks[index].price.toFixed(precision)
                                    : ''}
                            </td>
                            <td>
                                {orderBook.asks[index] ? orderBook.asks[index].total.toFixed(precision) : ''}
                            </td>
                            <td>
                                {orderBook.asks[index] ? orderBook.asks[index].amount.toFixed(precision) : ''}
                            </td>
                            <td>{orderBook.asks[index] ? orderBook.asks[index].count : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderBook;