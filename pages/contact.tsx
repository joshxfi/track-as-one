import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@/types/page';
import { Layout, UnderConstruction } from '@/components';

const Contact: NextPageWithLayout = () => {
  return <UnderConstruction />;
};

Contact.getLayout = (page: ReactElement) => (
  <Layout className='py-14' wide allowAll>
    {page}
  </Layout>
);

export default Contact;
