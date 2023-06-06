import { useRouter } from "next/router"
import Seo from "../../../components/Seo"

interface DetailProps {
    title:string;
    id:string;
  }

export default function Detail({ title, id }: DetailProps){
  const router = useRouter()
  return (
    <div>
      <Seo title={title}/>
      <h4>{title || 'loading'}</h4>
      <h4>{id || 'loading'}</h4>

    </div>
  )
}

export async function getServerSideProps({ params }: any) {
    const [title, id] = params.params;
    return {
      props: { title, id },
    };
  }