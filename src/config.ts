import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class Config {
    private static readonly envConfig: { [key: string]: string } = dotenv.parse(fs.readFileSync(`.env`));
  
    static get(key: string): string {
        return this.envConfig[key];
    }
}