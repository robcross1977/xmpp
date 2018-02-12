import Logger from '@murderbeard/logger';

const logger = new Logger({
    name: '@murderbeard/xmpp',
    level: 'error',
    streams: [{
            level: 'error',
            path: './error.log'
    }]
});

if(process.env['NODE_ENV'] === 'dev') {
    logger.addStream({
        level: 'debug',
        stream: process.stdout
    });

    logger.addStream({
        level: 'debug',
        path: 'debug.log'
    });
}

export default logger;
