import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import React, {useState} from 'react';
import appConst from "@lib/appConst";
import { useRouter } from 'next/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { SettingsApplicationsTwoTone } from '@material-ui/icons';
import CategoryEntryDialog from '@comp/CategoryEntryDialog'

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
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const router = useRouter();

  /** カテゴリーの登録処理 */
  const handleSaveCategory = () => {
    setPageProps({...pageProps, categoryEntryDialogOpen: false})
  }

  /** 戻るボタンのクリック */
  const handleBackPage = () => {
    //入力途中のチェック必要
    router.push(appConst.URL.INDEX);
    return;
  }
    /** 画面パラメータ */
    const [pageProps, setPageProps] = useState({
      categoryEntryDialogOpen: false,
    });

  const getAppBar = () => {
    const href = router.pathname;
    
    switch (href) {
      //ホーム画面
      case appConst.URL.INDEX:
        return getHomeAppBar();
      
      //テンプレート入力画面
      case appConst.URL.TEMPLATE_INPUT:
        return getTemplateInputAppBar();
      
      //検索画面
      case appConst.URL.SEARCH:
        return getSearchAppBar();
      
        //タスク表示画面
      case appConst.URL.TEMPLATE_SHOW:
        return getTemplateShowAppBar();
    }
  }

  const compProps = {
    iconButton: {
      edge       : "start",
      className  : classes.menuButton,
      color      : "inherit",
      "aria-label"  : "menu",
      
    },
    headerButton : {
      className  : classes.headerButton,
      color      : "primary",
      onClick    : setPageProps({...pageProps, categoryEntryDialogOpen: true}),
    },
    headerTitle : {
      variant   : "h6",
      className : classes.title
    },
    arrowBackButton: {
      onClick: handleBackPage
    },
    categoryEntryDialog: {
      open : pageProps.categoryEntryDialogOpen,
      onClose: () => setPageProps({...pageProps, categoryEntryDialogOpen: false}),
      onSave: (category) => handleSaveCategory(category)
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
            ホーム
          </Typography>
          {/* <Avatar /> */}
          <Box ml={2}>
            <Button {...compProps.headerButton}>
              <AddIcon />本追加
            </Button>
          </Box>
          <CategoryEntryDialog {...compProps.categoryEntryDialog} />
      </>
    )
  }

    /**
   * テンプレート表示画面のヘッダー
   */
  const getTemplateShowAppBar = () => {
    return (
      <>
        <ButtonBase {...compProps.arrowBackButton}><ArrowBackIcon /></ButtonBase>
        <Typography {...compProps.headerTitle}>
            テンプレート内容
          </Typography>
        <Box ml={2}><Button {...compProps.headerButton}>
          <SaveIcon />編集
        </Button></Box>
      </>
    )
  }

  /**
   * テンプレート入力画面のヘッダー
   */
  const getTemplateInputAppBar = () => {
    return (
      <>
        <ButtonBase {...compProps.arrowBackButton}><ArrowBackIcon /></ButtonBase>
        <Typography {...compProps.headerTitle}>
            テンプレート登録
          </Typography>
        <Box ml={2}><Button {...compProps.headerButton}>
          <SaveIcon />保存
        </Button></Box>
      </>
    )
  }

  /**
   * 検索画面のヘッダー
   */
  const getSearchAppBar = () => {
    return (
      <>
        <ArrowBackIcon />
        <Typography {...compProps.headerTitle}>
            検索
        </Typography>
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