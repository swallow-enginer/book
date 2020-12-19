import Sequelize from 'sequelize';
import DbConfig from '~/src/lib/dbConfig'

/**
 * book テーブルの Entity モデル
 */
const bookModel = DbConfig.define('book', {
  book_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "本ID"
  },
  title: {
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
}, {
  freezeTableName: true,
});

export default bookModel;