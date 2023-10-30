/* eslint-disable */
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { RequestOptions, RoqClient } from './roq-sdk';
import { parse } from 'cookie';

interface RoqClientProviderProps {
  children: ReactNode;
  backendHost: string;
  platformHost: string;
  baseOptions?: RequestOptions;
}

const RoqClientContext = createContext<RoqClient | undefined>(undefined);

export const RoqClientProvider: React.FC<RoqClientProviderProps> = ({
  children,
  backendHost,
  platformHost,
  baseOptions,
}) => {
  const roqClient = useMemo(() => {
    let options = baseOptions;
    if (typeof window !== 'undefined') {
      const cookies = parse(document.cookie);
      if (cookies['roq-session-token']) {
        options = {
          ...baseOptions,
          headers: {
            Authorization: `Bearer ${cookies['roq-session-token']}`,
          },
        };
      }
    }
    return new RoqClient(backendHost, platformHost, options);
  }, [platformHost, backendHost, baseOptions]);

  return <RoqClientContext.Provider value={roqClient}>{children}</RoqClientContext.Provider>;
};

export const useRoqClient = () => {
  const roqClient = useContext(RoqClientContext);
  if (!roqClient) {
    throw new Error('useRoqClient must be used within a RoqClientProvider');
  }
  return roqClient;
};
