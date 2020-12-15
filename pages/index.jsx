import AppBar from "@comp/appBar";
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BookList from "@comp/bookList";
import withAuth from "@auth/with-auth"
import { useEffect, useLayoutEffect, useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const index = function Index(props) {

  //本のリスト
  const [bookList, setBookList] = useState([]);
  const [page, setPage] = useState(0);
  const [toast, setToast] = useState({open:false});
  const router = useRouter();

  //レンダリング時の処理
  useEffect (() => {
    //トーストの表示
    if(router.query.message) {
      setToast({open : true, message:router.query.message})
    }
    (async () => {
      //本の一覧を取得
      setBookList(await (await fetch(AppConst.API.BOOK + "?" + new URLSearchParams({type: "list"}))).json());

      //ページ総数の取得
      setPage(Number((await (await fetch(AppConst.API.USER + "?" + new URLSearchParams({type: "page"}))).json()).page))
    })();
  },[]);

  const handleClose = () => {
    setToast({open:false})
  }

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
          <Typography>{`現在のページ数：${page.toLocaleString()}ページ`}</Typography>
          <Typography>{`現在の高さ：${(Math.ceil(0.15 * page)).toLocaleString()}mm`}</Typography>
          <Typography>{`現在の重さ：${(Math.ceil(0.5 * page)).toLocaleString()}g`}</Typography>
          
          <Typography>広辞苑まで：100mm(50ページ)</Typography>
          <BookList 
            bookList={bookList}
            title="最近の記録"/>
        </Box>
        
        {/* メッセージ表示 */}
        <Snackbar open={toast.open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal:"center" }}>
          <Alert onClose={handleClose} severity="error">{toast.message}</Alert>
      </Snackbar>
    </>
  )
}

export default withAuth(index);