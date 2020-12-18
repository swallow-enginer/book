import { useRouter } from 'next/router'
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LogoutIcon from '@material-ui/icons/ExitToApp';

export default function TemporaryDrawer(props) {
  const router = useRouter();
  const drawer_list = [
    {
      title : "プロフィール",
      url   : "/profile",
      icon  : <InboxIcon />,
    },
    {
      title : "ログアウト",
      url   : "/api/logout",
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
