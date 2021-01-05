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

    return session.user;
}

//処理成功時の処理
export const exeSuccess = (res, result) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(result));
}