import Sequelize from 'sequelize';
import DbConfig from '@lib/dbConfig'

/**
 * user テーブルの Entity モデル
 */
const userModel = DbConfig.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
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
});

userModel.sync({force:true});
export default userModel;