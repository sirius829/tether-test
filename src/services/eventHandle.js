
export const handleServiceEvent = (data, socket) => {
    if (data.event === 'info' && data.code === 20051) {
        socket.close();
    } else if (data.event === 'info' && data.code === 20060) {
        setTimeout(() => {
            socket.close();
        }, 5000);
    }
};
