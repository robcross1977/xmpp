import logger from './logger';

export interface XmppConfig {
    createAnonRoomTimeout: number,
    createAnonRoomRetryCount: number,
    defaultNick: string
}

class Config {
   private _configs: { [configName: string]: XmppConfig } = {
       dev: {
            createAnonRoomTimeout: 2000,
            createAnonRoomRetryCount: 3,
            defaultNick: 'daemon'
       }
   }

   public getConfig(environment: string) : XmppConfig {
       if(environment in this._configs) {
           return this._configs[environment];
       } else {
           throw new Error('config not found');
       }
   }
};

logger.info({ env: process.env.NODE_ENV }, 'getting config');

export default new Config().getConfig(process.env.NODE_ENV || 'dev');