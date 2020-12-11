import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import AppConst from "@lib/appConst";

const bookImage = (props) => {
  const [stored, setStored] = useState(false);
  
  useEffect(() => {
    (async () => {
      const response = await fetch(AppConst.API.BOOK + "?" + new URLSearchParams({type: "single", amazon_id : props.amazon_id}));
      const data = await response.json();
      setStored(Object.keys(data).length === 0 ? false: true);
    })();
  }, []);

  const onClickSaveButton = (save_f) => {
      (async () => {
        const params = {
          title     : props.title,
          amazon_id : props.amazon_id,
          image_url : props.image_url,
          page      : props.page,
        }
        const response = await fetch(AppConst.API.BOOK + "?" + new URLSearchParams(params), {method : save_f ? "POST" : "DELETE"});
        const data = await response.json();
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
      <img src={props.src} />
      <Button
        {...button["button-props"]}
      >
        {button["button-text"]}
      </Button>
    </div>
  );
}

export default bookImage;