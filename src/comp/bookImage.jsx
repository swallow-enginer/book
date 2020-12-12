import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import AppConst from "@lib/appConst";

const bookImage = (props) => {
  const [stored, setStored] = useState(false);
  const [book_id, setBookId] = useState();
  
  useEffect(() => {
    (async () => {
      const query = new URLSearchParams({type: "single", amazon_id : props.bookParam.amazon_id});
      const response = await fetch(`${AppConst.API.BOOK}?${query}`);
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

  const onClickSaveButton = (save_f) => {
      (async () => {
        const params = {...props.bookParam, book_id : book_id};
        //登録もしくは削除処理
        const response = await fetch(AppConst.API.BOOK, {
            method : save_f ? "POST" : "DELETE",
            body   : JSON.stringify(params)
          });
        const data = await response.json();
        //book_idの更新処理
        if (save_f) {setBookId(data.book_id)} 
        else {setBookId()}
    })()
    setStored(save_f);
  };

  const button = {
    "button-props":
    stored ? {
        //保存済み
        variant:"contained",
        color:"primary",
        disableElevation:true,
        onClick: () => onClickSaveButton(false)
      } : {
        //未保存
        variant:"outlined",
        color:"primary",
        disableElevation:true,
        onClick: () => onClickSaveButton(true)
      },
    "button-text": stored ? "保存済" : "保存",
    "button-style":
      !stored ? {
        backgroundColor: "white",
        '&:hover': { background: "rgba(255, 255, 255, 0.94)" },
      } : {}
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      position: "relative",
      maxWidth: "180px",

      "& Button": {
        position: "absolute",
        bottom: "0",
        right: "0",
        ...button["button-style"],
      },

      "& img" : {
        width: "100%"
      }
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={props.bookParam.image_url} />
      <Button
        {...button["button-props"]}
      >
        {button["button-text"]}
      </Button>
    </div>
  );
}

export default bookImage;