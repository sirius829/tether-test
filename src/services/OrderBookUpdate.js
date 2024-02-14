import { store } from '../store/store';
import { updateOrderBook } from '../store/actions/action';

export const handleOrderBookUpdate = (data, dispatch) => {
  if (Array.isArray(data[1])) {
    if (Array.isArray(data[1][0])) {
      handleSnapshot(data[1], dispatch);
    } else {
      handleIndividualUpdate(data[1]);
    }
  }
};

export const handleSnapshot = (snapshot, dispatch) => {
  const bids = [];
  const asks = [];

  snapshot.forEach((entry) => {
    const [price, count, amount] = entry;
    const order = {
      price,
      count,
      amount,
      total: Math.abs(count * amount),
    };
    if (amount > 0) {
      bids.push(order);
    } else {
      asks.push(order);
    }
  });

  bids.sort((a, b) => a.price - b.price);
  asks.sort((a, b) => a.price - b.price);

  dispatch(updateOrderBook({ bids, asks }));
};

export const handleIndividualUpdate = (update) => {
  const [price, count, amount] = update;
  const order = {
    price,
    count,
    amount,
    total: Math.abs(count * amount),
  };

  store.dispatch((dispatch, getState) => {
    let { bids, asks } = getState().orderBook;

    bids = [...bids];
    asks = [...asks];
    if (amount > 0) {
      const index = bids.findIndex((bid) => bid.price === price);
      if (index !== -1) {
        if (count === 0) {
          bids.splice(index, 1);
        } else {
          bids[index] = order;
        }
      } else if (count !== 0) {
        bids.push(order);
        bids.sort((a, b) => a.price - b.price);
      }
    } else {
      const index = asks.findIndex((ask) => ask.price === price);
      if (index !== -1) {
        if (count === 0) {
          asks.splice(index, 1);
        } else {
          asks[index] = order;
        }
      } else if (count !== 0) {
        asks.push(order);
        asks.sort((a, b) => a.price - b.price);
      }
    }
    dispatch(updateOrderBook({ bids, asks }));
  });
};


