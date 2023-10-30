import { Box, Text, Flex, TextProps } from '@chakra-ui/react';
import { UserInterface } from 'interfaces/user';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { useRouter } from 'next/router';
import { SearchInput } from 'components/search-input';
import Table from 'components/table';
import { useMemo } from 'react';
import { ListDataFiltersType, useDataTableParams } from 'components/table/hook/use-data-table-params.hook';
import { compose } from 'lib/compose';
import { ColumnDef } from '@tanstack/react-table';
import { withAppLayout } from 'lib/hocs/with-app-layout.hoc';
import { AccessInfo } from 'components/access-info';
import { useUserFindManyWithCount } from 'lib/roq';
import { convertQueryToPrismaUtil } from 'lib/utils';

type ColumnType = ColumnDef<UserInterface, unknown>;

interface UserListPageProps {
  filters?: ListDataFiltersType;
  pageSize?: number;
  hidePagination?: boolean;
  showSearchFilter?: boolean;
  titleProps?: TextProps;
  hideTableBorders?: boolean;
}

function UserListPage(props: UserListPageProps) {
  const { showSearchFilter = true, titleProps = {}, hidePagination, hideTableBorders, pageSize } = props;
  const { onSearchTermChange, params, onPageChange, onPageSizeChange, setParams } = useDataTableParams({
    filters: {},
    searchTerm: '',
    pageSize,
    order: [
      {
        desc: true,
        id: 'created_at',
      },
    ],
  });

  const queryParams = useMemo(
    () =>
      convertQueryToPrismaUtil(
        {
          searchTerm: params.searchTerm,
          searchTermKeys: ['email.contains'],
          ...params.filters,
        },
        'user',
      ),
    [params.searchTerm, params.filters, params.pageNumber, params.order, params.pageSize],
  );
  const { data, error, isLoading, mutate } = useUserFindManyWithCount({
    skip: params.pageNumber * params.pageSize,
    take: params.pageSize,
    orderBy: {
      created_at: 'desc',
    },
    ...queryParams,
  });

  const router = useRouter();
  const columns: ColumnType[] = [
    { id: 'email', header: 'email', accessorKey: 'email' },
    { id: 'firstName', header: 'firstName', accessorKey: 'firstName' },
    { id: 'lastName', header: 'lastName', accessorKey: 'lastName' },
  ];
  const handleView = (data: UserInterface) => {
    router.push(`/users/view/${data.id}`);
  };
  return (
    <Flex direction="column" gap={{ md: 6, base: 7 }} shadow="none">
      <Flex justifyContent="space-between">
        <Flex alignItems="center" gap={1}>
          <Text
            as="h1"
            fontSize={{ md: '1.875rem', base: '1.5rem' }}
            fontWeight="bold"
            color="base.content"
            {...titleProps}
          >
            Users
          </Text>
          <AccessInfo entity="user" />
        </Flex>
      </Flex>
      {showSearchFilter && (
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'flex-start', md: 'space-between' }}
          gap={{ base: 2, md: 0 }}
        >
          <Box>
            <SearchInput value={params.searchTerm} onChange={onSearchTermChange} />
          </Box>
        </Flex>
      )}
      {error && (
        <Box>
          <Error error={error} />
        </Box>
      )}
      <>
        <Table
          hidePagination={hidePagination}
          hideTableBorders={hideTableBorders}
          isLoading={isLoading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          columns={columns}
          data={data?.data}
          totalCount={data?.count || 0}
          pageSize={params.pageSize}
          pageIndex={params.pageNumber}
          order={params.order}
          setParams={setParams}
          onRowClick={handleView}
        />
      </>
    </Flex>
  );
}
export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'user',
    operation: AccessOperationEnum.READ,
  }),
  withAppLayout(),
)(UserListPage);
