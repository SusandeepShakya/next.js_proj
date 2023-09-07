import Link from 'next/link'

const notFound = () => {
    return (
        <main className="text-center">
            <h2 className="text-3xl">You have hit a wall.</h2>
            <p>We could not find the page you were looking for.</p>
            <p>Go back to the <Link href="/">dashboard</Link>.</p>
        </main>
    )
}

export default notFound