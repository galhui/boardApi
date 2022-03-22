export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT || 3306
    }
})