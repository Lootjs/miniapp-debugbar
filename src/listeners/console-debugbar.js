export const consoleDebugbar = function () {
    console.defaultLog = console.log.bind(console);

    console.logs = [];
    console.log = function () {
        console.defaultLog.apply(console, arguments);
        console.logs.push({
            type: 'logs',
            log: Array.from(arguments),
            date: new Date()
        });
    }

    console.defaultWarn = console.warn.bind(console);
    console.warn = function () {
        console.defaultWarn.apply(console, arguments);
        console.logs.push({
            type: 'warn',
            log: Array.from(arguments),
            date: new Date()
        });
    }

    console.defaultError = console.warn.bind(console);
    console.error = function () {
        console.defaultWarn.apply(console, arguments);
        console.logs.push({
            type: 'error',
            log: Array.from(arguments),
            date: new Date()
        });
    }
}
