import AppBar from "@comp/appBar";
import BookList from "@comp/bookList";
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import Box from '@material-ui/core/Box';
import React from 'react';

export async function getServerSideProps(context) {
  const keyword = context.query.keyword;  //検索キーワード

  if (!keyword) {
    setRedirect(context.res);
    return;
  }

  const response = await fetch (encodeURI(`${AppConst.URL.AMAZON_BOOK}?q=${keyword}`));
  const bookList = await response.json()
  if (bookList.totalItems == 0) {
    setRedirect(context.res);
    return;
  }

  return {
    props: {
      bookList: bookList,  //AMAZONブックの戻り値
      query : keyword      //クエリ値
    }
  }
}

const setRedirect = (res) => {
  res.setHeader("location", `/?${new URLSearchParams({message : "該当データがありません。"})}`);
  res.statusCode = 302;
  res.end();
}

export default function SearchResult(props) {
  const router = useRouter();

  //AMAZONブックのデータを整形した結果
  const bookList = props.bookList.items.map(item => {return {...item.volumeInfo, amazon_id : item.id}}).filter(item => !!item.pageCount).map(((item) => {
    return {
      title : item.title,                             //タイトル
      image_url : item.imageLinks.smallThumbnail,     //画像URL
      page : item.pageCount,                          //ページ数
      amazon_id : item.amazon_id,                     //amazonのID
    }
  }));

  /**
   * テンプレート追加
   */
  const addTemplate = () => {
    router.push(AppConst.URL.TEMPLATE_INPUT)
  }
  return (
    <>
      <AppBar onButtonClick={addTemplate}/>
      <Box mx={10} mt={4}>
        <BookList 
          bookList={bookList}
          title={`「${props.query}」の検索結果`}/>
      </Box>
    </>
  )
}
