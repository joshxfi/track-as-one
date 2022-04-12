import React from 'react';
import { NextPageWithLayout } from 'types/page';
import { Layout, Markdown } from '@/components';
import { codeOfConduct } from '@/utils/contents';

const CodeOfConduct: NextPageWithLayout = () => {
  return <Markdown content={codeOfConduct} />;
};

CodeOfConduct.getLayout = (page: React.ReactElement) => (
  <Layout className='py-20'>{page}</Layout>
);

export default CodeOfConduct;
