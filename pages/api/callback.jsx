import auth0 from '~//src/lib/auth0/auth0';
// import AppConst from '~/src/lib/appConst';
import User from "~/src/model/userModel";

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (req, res, session, state) => {
        //サブからユーザー情報を取得
        const [user_info] = await User.findOrCreate({
          where: { sub_id: session.user.sub},
          defaults: { sub_id: session.user.sub},
        });
        
        return {
          //引数のセッション情報のユーザー情報を上書き
          user: {
            ...user_info,
          }
        };
      }
    });
    // await auth0.handleCallback(req, res, {redirectTo: AppConst.URL.HOME})
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}