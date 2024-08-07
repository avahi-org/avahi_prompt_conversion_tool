/* eslint-disable import/no-extraneous-dependencies */
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

const Home = () => {
  return <></>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = nookies.get(ctx)?.token;

  if (accessToken) {
    return {
      redirect: {
        source: ctx.req.url,
        destination: `/auth`,
      },
      props: {},
    };
  }
  return {
    redirect: {
      source: ctx.req.url,
      destination: `/demo`,
    },
    props: {},
  };
};
