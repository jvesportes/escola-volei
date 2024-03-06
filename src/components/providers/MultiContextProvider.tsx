import React, { ReactNode } from 'react';

type ProviderProps = {
  children: ReactNode;
};

type ContextProvider = React.ComponentType<ProviderProps>;

const MultiContextProvider = ({
  providers,
  children,
}: {
  providers: ContextProvider[];
  children: ReactNode;
}) => {
  return providers.reduceRight((child, Provider) => {
    return <Provider>{child}</Provider>;
  }, children);
};

export default MultiContextProvider;
