import Sequelize from 'sequelize';
import DbConfig from '~/src/lib/dbConfig'

/**
 * book テーブルの Entity モデル
 */
const readingBookModel = DbConfig.define('reading_book', {
  reading_book_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "完読本ID"
  },
  book_id: {
    type: Sequelize.INTEGER,
    comment: "本ID"
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

export default readingBookModel;