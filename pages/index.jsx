import AppBar from "~/src/comp/appBar";
import { useRouter } from 'next/router';
import AppConst from "~/src/lib/appConst";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BookList from "~/src/comp/bookList";
import withAuth from "~//src/lib/auth0/with-auth"
import { useEffect, useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const index = function Index() {

  const [bookList, setBookList] = useState([]);        //本のリスト
  const [page, setPage] = useState(0);                 //総ページ数
  const [toast, setToast] = useState({ open: false });    //エラーメッセージの表示・非表示
  const router = useRouter();
  //エラーメッセージのクローズ
  const handleToastClose = () => {
    setToast({ open: false })
  }

  const pageProps = {
    //スナックバー
    snackBar: {
      open: toast.open,
      autoHideDuration: AppConst.ERROR_MESSAGE_DURATION,
      onClose: handleToastClose,
      anchorOrigin: { vertical: "top", horizontal: "center" },
    },

    //警告
    alert: {
      onClose: handleToastClose,
      severity: "error",
    },

    //本のリスト
    bookList: {
      bookList: bookList,
      title: "最近の記録",
    }
  }

  //レンダリング時の処理
  useEffect(() => {
    //エラーメッセージの表示の表示
    if (router.query.message) {
      setToast({ open: true, message: router.query.message })
    }
    (async () => {
      //本の一覧を取得
      setBookList(await (await fetch(AppConst.API.BOOK + "?" + new URLSearchParams({ type: AppConst.URL_QUERY_TYPE.LIST }))).json());

      //ページ総数の取得
      setPage(Number((await (await fetch(AppConst.API.USER + "?" + new URLSearchParams({ item: AppConst.URL_QUERY_ITEM.PAGE }))).json()).page))
    })();
  }, []);

  return (
    <>
      <AppBar />
      <Box mx={10} mt={4}>
        <Box display="flex" alignItems="center">
          <h2>完読状況</h2>
        </Box>
        <Typography>{`現在のページ数：${page.toLocaleString()}ページ`}</Typography>
        <Typography>{`現在の高さ：${(Math.ceil(0.15 * page)).toLocaleString()}mm`}</Typography>
        <Typography>{`現在の重さ：${(Math.ceil(0.5 * page)).toLocaleString()}g`}</Typography>
        <BookList {...pageProps.bookList} />
      </Box>

      {/* メッセージ表示 */}
      <Snackbar {...pageProps.snackBar}>
        <Alert {...pageProps.alert}>{toast.message}</Alert>
      </Snackbar>
    </>
  )
}

export default withAuth(index);