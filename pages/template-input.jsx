import React, {useState} from 'react';
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import AppBar from "@comp/appBar";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import ButtonBase from '@material-ui/core/ButtonBase';
import HelpDialog from '@comp/helpDialog';
import CategoryEntryDialog from '@comp/categoryEntryDialog';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    [theme.breakpoints.up('md')]: {maxWidth: "800px",},
    [theme.breakpoints.down('sm')]: {margin: "0 80px",},
    margin: "auto",
    "& > *": {
      marginTop: theme.spacing(4),
    }
  },
  /** 入力項目とラベルの大きさの変更 */
  templateTitle: {
    "& .MuiInputBase-input"  : {fontSize: "2rem"},
    "& .MuiInputLabel-shrink": {transform: "translate(0, 1.5px) scale(0.4)"},
    "& .MuiFormLabel-root"   : {fontSize: "1.5rem"},
  },
  templateContents: {
    marginTop: theme.spacing(1)
  },
  helpIcon: {
    marginLeft: theme.spacing(0.5)
  }
}));

// export async function getStaticProps(context) {
//   //IDからテンプレート内容を取得
// }

const templateInput = () => {
  const classes = useStyles();
  const router = useRouter();

  /** 入力テンプレート */
  const [template, setTemplate] = useState({
    template_id : null,
    title       : null,
    category_id : null,
  });

  /** 画面パラメータ */
  const [pageProps, setPageProps] = useState({
    errorMessage: null,
    helpDialogOpen: false,
    categoryEntryDialogOpen: false,
  });

  /** 選択可能カテゴリー一覧 */
  const categoryList = [
    {
      id: 0,
      title: "テスト"
    }
  ]

  const handleChangeCategory = (e) => {
    //新規登録カテゴリーIDの場合、ダイアログオープン
    if (AppConst.CATEGORY_ID.ENTRY === e.target.value) {
      setPageProps({...pageProps, categoryEntryDialogOpen: true});
      return;
    }
    setTemplate({...template, category_id: e.target.value})
  }

  /** テンプレートの保存処理 */
  const saveTemplate = () => {
    if(isErrorSave()) {return;}
    router.push({
      pathname : AppConst.URL.TEMPLATE_SHOW,
      query :  {template_id : template}
    })
  }

  /** カテゴリーの登録処理 */
  const handleSaveCategory = (category) => {
    //TODO サーバーの保存処理
    //カテゴリーリストの再取得
    setTemplate({...template, category_id: category.categoryId})
    setPageProps({...pageProps, categoryEntryDialogOpen: false})
  }

  /** 保存処理のエラーチェック */
  const isErrorSave = () => {
    let err_f = false;
    //エラー
    if (!template.title) {
      setPageProps({...pageProps, errorMessage : "入力してください！"})
      err_f = true;
    }
    return err_f;
  }

  /** コンポーネントに渡す引数 */
  const compProps = {
    mainContent: {
      mx: 10,
      mt: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      className: classes.mainContent,
    },
    title: {
      label: "テンプレートタイトル",
      // className: classes.templateTitle,
      variant: "outlined",
      value: template.title,
      onChange: (e) => setTemplate({...template, title: e.target.value}),
      helperText:pageProps.errorMessage,
      error: pageProps.errorMessage,
    },
    category: {
      label: "カテゴリー",
      value: template.category_id,
      variant: "outlined",
      select: true,
      size:"small",
      onChange: handleChangeCategory
    },
    template_contents: {
      label: "テンプレート内容",
      value: template.templateContents,
      className: classes.templateContents,
      variant: "outlined",
      multiline: true,
      rows:20
    },
    helpIconButton: {
      onClick: () => setPageProps({...pageProps, helpDialogOpen : true}),
    },
    helpIcon: {
      fontSize: "small",
      className: classes.helpIcon,
    },
    template_description: {
      display:"flex",
      alignItems:"center"
    },
    helpDialog: {
      open: pageProps.helpDialogOpen,
      onClose: () => setPageProps({...pageProps, helpDialogOpen: false})
    },
    categoryEntryDialog: {
      open : pageProps.categoryEntryDialogOpen,
      onClose: () => setPageProps({...pageProps, categoryEntryDialogOpen: false}),
      onSave: (category) => handleSaveCategory(category)
    }
  }

  /**
   * カテゴリーメニューの取得
   */
  const getCategoryMenu = () => {
    const dispCategoryList = categoryList.concat();
    dispCategoryList.push({
      id    : AppConst.CATEGORY_ID.ENTRY,
      title : <><AddIcon />新規追加</>
    });

    return (
      dispCategoryList.map(category => (
        <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
      ))
    )
  }

  return (
    <>
      <AppBar onButtonClick={saveTemplate}/>
      <Box {...compProps.mainContent}>
        <TextField {...compProps.title} />
        <TextField {...compProps.category} >
          {getCategoryMenu()}
        </TextField>

        <Box {...compProps.template_description}>
          <Typography variant="body2">テンプレートの書き方</Typography>
          <ButtonBase {...compProps.helpIconButton}><HelpIcon {...compProps.helpIcon} /></ButtonBase>
        </Box>
        <TextField {...compProps.template_contents}/>
      </Box>

      <HelpDialog {...compProps.helpDialog} />
      <CategoryEntryDialog {...compProps.categoryEntryDialog} />
    </>
  )
}
export default templateInput;
