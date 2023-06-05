import Link from "next/link"
import { useRouter } from "next/router"
import styles from './NavBar.module.css'


export default function NavBar(){
    const router=useRouter()

    return (
        <nav className={styles.nav}>
            <img className={styles.img} src="/vercel.svg" />
            <div>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </div>
        </nav>
    )
}
