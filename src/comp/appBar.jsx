import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import AppConst from "~/src/lib/appConst";
import { useRouter } from 'next/router';
import BookEntryDialog from '~/src/comp/bookEntryDialog'
import SearchBar from '~/src/comp/searchBar'
import Link from '@material-ui/core/Link';
import SideBarDrawer from "~/src/comp/sideBarDrawer"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  //ヘッダータイトル
  headerTitle: {
    flexGrow: 1,
    minWidth: "90px",
  },

  //本追加ボタン
  headerButton: {
    borderRadius: "10px 10px 10px 10px",
    backgroundColor: "white",
    minWidth: "90px",
    '&:hover': { background: "rgba(255, 255, 255, 0.94)" }
  },

  //ホームリンク
  homeLink: {
    '&:hover': { cursor: "pointer" }
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const router = useRouter();

  /** 画面パラメータ */
  const [pageProps, setPageProps] = useState({
    bookEntryDialogOpen: false,   //ダイアログの表示・非表示
    sideBarDrawerOpen: false,     //サイドバーの表示・非表示
  });

  /** カテゴリーの登録処理 */
  const handleSaveBook = (book) => {
    (async (book) => {
      const params = {
        method: AppConst.HTTP_METHOD.POST,
        body: JSON.stringify(book)
      }
      await (await fetch(AppConst.API.BOOK, params)).json();
    })(book);
    //ダイアログのクローズ
    setPageProps({ ...pageProps, bookEntryDialogOpen: false });
  }
  
  //検索処理
  const handleSearch = (e) => {
    //Enterボタン以外
    if (e.keyCode !== 13 || !e.target.value) {
      return;
    }

    router.push(AppConst.URL.SEARCH_RESULT)
  }

  const compProps = {
    //メニューアイコン
    iconButton: {
      edge: "start",
      className: classes.menuButton,
      color: "inherit",
      "aria-label": "menu",
      onClick: () => setPageProps({ ...pageProps, sideBarDrawerOpen: true }),

    },

    //本追加ボタン
    headerButton: {
      className: classes.headerButton,
      color: "primary",
      onClick: () => setPageProps({ ...pageProps, bookEntryDialogOpen: true }),
    },
    
    //ヘッダータイトル
    headerTitle: {
      variant: "h6",
      className: classes.headerTitle
    },

    //ダイアログ
    bookEntryDialog: {
      open: pageProps.bookEntryDialogOpen,
      onClose: () => setPageProps({ ...pageProps, bookEntryDialogOpen: false }),
      onSave: (book) => handleSaveBook(book)
    },

    // 検索バー
    searchBar: {
      search: (e) => handleSearch(e)
    },

    //ホームアイコン
    homeLink: {
      color: "white",
      underline: "none",
      onClick: () => { router.push(AppConst.URL.INDEX) },
      className: classes.homeLink
    },

    //サイドバー
    sideBarDrawer: {
      open: pageProps.sideBarDrawerOpen,
      setPageProps: setPageProps
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* メニューアイコン */}
          <IconButton {...compProps.iconButton}>
            <MenuIcon />
          </IconButton>

          {/* ヘッダータイトル */}
          <Typography {...compProps.headerTitle}>
            <Link {...compProps.homeLink}>ホーム</Link>
          </Typography>

          {/* 検索 */}
          <SearchBar {...compProps.searchBar} />

          {/* 本追加ボタン */}
          <Box ml={2}>
            <Button {...compProps.headerButton}>
              <AddIcon />本追加
            </Button>
          </Box>

          {/* 本登録ダイアログ */}
          <BookEntryDialog {...compProps.bookEntryDialog} />

          {/* サイドバー */}
          <SideBarDrawer {...compProps.sideBarDrawer} />
        </Toolbar>
      </AppBar>
    </div>
  );
}