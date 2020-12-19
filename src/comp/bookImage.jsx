import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import AppConst from "~/src/lib/appConst";

const bookImage = (props) => {
  const [stored, setStored] = useState();   //登録済み本判定
  const [book_id, setBookId] = useState();  //本ID
  
  useEffect(() => {
    //本IDの取得
    (async () => {
      const params = {type: "single", amazon_id : props.bookParam.amazon_id, book_id :props.bookParam.book_id}
      const response = await fetch(`${AppConst.API.BOOK}?${new URLSearchParams(params)}`);
      const data = await response.json();
      //未登録
      if (Object.keys(data).length === 0) {
        setStored(false)
        setBookId()
      //登録済み
      } else {
        setStored(true)
        setBookId(data.book_id)
      }
      
    })();
  }, []);

  //保存ボタンが押されたときの処理
  const onClickSaveButton = (save_f) => {
      //本データの登録もしくは削除処理
      (async () => {
        const params = {...props.bookParam, book_id : book_id};
        const response = await fetch(AppConst.API.BOOK, {
            method : save_f ? "POST" : "DELETE",
            body   : JSON.stringify(params)
          });
        const data = await response.json();

        //book_idの更新処理
        save_f? setBookId(data.book_id): setBookId()
    })()
    setStored(save_f);
  };
  
  //保存ボタンの設定
  const button = stored? {
      //保存済み
      "button-props": {
        variant:"contained",
        color:"primary",
        disableElevation:true,
        onClick: () => onClickSaveButton(false)
      },
      "button-text": "保存済",
    }: {
      //未保存
      "button-props": {
        variant:"outlined",
        color:"primary",
        disableElevation:true,
        onClick: () => onClickSaveButton(true)
      },
      "button-text": "保存",
      "button-style": {
        backgroundColor: "white",
        '&:hover': { background: "rgba(255, 255, 255, 0.94)" },
      }
    };

  const useStyles = makeStyles((theme) => ({
    root: {
      position: "relative",
      maxWidth: "180px",
      margin: "0 auto",

      //保存ボタン
      "& Button": {
        position: "absolute",
        bottom: "0",
        right: "0",
        ...button["button-style"],
      },

      //画像
      "& img" : {
        width: "180px",
        height: "270px",
        objectFit: "cover",
      }
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={props.bookParam.image_url ? props.bookParam.image_url: AppConst.URL.NO_IMAGE_URL} />
      {/* ロード完了後表示 */}
      {(stored !== undefined) &&
        <Button {...button["button-props"]}>
          {button["button-text"]}
        </Button>
      }
    </div>
  );
}

export default bookImage;