import React, { memo } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { usePaginationStore } from '@/stores/pagination';
import { useCount } from './hooks';
import { PaginationConfig } from '@/config/pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 2,
    borderTop: `1px solid ${
      theme.palette.type === 'dark' ? '#515151' : '#e0e0e0'
    }`,
    borderBottomRightRadius: '4px',
    borderBottomLeftRadius: '4px',
  },
}));

const Pagination = () => {
  const cls = useStyles();
  const { page, perPage, changePage, changePerPage } = usePaginationStore();
  const count = useCount();
  return (
    <TablePagination
      className={cls.root}
      rowsPerPageOptions={PaginationConfig.perPageOptions}
      component="div"
      count={count}
      rowsPerPage={perPage}
      page={page}
      labelRowsPerPage="Per page"
      onChangePage={(_e, p) => changePage(p)}
      onChangeRowsPerPage={(e) => changePerPage(Number(e.target.value))}
    />
  );
}
export default memo(Pagination);
