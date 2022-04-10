import React, { ReactElement } from 'react';
import { NextPageWithLayout } from 'types/page';
import { Layout, UnderConstruction } from '@/components';

const About: NextPageWithLayout = () => {
  return <UnderConstruction />;
};

About.getLayout = (page: ReactElement) => (
  <Layout className='py-14' wide allowAll>
    {page}
  </Layout>
);

export default About;
