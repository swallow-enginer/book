import auth0 from '~//src/lib/auth0/auth0';
import User from "~/src/model/userModel";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        //サブからユーザー情報を取得
        let user_info = await User.findOne({where: { sub_id: session.user.sub}});
        
        //ユーザーが登録されていなければ登録
        if (!user_info) {
          user_info = await insertUser(session.user.sub)
        }
        
        return {
          ...session,
          
          //引数のセッション情報のユーザー情報を上書き
          user: {
            ...user_info,
          }
        };
      }
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
//ユーザー情報の登録
const insertUser = async (sub_id) => {
  const data = await User.create({
    sub_id :sub_id
  });
  return await data.dataValues;
}