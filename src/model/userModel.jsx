import Sequelize from 'sequelize';
import DbConfig from '~/src/lib/dbConfig'

/**
 * user テーブルの Entity モデル
 */
const userModel = DbConfig.define('Users', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "ユーザーID",
  },
  user_nm: {
    type: Sequelize.STRING(50),
    comment: "ユーザー名",
  },
  sub_id: {
    type: Sequelize.STRING,
    unique: true,
    comment: "サブID(Auth0で一意のキー)",
  }
}, {
  tableName: "user"
});

userModel.sync();
export default userModel;