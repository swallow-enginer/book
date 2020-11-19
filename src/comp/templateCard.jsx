import React, {useState} from 'react';
import BookEntryDialog  from "@comp/bookShowDialog";
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
import Link from '@material-ui/core/Link';
import appConst from '@lib/appConst';

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

    /** 画面パラメータ */
    const [pageProps, setPageProps] = useState({
      bookShowDialogOpen: false,
    });

  /**
   * コンポーネントに渡す引数
   */
  const compProps = {
    img : {
      textAlign: "center"
    },
    bookShowDialog: {
      open : pageProps.bookShowDialogOpen,
      onClose: () => setPageProps({...pageProps, bookShowDialogOpen: false}),
      onSave: () => setPageProps({...pageProps, bookShowDialogOpen: false})
    },
    showLink: {
      href: "#",
      onClick: () => setPageProps({...pageProps, bookShowDialogOpen: true})
    }
  }

  return (
    <Box>
      <Link {...compProps.showLink}>
        <img src="http://books.google.com/books/content?id=OtH1wAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"/>
      </Link>
      <Typography>
        <Link {...compProps.showLink}>
          ファスト&スロー
        </Link>
      </Typography>
      <Typography>200ページ</Typography>
      <BookEntryDialog {...compProps.bookShowDialog} />
    </Box>
  );
}

export default templateCard;