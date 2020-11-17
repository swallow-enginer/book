import Db from '@lib/dbConfig';
// import auth0 from '@lib/auth0';
import CategoryModel from '@model/categoryModel';
import AppConst from '@lib/appConst';
import LTT from "list-to-tree";

let user = {userId: 1};

// export default auth0.requireAuthentication(async (req, res) => {
//     const session = await auth0.getSession(req);
//     user = await session.user;
export default async (req, res) => {
  if (req.method === AppConst.HTTP_METHOD.GET) {
    getListCategory(req, res);
    return;

    //登録画面
  } else if (req.method === AppConst.HTTP_METHOD.POST) {
    insertCategory(req, res);
    return;

    //更新画面
  } else if (req.method === AppConst.HTTP_METHOD.PUT) {
    updateCategory(req, res);
    return;
  }
};

//テンプレート1つ分取得
const getListCategory = async (req, res) => {
  try {
    const userId = user.userId;
    //エラー終了
    if (!userId) {
      throw new Error('Request Query userId required.\n' +
                      `Status Code: ${AppConst.HTTP_STATUS_CODE.PRECONDITION_FAILED}`);
    }

    const result = await CategoryModel.findAll({
      where: { user_id: userId },
      order:[
        ["category_id", "ASC"],
      ],
    })
    //木構造に変換
    const ltt = new LTT(result.map(value => value.dataValues), {
      key_id: 'category_id',
      key_parent: 'parent_category_id'
    });
    res.json(await ltt.GetTree());
  } catch(err) {
    res.send(err.message);
  }
};

//登録
const insertCategory = async (req, res) => {
  try {
    var values = {
      user_id           : user.userId,
      category_nm       : req.query.categoryNm,
      parent_category_id: req.query.parentCategoryId,
      category_id       : await getMaxCategoryId() 
    }
    const result = await CategoryModel.create(values);
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

// //更新
// const updateCategory = async (req, res) => {
//   try {
//     const categoryId = req.query.categoryId;
//     if (!categoryId) {
//       throw new Error('Request Query categoryId required.\n' +
//         `Status Code: ${AppConst.HTTP_STATUS_CODE.PRECONDITION_FAILED}`);
//     }
//     var values = {
//       user_id           : user.userId,
//       category_id       : req.query.categoryId,
//       category_title    : req.query.categoryTitle,
//     }
//     await CategoryModel.update(values, {
//       where: {category_id : categoryId}
//     });
//     const result = await CategoryModel.findOne({where:{category_id : categoryId}})

//     res.json(result);
//   } catch (err) {
//     res.send(err.message);
//   }
// };

// //削除
// const deleteCategory = (req, res) => {
//   CategoryModel
//     .destroy({
//       where: { category_id: req.query.category_id }
//     })
//     .then(function () {
//       res.json();
//     }).catch(function (err) {
//       res.send(err);
//     })
// };

/** 最大のテンプレートIDを取得する */
const getMaxCategoryId = async () => {
  const result = await CategoryModel.findOne({
    attributes: [
      [
        Db.fn("COALESCE",
          Db.fn('MAX', Db.col("category_id")),
          0),
        "max_category_id"
      ],
    ],
  });
  return await result.dataValues['max_category_id'] + 1;
}