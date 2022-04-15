import React from 'react';
import { theProject } from '@/utils/contents';
import { Layout, Markdown } from '@/components';
import { NextPageWithLayout } from 'types/page';

const TheProject: NextPageWithLayout = () => {
  return <Markdown content={theProject} />;
};

TheProject.getLayout = (page: React.ReactElement) => (
  <Layout allowAll className='py-20'>
    {page}
  </Layout>
);

export default TheProject;
