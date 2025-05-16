export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/governance',
      permanent: false
    }
  };
}

export default function Home() {
  return null;
}
