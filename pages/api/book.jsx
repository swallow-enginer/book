import Book from "@model/bookModel";
import ReadingBook from "@model/readingBookModel";
import auth0 from "@auth/auth0";
import DB from "@lib/dbConfig";

export default async (req, res) => {
    //ユーザー情報の取得
    const user = await getUser(req, res);
    if (!user) {
        return;
    }

    //本の情報を取得
    if (req.method === "GET") {
        //一覧取得
        if (req.query.type === "list") {
            await setBookList(req, res, user.user_id);
            return;
        
        //1冊の本を取得
        } else if (req.query.type === "single") {
            await setBookSingle(req, res, user.user_id);
            return;
        }
    //本の登録処理
    } else if (req.method === "POST") {
        await insertBook(req, res, user.user_id);
        return;
    }
}

//本の登録
const insertBook = async (req, res, user_id) => {
    const params = await JSON.parse(req.body);

    //本テーブルの登録
    const [book] = await Book.findOrCreate({
        where : {
            amazon_id: params.amazon_id
        },
        defaults: params
    });
    //完読本テーブルの登録
    const result = await ReadingBook.create({
        book_id: book.book_id, 
        user_id: user_id,
    });
    exeSuccess(res, result);
}

//1件の本を取得する
const setBookSingle = async (req, res, user_id) => {
    const amazon_id = req.query.amazon_id;
    //amazonIDがない時
    if (!amazon_id) {exeSuccess(res, {});}
    const data = await DB.query(`
                    SELECT 
                        book.title,
                        book.image_url,
                        book.page,
                        book.amazon_id
                    FROM book
                    INNER JOIN reading_book
                        ON book.book_id = reading_book.book_id
                    WHERE reading_book.user_id = ?
                        AND book.amazon_id = ?
                    `,
                    {
                        replacements: [user_id, amazon_id],
                        type: DB.QueryTypes.SELECT,
                        plain: true,
                    });
    //処理成功
    exeSuccess(res, data ? data: {});
}

//本のリストを取得する
const setBookList = async (req, res, user_id) => {
    const PAGE_NUM = 10;    //1ページに表示する個数
    const page = !req.query || !req.query.page ? 1: req.query.page;  //ページ番号

    //ユーザーに登録されている本を全て取得
    const data = await DB.query(`
            SELECT 
                book.title,
                book.image_url,
                book.page,
                book.amazon_id
            FROM book
            INNER JOIN reading_book
                ON book.book_id = reading_book.book_id
            WHERE reading_book.user_id = ?
            ORDER BY reading_book.create_dtt DESC
            OFFSET ? LIMIT ?
    `,{
        replacements: [user_id, PAGE_NUM, PAGE_NUM * page],
        type: DB.QueryTypes.SELECT,
    });

    //処理成功
    exeSuccess(res, data);
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
