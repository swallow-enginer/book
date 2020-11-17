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

const useStyles = makeStyles({
  root: {
    width: "85%"
  },
});

const templateCard = (props) => {
  const classes = useStyles();
  const router = useRouter();

  /**
   * テンプレートカードをクリックしたときの処理
   * @param {Event} e イベントオブジェクト
   */
  const onClickTemplateCard = (template_id) => {
    router.push({
      pathname: AppConst.URL.TEMPLATE_SHOW,
      query: { template_id: template_id },
    });
  }

  /**
   * コンポーネントに渡す引数
   */
  const compProps = {
    card : {
      className: classes.root
    },
    cardChip: {
      size: "small",
      label: props.templateParam.categoryNm,
      color: "secondary",
    },
    cardTitle : {
      variant   : "h5",
      component : "h2",
      noWrap    : true
    },
  }

  return (
    <Card {...compProps.card}>
      <CardActionArea onClick={() => onClickTemplateCard(props.templateParam.templateId)}>
      <CardContent>
        <Chip {...compProps.cardChip}/>
        <Typography {...compProps.cardTitle}>
          {props.templateParam.templateTitle}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}
// templateCard.propTypes = {
//   templateTitle: PropTypes.string, //テンプレートタイトル
//   templateId: PropTypes.number,    //テンプレートID
//   categoryNm: PropTypes.string,    //カテゴリー名
// }

export default templateCard;