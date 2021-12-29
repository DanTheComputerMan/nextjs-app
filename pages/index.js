import Head from 'next/head';
import CalcOutline from '../Components/CalcOutline';

function Home() {
  return (
    <div className="container">
      <Head>
        <title>Calculator App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CalcOutline />
      </main>
    </div>
  );
}

export default Home;