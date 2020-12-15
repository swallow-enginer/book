import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import React, {useState} from 'react';
import appConst from "@lib/appConst";
import { useRouter } from 'next/router';
import BookEntryDialog from '@comp/BookEntryDialog'
import SearchBar from '@comp/searchBar'
import Link from '@material-ui/core/Link';
import SideBarDrawer from "@comp/sideBarDrawer"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  headerButton: {
      borderRadius: "10px 10px 10px 10px",
      backgroundColor: "white",
      '&:hover': { background: "rgba(255, 255, 255, 0.94)" }
  },
  homeIcon : {
    '&:hover': { cursor: "pointer" }
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const router = useRouter();

  /** カテゴリーの登録処理 */
  const handleSaveBook = (book) => {
    (async (book) => {
      const params = {
        method : "POST",
        body : JSON.stringify(book)}
        await (await fetch(appConst.API.BOOK, params)).json();
    })(book);
    setPageProps({...pageProps, bookEntryDialogOpen: false});
  }

  /** 画面パラメータ */
  const [pageProps, setPageProps] = useState({
    bookEntryDialogOpen: false,
    sideBarDrawerOpen: false,
  });

  /**
   * 
   */
  const getAppBar = () => {
    const href = router.pathname;
    
    switch (href) {
      //ホーム画面
      case appConst.URL.INDEX:
      case  appConst.URL.SEARCH_RESULT:
        return getHomeAppBar();
    }
  }

  /**
   * 
   * @param {object} e イベント
   */
  const search = (e) => {
    //Enterボタン以外
    if (e.keyCode !== 13 || !e.target.value) {
      return;
    }
    
    router.push(appConst.URL.SEARCH_RESULT)
  }

  const compProps = {
    iconButton: {
      edge       : "start",
      className  : classes.menuButton,
      color      : "inherit",
      "aria-label"  : "menu",
      onClick   : () => setPageProps({...pageProps, sideBarDrawerOpen:true}),
      
    },
    headerButton : {
      className  : classes.headerButton,
      color      : "primary",
      onClick    : () => setPageProps({...pageProps, bookEntryDialogOpen: true}),
    },
    headerTitle : {
      variant   : "h6",
      className : classes.title
    },
    bookEntryDialog: {
      open : pageProps.bookEntryDialogOpen,
      onClose: () => setPageProps({...pageProps, bookEntryDialogOpen: false}),
      onSave: (book) => handleSaveBook(book)
    },
    searchBar: {
      search: (e) => search(e)
    },
    //ホームアイコン
    homeIcon: {
      color: "white",
      underline: "none",
      onClick: () => {router.push(appConst.URL.INDEX)},
      className : classes.homeIcon
    }
  }

  /**
   * ホーム画面のヘッダー
   */
  const getHomeAppBar = () => {
    return (
      <>
        <IconButton {...compProps.iconButton}>
          <MenuIcon />
        </IconButton>
          <Typography {...compProps.headerTitle}>
            <Link {...compProps.homeIcon}>ホーム</Link>
          </Typography>

          {/* 検索 */}
          <SearchBar {...compProps.searchBar}/>
          {/* <Avatar /> */}
          
          <Box ml={2}>
            <Button {...compProps.headerButton}>
              <AddIcon />本追加
            </Button>
          </Box>
          {/* 本登録ダイアログ */}
          <BookEntryDialog {...compProps.bookEntryDialog} />
          {/* ドロワー */}
          <SideBarDrawer open={pageProps.sideBarDrawerOpen} setPageProps={setPageProps}/>
      </>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {getAppBar()}
        </Toolbar>
      </AppBar>
    </div>
  );
}