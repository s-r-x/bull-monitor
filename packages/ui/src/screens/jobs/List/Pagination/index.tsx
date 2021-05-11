import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { usePaginationStore } from '@/stores/pagination';
import { useCount } from './hooks';
import { PaginationConfig } from '@/config/pagination';
import { useThemeStore } from '@/stores/theme';

export default function Pagination() {
  const { page, perPage, changePage, changePerPage } = usePaginationStore();
  const theme = useThemeStore((state) => state.theme);
  const count = useCount();
  const stickyPagination = {
    dark: {
      bg: '#424242',
      border: '#515151',
    },
    light: {
      bg: '#fff',
      border: '#e0e0e0',
    },
  };

  return (
    <TablePagination
      style={{
        position: 'sticky',
        bottom: 0,
        borderTop: `1px solid ${stickyPagination[theme].border}`,
        backgroundColor: stickyPagination[theme].bg,
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
