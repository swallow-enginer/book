import Book from "~/src/model/bookModel";
import ReadingBook from "~/src/model/readingBookModel";
import DB from "~/src/lib/dbConfig";
import AppConst from "~/src/lib/appConst";
import {getUser, exeSuccess} from "~/src/lib/util"

export default async (req, res) => {
    //ユーザー情報の取得
    const user = await getUser(req, res);
    if (!user) {
        return;
    }

    //本の情報を取得
    if (req.method === AppConst.HTTP_METHOD.GET) {
        //一覧取得
        if (req.query.type === AppConst.URL_QUERY_TYPE.LIST) {
            await setBookList(req, res, user.user_id);
            return;
        
        //1冊の本を取得
        } else if (req.query.type === AppConst.URL_QUERY_TYPE.SINGLE) {
            await setBookSingle(req, res, user.user_id);
            return;
        }
    //本の登録処理
    } else if (req.method === AppConst.HTTP_METHOD.POST) {
        await insertBook(req, res, user.user_id);
        return;
    //本の削除処理
    } else if (req.method === AppConst.HTTP_METHOD.DELETE) {
        await deleteBook(req, res);
        return;
    }
    //エラー
    res.status(AppConst.HTTP_STATUS_CODE.BAD_REQUEST)
    return;
}


//本の削除処理
const deleteBook = async (req, res) => {
    const params = await JSON.parse(req.body);
    const reading_book = await ReadingBook.findOne({where: {book_id: params.book_id}});
    await ReadingBook.destroy({where: {reading_book_id: reading_book.reading_book_id}});
    await Book.destroy({where: {book_id: reading_book.book_id, amazon_id: null}})

    exeSuccess(res, reading_book);
}

//本の登録
const insertBook = async (req, res, user_id) => {
    const params = await JSON.parse(req.body);
    const book = await findOrCreateBook(params, params.amazon_id);

    //完読本テーブルの登録
    await ReadingBook.findOrCreate({
        where : {
            book_id: book.book_id,
            user_id: user_id,
        },
        defaults: {
            book_id: book.book_id,
            user_id: user_id,
        }
    });
    exeSuccess(res, book);
}

//本の取得（無ければ作成）
const findOrCreateBook = async (params, amazon_id) => {
    let book;
    if (amazon_id) {
        //本テーブルの登録
        [book] = await Book.findOrCreate({
            where : {
                amazon_id: amazon_id
        },
            defaults: params
        });
    } else {
        book = await (await Book.create(params)).dataValues;
    }
    return book;
}

//1件の本を返却する
const setBookSingle = async (req, res, user_id) => {
    const amazon_id = req.query.amazon_id;
    const book_id   = req.query.book_id;
    const data = await DB.query(`
                    SELECT 
                        book.title,
                        book.image_url,
                        book.page,
                        book.amazon_id,
                        book.book_id
                    FROM book
                    INNER JOIN reading_book
                        ON book.book_id = reading_book.book_id
                    WHERE reading_book.user_id = ?
                        AND ${book_id === "undefined"?"book.amazon_id = ?": "book.book_id = ?"}
                    `,
                    {
                        replacements: [user_id, book_id === "undefined"?amazon_id: book_id],
                        type: DB.QueryTypes.SELECT,
                        plain: true,
                    });
    //処理成功
    exeSuccess(res, data ? data: {});
}

//本のリストを返却する
const setBookList = async (req, res, user_id) => {
    //ユーザーに登録されている本を全て取得
    const data = await DB.query(`
            SELECT 
                book.title,
                book.image_url,
                book.page,
                book.amazon_id,
                book.book_id
            FROM book
            INNER JOIN reading_book
                ON book.book_id = reading_book.book_id
            WHERE reading_book.user_id = ?
            ORDER BY reading_book.create_dtt DESC
    `,{
        replacements: [user_id],
        type: DB.QueryTypes.SELECT,
    });

    //処理成功
    exeSuccess(res, data);
}
