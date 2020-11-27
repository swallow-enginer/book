import AppBar from "@comp/appBar";
import BookList from "@comp/bookList";
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import Box from '@material-ui/core/Box';
import React, {useEffect } from 'react';

export async function getServerSideProps(context) {
  const keyword = context.query.keyword;  //検索キーワード

  const response = await fetch (encodeURI(`${AppConst.URL.AMAZON_BOOK}?q=${keyword}`));

  // const { res } = context;
  // res.setHeader("location", "/");
  // res.statusCode = 302;
  // res.end();
  // return;

  return {
    props: {
      bookList: await response.json(),  //AMAZONブックの戻り値
      query : keyword     //クエリ値
    }
  }
}

export default function SearchResult(props) {
  const router = useRouter();

  //AMAZONブックのデータを整形した結果
  const bookList = props.bookList.items.map(item => item.volumeInfo).filter(item => !!item.pageCount).map(((item) => {
    return {
      title : item.title,                             //タイトル
      image : item.imageLinks.smallThumbnail,         //画像URL
      page : item.pageCount,                          //ページ数
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
