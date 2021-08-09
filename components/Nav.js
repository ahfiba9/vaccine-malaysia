import Link from 'next/link'

export const Nav = () => {
    return (
        <nav className={'bg-white px-8 pt-2 shadow-md'}>
            <div className={"-mb-px flex justify-center"}>
                <a className="no-underline text-red-800 border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8"
                      href={'/'}>
                    Home
                </a>
                <a className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
                   href="#">
                    State
                </a>
                <a className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
                   href="#">
                    State
                </a>
                <a className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
                   href={'/about'}>
                    About
                </a>
            </div>
        </nav>
    )
}