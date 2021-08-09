import {Nav} from "./Nav";
import {Header} from "./Header";

export const Layout = ({children}) => {
    return (
        <>
            <Nav/>
            <div className={"bg-white-300"}>
                <main className={"container mx-auto mac-w-xl pt-8 min-h-screen"}>
                    <Header/>
                    {children}
                </main>
            </div>

        </>
    )

}