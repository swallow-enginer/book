import AppBar from "@comp/appBar";
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BookList from "@comp/bookList";
import withAuth from "@auth/with-auth"
import { useEffect, useState } from "react";

const index = function Index(props) {

  //本のリスト
  const [book_lists, setBookList] = useState();  

  //レンダリング時の処理
  useEffect(() => {
    (async () => {
      const response = await fetch(AppConst.API.BOOK + "?" + new URLSearchParams({type: "list"}));
      const data = await response.json();
      setBookList(data);
    })();
  },[]);

  const router = useRouter();
  const bookList = [
    {
      title: "aaa",
      image: "http://books.google.com/books/content?id=ghgzDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      page : 200,
      amazon_id: "aaa"
    },
    {
      title: "aaa",
      image: "http://books.google.com/books/content?id=ghgzDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      page : 200,
      amazon_id: "aaa"
    },
    {
      title: "aaa",
      image: "http://books.google.com/books/content?id=ghgzDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      page : 200,
      amazon_id: "aaa"
    },
  ];

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
          <Box display="flex" alignItems="center">
            <h2>完読状況</h2>
          </Box>
          <Typography>現在の積み上げ：200mm(60ページ)</Typography>
          <Typography>広辞苑まで：100mm(50ページ)</Typography>
          <BookList 
          bookList={bookList}
          title="最近の記録"/>
      </Box>
    </>
  )
}

export default withAuth(index);