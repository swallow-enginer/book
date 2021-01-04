import User from "~/src/model/userModel";
import Auth0 from "~//src/lib/auth0/auth0";
import AppConst from "~/src/lib/appConst";

//ユーザー情報の取得
export const getUser = async (req, res) => {
    //セッション情報の取得
    const session = await Auth0.getSession(req);
    //リダイレクト
    if (!session || !session.user) {
        res.writeHead(302, {
          Location: AppConst.API.LOGIN
        });
        res.end();
        return;
    }
    //auth0のID
    const sub_id = session.user.sub;
    //ユーザーの登録
    const [user] = await User.findOrCreate({
        where: { sub_id: sub_id},
        defaults: { sub_id: sub_id},
      });

    return user;
}