import React from "react";
import {
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {lighten} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
  total: number,
  page: number,
  rowsPerPage: number,
  onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void
  onChangeRowsPage: (newRowsPerPage: number) => void
  actions?: React.ReactNode[]
  onEditRow?: (item: any) => any
  onDeleteRow?: (item: any) => any
}

const RichTable = (props: ITableProps) => {
  const {title, items, rowsPerPage, onChangeRowsPage, columns, page, onChangePage, total, actions, onEditRow, onDeleteRow} = props;
  const classes = useStyles();  
  return (
    <Paper className={classes.root}>
      <TableTitle title={title || ""}>
        {actions}
      </TableTitle>
      <Table className='table table-striped'>
        <TableHead>
          <TableRow>
            {columns && columns.map(col => <TableCell>{col.title}</TableCell>)}
            {(onEditRow || onDeleteRow) && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items && items.map(item => <TableRow key={item.id}>
              {columns.map(col => <TableCell>{col.format(item)}</TableCell>)}
              {onEditRow && <TableCell>
                  <IconButton aria-label="edit" className={classes.margin} onClick={()=>onEditRow(item)}>
                      <EditIcon fontSize="small"/>
                  </IconButton>
              </TableCell>}
              {onDeleteRow && <TableCell>
                  <IconButton aria-label="delete" className={classes.margin} onClick={()=>onDeleteRow(item)}>
                      <DeleteIcon fontSize="small"/>
                  </IconButton>
              </TableCell>}
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
         
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={total}
              page={page}
              rowsPerPage={rowsPerPage}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}/>
         
        </TableFooter>
      </Table>
    </Paper>
  );

  function handleChangePage(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) {
    onChangePage && onChangePage(event, newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const newValue = parseInt(event.target.value, 10);
    onChangeRowsPage && onChangeRowsPage(newValue);
  }
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
