import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router"; // permite usar el push
import PageLayaout from "./components/PageLayout";
//conponente de Next que permite optimizar las images
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ articles }) {
  const router = useRouter();

  //al hacer la carga de datos de esta forma al desactivar js tampoco se muestra nada
  //asi que ahora los datos los vamos a recibir por props
  // const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     `https://newsapi.org/v2/everything?q=tesla&from=2022-11-09&sortBy=publishedAt&apiKey=dc07cf1e6d9549cfa12aad58aaa925c7`
  //   )
  //     .then((res) => res.json())
  //     .then((response) => {
  //       const { articles } = response;
  //       setArticles(articles);
  //     });
  // }, []);
  return (
    <PageLayaout title={"Bienvenidos"}>
      <div className={`${styles.container} flex flex-col items-center  gap-8`}>
        {/* al pasar por props articles ya no seria necesario preguntar si tiene longitus ya  
        que este, existiria o no existiria
        {articles.length === 0 && <p>Loading ...</p>} */}
        {articles.length === 0 && <p>NO exist news</p>}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <article
              key={index}
              className="mb-8 w-1/2 flex flex-col items-center"
            >
              <h2 className="text-3xl">{article.title}</h2>
              {/* con este componente es necesario indicarle el width y height 
              Por otro lado tambien se debe especificar de donde estamos recibiendo las images
              Servel propone esto para evitar que tengamos algo malicioso "ponele"(concepto a profundizar)
              modificar:  next.config.js
              */}
              <Image
                alt={`image for the article ${article.title}`}
                className="w-full"
                src={article.urlToImage}
                //src="https://www.reuters.com/resizer/lq3-zSfs5YLOd6NkvPQ5wPam5qc=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/TFJEVGNY7JK4ZDCPNSSUMWYX6Y.jpg"
                width={300}
                height={300}
              />
              <p>{article.description}</p>
            </article>
          ))}

        <Link href="/About">ir a About</Link>
        {/* No recomendado navegar asi ya que estamos usando un boton*/}
        {/* <button
          onClick={() => {
            router.push("/article/2");
          }}
        > 
          Navegar de forma pragmatica
        </button>*/}
      </div>
    </PageLayaout>
  );
}

//hacemos el fetching de esta manera para que cuando se renderize home, ya tenga los articulos, es decir se ejecuta en
//el servidor, pero tambien podria ejecutarse en el cliente
// HACE UNA PETICION AL SERVIDOR CADA VEZ QUE SE HAGA UNA REQUEST A ESTA PAGINA
//-N REQUEST => SE EJECUTA N VECES
//-PARA DATOS QUE NESECITAS QUE SEAN MUY LIVE
//-TIENE DEMACIADOS DATOS DINAMICOS

// export async function getServerSideProps() {
//   const response = await fetch(
//     `https://newsapi.org/v2/everything?q=tesla&from=2022-11-09&sortBy=publishedAt&apiKey=dc07cf1e6d9549cfa12aad58aaa925c7`
//   );
//   const { articles } = await response.json();
//   return {
//     props: {
//       articles,
//     },
//   };
// }

//Forma estatica
//HACE LA PETICION UNA SOLA VEZ Y LUEGO PRERENDERIZA YA CON LOS DATOS
//N request -> se ejecuta 1 vez en build time (o para refrescar la pagina)
export async function getStaticProps() {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=dc07cf1e6d9549cfa12aad58aaa925c7`
  );
  const { articles } = await response.json();
  return {
    props: {
      articles,
    },
  };
}
