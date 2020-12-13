import auth0 from "@auth/auth0";
import DB from "@lib/dbConfig";

//book_IDに変更

export default async (req, res) => {
    //ユーザー情報の取得
    const user = await getUser(req, res);
    if (!user) {
        return;
    }

    //本の情報を取得
    if (req.method === "GET") {
        //一覧取得
        if (req.query.type === "page") {
            await setPage(res, user.user_id);
            return;
        }
    }
}


//1件の本を取得する
const setPage = async (res, user_id) => {
    const data = await DB.query(`
                SELECT
                    COALESCE(SUM(book.page), 0) AS page
                FROM "user"
                INNER JOIN reading_book
                    ON reading_book.user_id = "user".user_id
                INNER JOIN book
                    ON book.book_id = reading_book.book_id
                WHERE
                    "user".user_id = ?
                    `,
                    {
                        replacements: [user_id],
                        type: DB.QueryTypes.SELECT,
                        plain: true,
                    });
    //処理成功
    exeSuccess(res, data ? data: {});
}


//処理成功時の処理
const exeSuccess = (res, result) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result));
}

//ユーザー情報の取得
const getUser = async (req, res) => {
    //セッション情報の取得
    const session = await auth0.getSession(req);
    //リダイレクト
    if (!session || !session.user) {
        res.writeHead(302, {
          Location: '/api/login'
        });
        res.end();
        return;
    }
    return session.user;
}
