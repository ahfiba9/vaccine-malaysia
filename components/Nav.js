import Link from 'next/link'

export const Nav = () => {
    return (
        <nav >
            <ul>
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/about'}>About</Link>

                </li>
            </ul>
        </nav>
    )
}