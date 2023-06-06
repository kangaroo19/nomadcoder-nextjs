import { useState,useEffect } from 'react'
import Seo from '../../components/Seo'
import Link from 'next/link';
import { useRouter } from 'next/router';




interface Movie {
  id: number;
  original_title: string;
  poster_path:string;
}

export default function Home() {
  const router=useRouter()
  const onClick=(id:number,title:string)=>{
    router.push(`/movies/${title}/${id}`,)
  }
  const [movies, setMovies] = useState<Movie[] | null>(null);
    useEffect(() => {
        (async () => {
          const { results } = await (
            await fetch(
              "/api/movies"
            )
          ).json();
          const filteredMovies = results.map((movie: Movie) => ({
            id: movie.id,
            original_title: movie.original_title,
            poster_path:movie.poster_path
          }));
          
          setMovies(filteredMovies);
        })();
      }, []);
  return (
    <div className="container">
      <Seo title="Home" />
      {movies === null && <h4>Loading...</h4>}
      {movies?.map((movie:Movie) => ( //moives에 데이터 없으면 아래코드 동작안함
    
          <div className="movie" key={movie.id}>
            <img onClick={()=>onClick(movie.id,movie.original_title)} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <Link href={`/movies/${movie.original_title}/${movie.id}`} 
                  as={`/movies/${movie.id}`}>
                <h4>{movie.original_title}</h4>
            </Link>
          </div> 
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}
//nextjs 13 부터는 useEffect를 사용하여 데이터를 가져오는 경우, 초기 렌더링 시 클라이언트 측에서 실행되지 않을 수 있습니다
//그렇기 때문에 movies 상태가 빈 배열인 경우에도 Loading... 메시지가 표시되지 않는 것입니다.
// 해결 방법으로는 movies 상태의 초기값을 null로 설정하고, 조건부 렌더링을 수정하여 movies가 null이거나 비어있는 경우에 Loading... 메시지를 표시하도록 변경할 수 있습니다.
export async function getServerSideProps() { //서버측에서 실행되는 함수,이름은 고정
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}

//이 방식(SSR)로 사용하려면 home컴포넌트에 results 프롭 넣어서 처리

//SSR => getServerSideProps
//SSG => getStaticProps