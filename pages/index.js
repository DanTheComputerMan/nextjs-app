import Head from 'next/head';
import CalcOutline from '../Components/CalcOutline';
import style from 'styled-components';

import classes from "../Components/StyledElements/Grid.module.css";

function Home() {
  return (
    <div>
      <Head>
        <title>Calculator App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/0.15.0/math.min.js" />
        <script>
          
        </script>
      </Head>
      
      <CalcOutline className={classes.grid}/>
      
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </div>
  )
}

export default Home;