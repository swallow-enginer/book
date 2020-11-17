import Sequelize from 'sequelize';
import DbConfig from '@lib/dbConfig'

/**
 * category テーブルの Entity モデル
 */
const categoryModel = DbConfig.define('category', {
  category_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    comment: "カテゴリーID"
  },
  category_nm: {
    type: Sequelize.STRING(50),
    allowNull:false,
    comment: "カテゴリー名"
  },
  parent_category_id: {
    type: Sequelize.INTEGER,
    comment: "親カテゴリーID"
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: "ユーザーID"
  }
}, {
  freezeTableName: true,
});

categoryModel.sync();
export default categoryModel;