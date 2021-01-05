import { useRouter } from 'next/router'
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import AppConst from "~/src/lib/appConst";

export default function TemporaryDrawer(props) {
  const router = useRouter();
  const drawer_list = [
    {
      title : "ログアウト",
      url   : AppConst.API.LOGOUT,
      icon  : <LogoutIcon />,
    },
  ]

  const toggleDrawer = (open) => (event) => {
    props.setPageProps((pageProps) => {return {...pageProps, sideBarDrawerOpen: open}})
  };

  return (
    <Drawer anchor={"left"} open={props.open} onClose={toggleDrawer(false)}>
      <div onClick={toggleDrawer(false)}>
        <List>
          {drawer_list.map((value) => (
            <ListItem 
              button
              key={value.title}
              onClick={() => router.push(value.url)}>
              
              <ListItemIcon>{value.icon}</ListItemIcon>
              <ListItemText primary={value.title} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
