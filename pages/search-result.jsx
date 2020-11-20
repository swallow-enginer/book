import AppBar from "@comp/appBar";
import BookList from "@comp/bookList";
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import Box from '@material-ui/core/Box';
import React, {useEffect } from 'react';

export async function getServerSideProps() {
  const qs = new URLSearchParams({
    type: AppConst.URL_QUERY_TYPE.LIST
  });
  const url = encodeURI(AppConst.URL.AMAZON_BOOK + `?q=ファスト&スロー`);

  const response = await fetch(url)
  return {
    props: {
      bookList: await response.json()
    }
  }
}

export default function Home(props) {
  const router = useRouter();

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
      <BookList bookList={props.bookList.items.map(item => item.volumeInfo).filter(item => !!item.pageCount)} title="「AA」の検索結果"/>
      </Box>
      {/* <Test /> */}
    </>
  )
}
