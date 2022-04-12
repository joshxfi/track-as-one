import React, { useMemo } from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar, Footer, LoaderHandler, Error } from '@/components';

interface LayoutProps extends NextSeoProps {
  className?: string;
  loaders?: boolean[];
  wide?: boolean;
  allowAll?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  className,
  loaders,
  wide,
  allowAll,
  children,
  ...rest
}) => {
  const { user, loading } = useAuth();

  const display = useMemo(() => {
    if (user || allowAll) return children;
    if (!loading) <Error code='401' info='you are not authenticated' />;
    return <div />;
  }, [user, allowAll, children]);

  return (
    <>
      <NextSeo {...rest} />
      <div className='bg-gradient-to-tr from-[#F2F1DD] to-f9'>
        <LoaderHandler loaders={loaders}>
          <Navbar />
          <main
            className={`mx-auto min-h-screen w-[90%] text-primary ${
              wide ? 'max-w-screen-xl' : 'max-w-screen-md'
            }  ${className}`}
          >
            {display}
          </main>
          <Footer />
        </LoaderHandler>
      </div>
    </>
  );
};

export default Layout;
