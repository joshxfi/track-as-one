import React from 'react';
import { Error, Layout } from '@/components';

const Error404 = () => {
  return (
    <Layout>
      <Error code='404' info='page not found' />
    </Layout>
  );
};

export default Error404;
