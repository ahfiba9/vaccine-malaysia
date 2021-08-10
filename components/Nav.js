import {useRouter} from "next/router";

export const Nav = () => {
    const router = useRouter()

    const nationalTabCustomStyle = router.pathname === '/' ? 'bg-green-500' : ''
    const stateTabCustomStyle = router.pathname === '/states' ? 'bg-green-500' : ''

    return (
        <nav className={'bg-gray-600 px-8 shadow-md'}>
            <div className={"flex justify-center"}>
                <a className={`no-underline text-gray-200 hover:bg-green-400 border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-4 px-3 ${nationalTabCustomStyle}`}
                      href={'/'}>
                    National
                </a>
                <a className={`no-underline text-gray-200 border-b-2 hover:bg-green-400 border-transparent uppercase tracking-wide font-bold text-xs py-4 px-6 ${stateTabCustomStyle}`}
                   href={"/states"}>
                    State
                </a>
            </div>
        </nav>
    )
}