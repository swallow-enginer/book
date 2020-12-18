import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "400px"
  },
  page: {
    marginTop: theme.spacing(4)
  },
  bookImage: {
    textAlign: "center"
  },
  }));


const bookShowDialog = (props) => {
  const classes = useStyles();
  const [book, setBook] = useState({
    bookNm: null,
    bookPage: null,
  });

  /**
   * ダイアログを閉じる際の処理
   */
  const handleBookEntryDialogClose = () => {
    setBook({})
    props.onClose()
  }

  const compProps = {
    //ダイアログ
    dialog: {
      open: props.open,
      onClose: handleBookEntryDialogClose,
      scroll:'paper',
      classes: {
        paper: classes.dialog
      }
    },

    //ダイアログコンテンツ
    dialogContent: {
      dividers: true
    },

    //ダイアログテキスト
    dialogContentText: {
      tabIndex: -1
    },
    // saveButton: {
    //   onClick: () => props.onSave(book),
    //   color: "primary",
    //   disabled: !book.bookNm || (!book.bookPage || !isFinite(book.bookPage))
    // },
    cancelButton: {
      onClick: handleBookEntryDialogClose,
      color: "primary"
    },
    bookImage: {
      className: classes.bookImage,
    }
  }

  return (
      <Dialog {...compProps.dialog}>

        {/* タイトル */}
        <DialogTitle>{props.bookParam.title}</DialogTitle>

        <DialogContent {...compProps.dialogContent}>
          {/* 画像 */}
          <Box {...compProps.bookImage}>
            <img src={props.bookParam.image_url} />
          </Box>

          {/* ページ数 */}
          <DialogContentText {...compProps.dialogContentText}>
            <Typography>{props.bookParam.page}ページ</Typography>
          </DialogContentText>

        </DialogContent>

        {/* ボタン */}
        <DialogActions>
          <Button {...compProps.cancelButton}>
            閉じる
          </Button>
          
          {/* <Button {...compProps.saveButton}>
            追加
          </Button> */}
        </DialogActions>
      </Dialog>
  );
}

bookShowDialog.propTypes = {
    open: PropTypes.bool,       //表示フラグ
    onClose: PropTypes.func,    //閉じる処理
    onSave: PropTypes.func,     //保存処理
  }
  
  export default bookShowDialog;