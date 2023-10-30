import AppLayout from 'layout/app-layout';
import React, { useMemo } from 'react';
import { Text, Box, Spinner, Link, Stack, Flex, Center, List } from '@chakra-ui/react';
import { Error } from 'components/error';
import { useRouter } from 'next/router';
import format from 'date-fns/format';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import Breadcrumbs from 'components/breadcrumb';
import { FormWrapper } from 'components/form-wrapper';
import { FormListItem } from 'components/form-list-item';
import { compose } from 'lib/compose';
import { useAuthorizedFetcher } from 'lib/hooks/use-authorized-fetcher';
import { convertQueryToPrismaUtil } from 'lib/utils';
import { useUserFindFirst } from 'lib/roq';

function UserViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const queryParams = useMemo(
    () =>
      convertQueryToPrismaUtil(
        {
          relations: [],
          id,
        },
        'user',
      ),
    [id],
  );
  const { data, error, isLoading } = useUserFindFirst(queryParams, {}, { disabled: !id });
  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Users',
              link: '/users',
            },
            {
              label: 'User Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper>
              <Stack direction="column" spacing={2} mb={4}>
                <Text
                  sx={{
                    fontSize: '1.875rem',
                    fontWeight: 700,
                    color: 'base.content',
                  }}
                >
                  User Details
                </Text>
              </Stack>
              <List
                w="100%"
                css={{
                  '> li:not(:last-child)': {
                    borderBottom: '1px solid var(--chakra-colors-base-300)',
                  },
                }}
              >
                <FormListItem label="Email:" text={data?.email} />

                <FormListItem label="First Name:" text={data?.firstName} />

                <FormListItem label="First Name:" text={data?.lastName} />

                <FormListItem
                  label="Created At:"
                  text={data?.created_at ? format(data?.created_at, 'dd-MM-yyyy') : ''}
                />

                <FormListItem
                  label="Updated At:"
                  text={data?.updated_at ? format(data?.updated_at, 'dd-MM-yyyy') : ''}
                />
              </List>
            </FormWrapper>
          </>
        )}
      </Box>
    </AppLayout>
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
)(UserViewPage);
