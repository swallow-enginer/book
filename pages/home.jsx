import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import AppConst from "~/src/lib/appConst";

const home = function Home() {
  const compProps = {
    root : {
      display:"flex",
      flexDirection: "column",
      m:"auto",
      width: "500px"
    },

    avatar : {
      src : "/book.png",
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
    },
    loginButton: {
      variant: "outlined",
      color: "primary",
    },
  }
  return (
      <Box {...compProps.root}>
        <Box textAlign="center">
          <Typography {...compProps.text}>読んだ本を登録しよう！</Typography>
          <Box><Avatar {...compProps.avatar} /></Box>
          <Typography {...compProps.text}>登録した本は重さや高さに変換できます</Typography>
        </Box>
        <Divider />
        <Box>
          <Typography {...compProps.subTitle}y>重さ</Typography>
          <Typography {...compProps.text}>100ページ⇒{AppConst.PER_PAGE.WEIGHT * 100}g</Typography>

          <Typography {...compProps.subTitle}>高さ</Typography>
          <Typography {...compProps.text}>100ページ⇒{AppConst.PER_PAGE.HEIGHT * 100}mm</Typography>
        </Box>

        <Divider />
        
        <Button {...compProps.signUpButton}>アカウント作成</Button>

        <Divider />

        <Button {...compProps.loginButton}>ログイン</Button>
      </Box>

  )
}

export default home;