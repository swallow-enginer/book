import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import AppConst from "~/src/lib/appConst";

const index = function Index() {
  const router = useRouter();
  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: theme.spacing(3),
      backgroundColor: "#B5D6FF",
      "& > *" : {marginBottom: theme.spacing(3)}
    },
    avatar_root: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "150px",
      height: "150px",
    },
    button: {
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

    text: {
      color: "textPrimary",
      variant: "h6",
    },

    signUpButton: {
      variant: "contained",
      color: "primary",
      classes: {root:classes.button},
      onClick: () => router.push(AppConst.API.LOGIN),
    },
    loginButton: {
      variant: "outlined",
      color: "primary",
      classes: {root:classes.button},
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

        <Box>
          <img src="app.png" width="100%"/>
        </Box>

        <Button {...compProps.signUpButton}>アカウント作成・ログイン</Button>
      </Box>

  )
}

export default index;