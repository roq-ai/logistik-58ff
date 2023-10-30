import { clientConfig } from 'config';
import { CreateFileAssociationInterface } from 'interfaces/files';
import { fetcher } from 'lib/api-fetcher';

export const createFileAssociation = async (fileAssociation: CreateFileAssociationInterface) => {
  return fetcher(`${clientConfig.roq.backendUrl}/api/file-associations`, {
    method: 'POST',
    body: JSON.stringify(fileAssociation),
  });
};

export const deleteFileAssociation = async (fileId: string) => {
  return fetcher(`${clientConfig.roq.backendUrl}/api/file-associations`, {
    method: 'DELETE',
    body: JSON.stringify({ fileId }),
  });
};
