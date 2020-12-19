import React, {useState} from 'react';
import BookShowDialog  from "~/src/comp/bookShowDialog";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import BookImage from "~/src/comp/bookImage";
import { makeStyles } from '@material-ui/core';

const bookCard = (props) => {
  const useStyles = makeStyles((theme) => ({
    title: {
      marginLeft: "50px",
      marginRight: "50px",
    }
  }));
  const classes = useStyles();

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
    
    //タイトルのリンク
    showLink: {
      href: "#",
      onClick: () => setPageProps({...pageProps, bookShowDialogOpen: true})
    },

    //タイトル
    title: {
      className: classes.title
    }
  }

  return (
    <Box>
      {/* 画像の表示 */}
      <BookImage bookParam={props.bookParam}/>

      <Box {...compProps.title}>
        {/* タイトルの表示 */}
        <Typography>
          <Link {...compProps.showLink}>{props.bookParam.title}</Link>
        </Typography>

        {/* ページ数 */}
        <Typography>{props.bookParam.page}ページ</Typography>
      </Box>


      {/* ダイアログ */}
      <BookShowDialog {...compProps.bookShowDialog} />
    </Box>
  );
}

export default bookCard;