import Sequelize from 'sequelize';

/**
 * DB接続設定を定義
 */
const dbConfig = new Sequelize(
        process.env.DB_DB,        //DB名
        process.env.DB_USER,      //ユーザー名
        process.env.DB_PASSWORD,  //パスワード
        {               //オプション
            // // 接続先ホストを指定
            // host: 'localhost',

            // 使用する DB 製品を指定
            dialect: 'postgres',
            host: process.env.DB_HOST,
            operatorsAliases: false,
            pool: {
                max: process.env.POOL_MAX,
            },
            dialectOptions: {
                socketPath: process.env.DB_INSTANCE,
            },
            query:{raw:true},
});

module.exports = dbConfig;