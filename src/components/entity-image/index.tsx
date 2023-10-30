import { Box, Image } from '@chakra-ui/react';
import { useSession } from '@roq/nextjs';
import { useRoqPlatformFiles } from 'lib/roq';
import { useMemo } from 'react';

interface EntityImageProps {
  entity: string;
  entityId: string;
}
export function EntityImage(props: EntityImageProps) {
  const { entity, entityId } = props;
  const { session } = useSession();
  const { data: filesQuery, mutate } = useRoqPlatformFiles(
    {
      filter: {
        fileCategory: { equalTo: 'USER_FILES' },
        createdByUserId: { equalTo: session?.roqUserId },
        ...(entity && {
          entityName: { equalTo: entity },
        }),
        ...(entityId && {
          entityReferences: { equalTo: entityId },
        }),
      },
      withCreatedByUser: true,
    },
    {
      disabled: !session?.roqUserId,
    },
  );
  const src = useMemo(() => filesQuery?.files?.data?.[0]?.url, [filesQuery]);

  if (!src) {
    return null;
  }

  return (
    <Box mb={5} w="full">
      <Image src={src} alt="" height="182px" width="100%" objectFit="cover" borderRadius="5px" />
    </Box>
  );
}
