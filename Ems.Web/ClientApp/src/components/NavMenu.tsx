import React from 'react';
import {AppBar, Button, createStyles, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(4)
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TestApp
          </Typography>
          <Button color="inherit" href="/Employees">Employees</Button>
          <Button color="inherit" href="/Grades">Grades</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;
