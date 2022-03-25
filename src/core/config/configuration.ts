import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default () => {
    const config = yaml.load(
        readFileSync(join(__dirname, '/../../../config/config.yaml'), 'utf8')
    ) as Record<string, any>;

    return {
        port: parseInt(config.http.host) || 3000,
        database: {
            host: config.db.mysql.url || 'localhost',
            user: config.db.mysql.username,
            password: config.db.mysql.password,
            port: config.db.mysql.port || 3306,
            schema: config.db.mysql.schema
        }
    }
}