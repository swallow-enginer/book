import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import AppConst from "@lib/appConst";
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

// const useStyles = makeStyles({
//   root: {
//     width: "85%"
//   },
// });

const templateCard = (props) => {
  // const classes = useStyles();
  // const router = useRouter();

  /**
   * テンプレートカードをクリックしたときの処理
   * @param {Event} e イベントオブジェクト
   */
  // const onClickTemplateCard = (template_id) => {
  //   router.push({
  //     pathname: AppConst.URL.TEMPLATE_SHOW,
  //     query: { template_id: template_id },
  //   });
  // }

  /**
   * コンポーネントに渡す引数
   */
  const compProps = {
    img : {
      textAlign: "center"
    },
  }

  return (
    <Box>
      <Box {...compProps}>
        <img src="http://books.google.com/books/content?id=OtH1wAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"/>
      </Box>
      <Typography>ファスト&スロー</Typography>
      <Typography>200ページ</Typography>
    </Box>
  );
}

export default templateCard;