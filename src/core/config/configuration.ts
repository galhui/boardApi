import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default () => {
    const appRoot = require('app-root-path');
    const config = yaml.load(
        readFileSync(join(appRoot.path, 'config/config.yaml'), 'utf8')
    ) as Record<string, any>;

    return {
        port: parseInt(config.http.host) || 3000,
        database: {
            host: config.db.mysql.url || 'localhost',
            port: config.db.mysql.port || 3306,
            schema: config.db.mysql.database
        }
    }
}