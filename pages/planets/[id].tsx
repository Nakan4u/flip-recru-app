import type { NextPage } from 'next'
import Head from 'next/head';
import axios from "axios";
import https from "https";
import Header from "../../components/Header/Header";
import OneCardInfo from "../../components/OneCardInfo/OneCardInfo";
import {getPlanets, getPlanetById} from "../../utils/api"


const Planet: NextPage = ({data}: any) => {
  return (<>
    <Head>
      <title>{data.name}</title>
      <meta name="description" content={`Star Wars Planet ${data.name} information`} />
    </Head>
    <Header/>
    <section className="one_planet_page">
      <div className="container">
        <div className="one_planet_wrap">
            <h1 className="one_planet_title">Information about planet - {data.name}</h1>
            <OneCardInfo cardInfo={data}/>
        </div>
      </div>
    </section>
  </>)
}

export default Planet;

export async function getStaticPaths() {
  const result: any = await getPlanets();
  if (!result) {
    return {
      notFound: true,
    }
  }
  const { count } = result.data;
  const paths = []
  for (let i = 1; i <= count; i++) {
    const dynamicPageParams = {
      params: {
        id: i.toString()
      }
    };
    paths.push(dynamicPageParams);
  }
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}: any) {
  const { id } = params;
  const result: any = await getPlanetById(id);
  if (!result) {
    return {
      notFound: true,
    }
  }
  const { data } = result;
  return {
    props: { data },
    revalidate: 3600 // one hour
  }
}
