import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { usePaginationStore } from '@/stores/pagination';
import { useCount } from './hooks';
import { PaginationConfig } from '@/config/pagination';

export default function Pagination() {
  const { page, perPage, changePage, changePerPage } = usePaginationStore();
  const count = useCount();
  return (
    <TablePagination
      style={{
        position: 'sticky',
        bottom: 0,
      }}
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
