import React, { ReactElement } from 'react';
import { Error, Layout } from '@/components';
import { NextPageWithLayout } from 'types/page';

const Offline: NextPageWithLayout = () => (
  <Error code='Offline' info='you are currently offline' />
);

Offline.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Offline;
