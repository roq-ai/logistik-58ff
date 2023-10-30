import { ChatProvider, RoqProvider as RoqProviderMain } from '@roq/nextjs';
import { clientConfig } from 'config';
import { FC, ReactNode } from 'react';
import { useChakraThemeContext } from 'styles/provider/theme-provider';
import { roqTheme } from 'styles/roq';
import { RoqClientProvider } from 'lib/roq';

export const RoqProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { name } = useChakraThemeContext();
  const theme = roqTheme[name] || roqTheme.light;
  return (
    <RoqProviderMain
      config={{
        host: clientConfig.roq.platformURL,
        auth: {
          useRoqAuth: true,
        },
      }}
      theme={theme}
    >
      <ChatProvider>
        <RoqClientProvider backendHost={clientConfig.roq.backendUrl} platformHost={clientConfig.roq.platformURL}>
          {children}
        </RoqClientProvider>
      </ChatProvider>
    </RoqProviderMain>
  );
};
