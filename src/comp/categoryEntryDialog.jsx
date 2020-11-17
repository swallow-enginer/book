import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  parentButton: {
    marginTop: theme.spacing(4)
  }}));


const categoryEntryDialog = (props) => {
  const classes = useStyles();
  const [category, setCategory] = useState({
    categoryNm: null,
    parentCategoryId: null,
  });

  /** ページプロパティ */
  const pageProps = {
    parentCategoryList: [
      {
        categoryId: 0,
        categoryNm: "テスト"
      }
    ]
  }

  const handleCategoryEntryDialogClose = () => {
    setCategory({})
    props.onClose()
  }

  const compProps = {
    dialog: {
      open: props.open,
      onClose: handleCategoryEntryDialogClose,
      scroll:'paper',
    },
    dialogContent: {
      dividers: true
    },
    dialogContentText: {
      tabIndex: -1
    },
    saveButton: {
      onClick: () => props.onSave(category),
      color: "primary",
      disabled: !category.categoryNm
    },
    cancelButton: {
      onClick: handleCategoryEntryDialogClose,
      color: "primary"
    },
    categoryNm: {
      label: "カテゴリー名",
      variant: "outlined",
      fullWidth: true,
      value: category.categoryNm,
      onChange: (e) => setCategory({...category, categoryNm: e.target.value}),
      helperText:pageProps.errorMessage,
      error: pageProps.errorMessage,
    },
    parentCategory: {
      label: "親カテゴリー",
      value: category.parentCategoryId,
      variant: "outlined",
      className: classes.parentButton,
      fullWidth: true,
      select: true,
      size:"small",
      onChange: (e) => setCategory({...category, parentCategoryId: e.target.value})
    },
  }

  const getCategoryMenu = () => 
    pageProps.parentCategoryList.map(category => (
        <MenuItem value={category.categoryId}>{category.categoryNm}</MenuItem>
    ))

  return (
      <Dialog {...compProps.dialog}>
        <DialogTitle>カテゴリーの登録</DialogTitle>
        <DialogContent {...compProps.dialogContent}>
          <DialogContentText {...compProps.dialogContentText}>
            <TextField {...compProps.categoryNm} />
            <TextField {...compProps.parentCategory} >
              {getCategoryMenu()}
            </TextField>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button {...compProps.cancelButton}>
            キャンセル
          </Button>
          <Button {...compProps.saveButton}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
  );
}

categoryEntryDialog.propTypes = {
    open: PropTypes.bool,       //表示フラグ
    onClose: PropTypes.func,    //閉じる処理
    onSave: PropTypes.func,     //保存処理
  }
  
  export default categoryEntryDialog;