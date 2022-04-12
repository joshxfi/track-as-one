import React from 'react';
import { NextPageWithLayout } from 'types/page';
import { Layout, Markdown } from '@/components';
import { privacyPolicy } from '@/utils/contents';

const PrivacyPolicy: NextPageWithLayout = () => {
  return <Markdown content={privacyPolicy} />;
};

PrivacyPolicy.getLayout = (page: React.ReactElement) => (
  <Layout className='py-20'>{page}</Layout>
);

export default PrivacyPolicy;
