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


const bookEntryDialog = (props) => {
  const classes = useStyles();
  const [book, setBook] = useState({
    title: null,
    page: null,
  });

  /** ページプロパティ */
  const pageProps = {
    parentBookList: [
      {
        bookId: 0,
        title: "テスト"
      }
    ]
  }

  const handleBookEntryDialogClose = () => {
    setBook({})
    props.onClose()
  }

  const compProps = {
    dialog: {
      open: props.open,
      onClose: handleBookEntryDialogClose,
      scroll:'paper',
    },
    dialogContent: {
      dividers: true
    },
    dialogContentText: {
      tabIndex: -1
    },
    saveButton: {
      onClick: () => props.onSave(book),
      color: "primary",
      disabled: !book.title 
                  || !book.page 
                  || !isFinite(book.page) 
                  || 0 >= Number(book.page) 
                  || !Number.isInteger(Number(book.page))
    },
    cancelButton: {
      onClick: handleBookEntryDialogClose,
      color: "primary"
    },
    title: {
      label: "タイトル",
      variant: "outlined",
      fullWidth: true,
      value: book.title,
      onChange: (e) => setBook({...book, title: e.target.value}),
      helperText:pageProps.errorMessage,
      error: pageProps.errorMessage,
    },
    parentBook: {
      label: "ページ数",
      value: book.page,
      variant: "outlined",
      className: classes.parentButton,
      fullWidth: true,
      size:"small",
      error: pageProps.errorMessage,
      onChange: (e) => setBook({...book, page: e.target.value})
    },
  }

  return (
      <Dialog {...compProps.dialog}>
        <DialogTitle>本の登録</DialogTitle>
        <DialogContent {...compProps.dialogContent}>
          <DialogContentText {...compProps.dialogContentText}>
            <TextField {...compProps.title} />
            <TextField {...compProps.parentBook} />
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

bookEntryDialog.propTypes = {
    open: PropTypes.bool,       //表示フラグ
    onClose: PropTypes.func,    //閉じる処理
    onSave: PropTypes.func,     //保存処理
  }
  
  export default bookEntryDialog;