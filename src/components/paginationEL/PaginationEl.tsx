import { MediaQuery, Pagination } from '@mantine/core';

export const PaginationEl = (props: {
  activePage: number;
  pageOnChange: (value: number) => void;
  total: number;
  siblings: number;
}) => {
  const handlePageOnChange = (value: number) => {
    props.pageOnChange(value);
  };

  return (
    <>
      <MediaQuery query="(max-width: 390px)" styles={{ display: 'none' }}>
        <Pagination
          value={props.activePage}
          onChange={handlePageOnChange}
          total={props.total}
          siblings={props.siblings}
        />
      </MediaQuery>

      <MediaQuery query="(min-width: 391px)" styles={{ display: 'none' }}>
        <Pagination
          value={props.activePage}
          onChange={handlePageOnChange}
          total={props.total}
          siblings={props.siblings}
          size="sm"
        />
      </MediaQuery>
    </>
  );
};
