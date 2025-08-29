export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/staking',
      permanent: false
    }
  };
}

export default function Home() {
  return null;
}
