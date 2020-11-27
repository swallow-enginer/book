import React, {useState} from 'react';
import BookEntryDialog  from "@comp/bookShowDialog";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const bookCard = (props) => {

    /** 画面パラメータ */
    const [pageProps, setPageProps] = useState({
      bookShowDialogOpen: false,
    });

  /**
   * コンポーネントに渡す引数
   */
  const compProps = {
    img : {
      textAlign: "center"
    },

    //ダイアログ関連のパラメータ
    bookShowDialog: {
      open : pageProps.bookShowDialogOpen,
      bookParam : props.bookParam,
      onClose: () => setPageProps({...pageProps, bookShowDialogOpen: false}),
      onSave: () => setPageProps({...pageProps, bookShowDialogOpen: false}),
      
    },

    showLink: {
      href: "#",
      onClick: () => setPageProps({...pageProps, bookShowDialogOpen: true})
    }
  }

  return (
    <Box>
      {/* 画像の表示 */}
      <Link {...compProps.showLink}>
        <img src={props.bookParam.image}/>
      </Link>
      {/* タイトルの表示 */}
      <Typography>
        <Link {...compProps.showLink}>
        {props.bookParam.title}
        </Link>
      </Typography>

      {/* ページ数 */}
      <Typography>{props.bookParam.page}ページ</Typography>

      {/* ダイアログ */}
      <BookEntryDialog {...compProps.bookShowDialog} />
    </Box>
  );
}

export default bookCard;