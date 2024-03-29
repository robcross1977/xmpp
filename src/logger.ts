import Logger from '@murderbeard/logger';

const logger = new Logger({
    name: '@murderbeard/xmpp',
    level: 'error',
    streams: [{
            level: 'error',
            path: './error.log'
    }]
});

if(process.env['NODE_ENV'] === 'development') {
    logger.addStream({
        level: 'info',
        stream: process.stdout
    });

    logger.addStream({
        level: 'debug',
        path: 'debug.log'
    });
}
export default logger;