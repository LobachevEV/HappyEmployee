import React from "react";
import {
  createStyles,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {lighten} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%"
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export interface IColumn {
  title: string,
  format: (item: any) => any;
}

interface ITableProps {
  title?: string
  columns: IColumn[],
  items: any[],
  actions?: React.ReactNode[]
  onEditRow?: (item: any) => any
  onDeleteRow?: (item: any) => any
}

const RichTable = (props: ITableProps) => {
  const {title, items, columns, actions, onEditRow, onDeleteRow} = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={3}/>
      <Grid item xs={6}>
        <TableTitle title={title || ""}>
          {actions}
        </TableTitle>
        <Table className='table table-striped'>
          <TableHead>
            <TableRow>
              {columns && columns.map(col => <TableCell>{col.title}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {items && items.map(item => <TableRow key={item.id} hover>
                {columns.map(col => <TableCell key={col.title}
                                               onClick={() => onEditRow && onEditRow(item)}>{col.format(item)}</TableCell>)}
                {onDeleteRow && <TableCell>
                    <IconButton aria-label="delete" className={classes.margin} onClick={() => onDeleteRow(item)}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </TableCell>}
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
      </Grid>
    </React.Fragment>
  );
};

const toolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light' ? {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    } : {color: theme.palette.text.primary, backgroundColor: theme.palette.secondary.dark,},
  spacer: {
    flex: '1 1 0%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const TableTitle = (props: { title: string, children?: React.ReactNode }) => {
  const classes = toolbarStyles();
  return <Toolbar className={classes.root}>
    <div className={classes.title}>
      <Typography variant="h6" id="tableTitle">
        {props.title}
      </Typography>
    </div>
    <div className={classes.spacer}/>
    <div className={classes.actions}>
      {props.children}
    </div>
  </Toolbar>
};

export default RichTable
