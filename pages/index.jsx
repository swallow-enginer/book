import AppBar from "@comp/appBar";
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BookList from "@comp/bookList";
import Collapse from '@material-ui/core/Collapse';

export default function Home(props) {
  const router = useRouter();
  const bookList = [
    {
      title: "aaa",
      image: "http://books.google.com/books/content?id=ghgzDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      page : 200,
    },
    {
      title: "aaa",
      image: "http://books.google.com/books/content?id=ghgzDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      page : 200,
    },
    {
      title: "aaa",
      image: "http://books.google.com/books/content?id=ghgzDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      page : 200,
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
