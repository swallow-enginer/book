import book from "@model/bookModel";

export default async (req, res) => {
    const PAGE_NUM = 10;    //1ページに表示する個数
    const page = !req.query || !req.query.page ? 1: req.query.page;  //ページ番号
    
    //ユーザー情報の取得
    const user = getUser(req, res);
    if (!user) {
        return;
    }
    //ユーザーに登録されている本を全て取得
    const book_list = await book.findAll({
        where : {user_id : user.user_id},    //ユーザーIDで絞る
        order: [
            ['create_dtt', 'DESC']          //作成日時でソート
        ],
        limit: PAGE_NUM,                    //1ページ毎のアイテム数
        offset: PAGE_NUM * page             //ページ番号の数
    });

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(book_list));
}

const getUser = (req, res) => {
    const session = auth0.getSession(req);
    //リダイレクト
    if (!session || !session.user) {
        res.writeHead(302, {
          Location: '/api/login'
        });
        res.end();
        return;
    }
}
