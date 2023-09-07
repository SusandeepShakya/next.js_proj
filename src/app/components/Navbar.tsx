import Image from 'next/image'
import Link from 'next/link'
import logo from './smiling_face_with_horns.gif'

const Navbar = () => {
    return (
        <nav>
            <Image src={logo} alt="next js Project" />
            <h1> Next. Js Project</h1>
            <Link href="/">Dashboard</Link>
            <Link href="/tickets">Tickets</Link>
            <Link href="/create">Create Tickets</Link>

        </nav>
    )
}

export default Navbar