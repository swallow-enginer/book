import AppBar from "~/src/comp/appBar";
import BookList from "~/src/comp/bookList";
import AppConst from "~/src/lib/appConst";
import Box from '@material-ui/core/Box';
import React from 'react';
import Auth0 from '~//src/lib/auth0/auth0';

export async function getServerSideProps(context) {
  //非ログイン状態
  if (!await Auth0.getSession(context.req)) {
    setRedirect(context.res);
    return;
  }

  //検索キーワード
  const keyword = context.query.keyword;
  
  //キーワードが無ければホーム画面にリダイレクト
  if (!keyword) {
    setRedirect(context.res, AppConst.ERROR_MESSAGE.NOT_FOUND_DATA);
    return;
  }

  const response = await fetch (encodeURI(`${AppConst.API.AMAZON_BOOK}?q=${keyword}`));
  const bookList = await response.json()
  if (bookList.totalItems == 0) {
    setRedirect(context.res, AppConst.ERROR_MESSAGE.NOT_FOUND_DATA);
    return;
  }

  return {
    props: {
      bookList: bookList,  //AMAZONブックの戻り値
      query : keyword      //クエリ値
    }
  }
}

//リダイレクト処理
const setRedirect = (res, message) => {

  res.setHeader("location", `${AppConst.URL.HOME}?${new URLSearchParams({message : message})}`);
  res.statusCode = AppConst.HTTP_STATUS_CODE.REDIRECT;
  res.end();
}

export default function SearchResult(props) {

  //AMAZONブックのデータを整形した結果
  const bookList = props.bookList.items
                      //amazonIDの追加
                      .map(item => {return {...item.volumeInfo, amazon_id : item.id}})
                      //対象の項目が抜けている場合、対象外
                      .filter(item => item.pageCount && (item.imageLinks && item.imageLinks.smallThumbnail) && item.title)
                      //抜き出す項目
                      .map(((item) => {
    return {
      title : item.title,                             //タイトル
      image_url : item.imageLinks.smallThumbnail,     //画像URL
      page : item.pageCount,                          //ページ数
      amazon_id : item.amazon_id,                     //amazonのID
    }
  }));

  return (
    <>
      <AppBar/>
      <Box mx={10} mt={4}>
        <BookList
          bookList={bookList}
          title={`「${props.query}」の検索結果`}/>
      </Box>
    </>
  )
}
