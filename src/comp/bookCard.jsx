import React, {useState} from 'react';
import BookEntryDialog  from "@comp/bookShowDialog";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const bookCard = (props) => {

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

  const getPageCount = (pageCount) => {
    if (pageCount) {
      return pageCount + "ページ"
    }
    return "ページ情報なし"
  }

  return (
    <Box>
      <Link {...compProps.showLink}>
        <img src={props.bookParam.imageLinks.smallThumbnail}/>
      </Link>
      <Typography>
        <Link {...compProps.showLink}>
        {props.bookParam.title}
        </Link>
      </Typography>
      <Typography>{props.bookParam.pageCount}ページ</Typography>
      <BookEntryDialog {...compProps.bookShowDialog} />
    </Box>
  );
}

export default bookCard;