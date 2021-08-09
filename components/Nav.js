
export const Nav = () => {
    return (
        <nav className={'bg-white px-8 pt-2 shadow-md'}>
            <div className={"-mb-px flex justify-center"}>
                <a className="no-underline text-green-500 hover:bg-green-200 border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8 px-3"
                      href={'/'}>
                    National
                </a>
                <a className="no-underline text-grey-dark border-b-2 hover:bg-green-500 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8 px-3"
                   href={"/state"}>
                    State
                </a>
                <a className="no-underline text-grey-dark border-b-2 hover:bg-green-500 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8 px-3"
                   href={'/about'}>
                    About
                </a>
            </div>
        </nav>
    )
}