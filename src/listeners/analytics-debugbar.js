export const analyticsLogs = [];
export const amplitudeListener = function (event, data) {
    return function (status, response) {
        const payload = {
            success: status === 200 && response === 'success',
            event,
            data,
            date: new Date()
        }

        analyticsLogs.push(payload);
    }
}
