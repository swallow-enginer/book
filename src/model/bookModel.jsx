import Sequelize from 'sequelize';
import DbConfig from '@lib/dbConfig'

/**
 * book テーブルの Entity モデル
 */
const bookModel = DbConfig.define('book', {
  book_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    comment: "本ID"
  },
  book_title: {
    type: Sequelize.STRING(500),
    allowNull:false,
    comment: "タイトル"
  },
  amazon_id: {
    type: Sequelize.TEXT,
    unique:true,
    comment: "amazonID"
  },
  image_url : {
    type: Sequelize.TEXT,
    unique:true,
    comment: "画像URL"
  },
  page : {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: "ページ数"
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull:false,
    comment: "ユーザーID"
  },
  create_dtt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("current_timestamp"),
    comment: "作成日時"
  },
}, {
  freezeTableName: true,
});

bookModel.sync({force:true});
export default bookModel;