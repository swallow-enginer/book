import React from 'react';
import Box from '@material-ui/core/Box';
import TemplateCard from "@comp/templateCard";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    marginTop: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const compProps = {
    gridItem: {
      item         : true,
      space        : 5,
      xs           : 12,
      md           : 6,
      lg           : 3,
      className    : classes.gridItem
    }
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        <h2>{props.title}</h2>
      </Box>
      <Grid container spacing={1}>
        {props.templateList.map(item =>
          <Grid {...compProps.gridItem} key={item.templateId}>
            <TemplateCard 
              templateParam={item}
              />
          </Grid>
        )}
      </Grid>
    </>
  );
}
