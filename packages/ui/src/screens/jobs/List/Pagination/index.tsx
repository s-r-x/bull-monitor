import React, { memo } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { usePaginationStore } from '@/stores/pagination';
import { useCount } from './hooks';
import { PaginationConfig } from '@/config/pagination';
import makeStyles from '@mui/styles/makeStyles';
import { useAtom } from 'jotai';
import { activePageAtom } from '@/atoms/workspaces';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 2,
    borderTop: `1px solid ${
      theme.palette.mode === 'dark' ? '#515151' : '#e0e0e0'
    }`,
    borderBottomRightRadius: '4px',
    borderBottomLeftRadius: '4px',
  },
}));

const Pagination = () => {
  const cls = useStyles();
  const [page, changePage] = useAtom(activePageAtom);
  const { perPage, changePerPage } = usePaginationStore();
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
      onPageChange={(_e, p) => changePage(p)}
      onRowsPerPageChange={(e) => changePerPage(Number(e.target.value))}
    />
  );
};
export default memo(Pagination);
