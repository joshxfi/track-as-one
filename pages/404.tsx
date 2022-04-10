import React, { ReactElement } from 'react';
import { Error, Layout } from '@/components';
import { NextPageWithLayout } from 'types/page';

const Error404: NextPageWithLayout = () => (
  <Error code='404' info='page not found' />
);

Error404.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Error404;
