import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import AppConst from "~/src/lib/appConst";

const home = function Home() {
  const router = useRouter();
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(3),
      "& > *" : {marginBottom: theme.spacing(3)}
    },
    avatar_root: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  const classes = useStyles();

  const compProps = {
    root : {
      display:"flex",
      flexDirection: "column",
      m:"auto",
      width: "500px",
      className: classes.root,
    },

    box_intro: {
      className: classes.root,
      textAlign:"center",
    },

    avatar : {
      src : "/book.png",
      classes: {
        root:classes.avatar_root
      }
    },

    subTitle : {
      variant: "h4",
      color: "textSecondary",
    },

    text: {
      color: "textSecondary",
    },

    signUpButton: {
      variant: "contained",
      color: "primary",
      disableElevation: true,
      onClick: () => router.push(AppConst.API.LOGIN),
    },
    loginButton: {
      variant: "outlined",
      color: "primary",
      onClick: () => router.push(AppConst.API.LOGIN),
    },
  }
  return (
      <Box {...compProps.root}>
        <Box {...compProps.box_intro}>
          <Typography {...compProps.text}>読んだ本を登録しよう！</Typography>
          <Avatar {...compProps.avatar} />
          <Typography {...compProps.text}>登録した本は重さや高さに変換できます</Typography>
        </Box>

        <Box><Divider/></Box>

        <Box>
          <Typography {...compProps.subTitle}y>重さ</Typography>
          <Box pl={3}><Typography {...compProps.text}>100ページ⇒{AppConst.PER_PAGE.WEIGHT * 100}g</Typography></Box>
        </Box>

        <Box>
          <Typography {...compProps.subTitle}>高さ</Typography>
          <Box pl={3}><Typography {...compProps.text}>100ページ⇒{AppConst.PER_PAGE.HEIGHT * 100}mm</Typography></Box>
        </Box>

        <Divider/>
        
        <Button {...compProps.signUpButton}>アカウント作成・ログイン</Button>
      </Box>

  )
}

export default home;