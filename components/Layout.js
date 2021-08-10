import {Nav} from "./Nav";
import {Header} from "./Header";
import Footer from "./Footer";

export const Layout = ({children}) => {
    return (
        <>
            <Nav/>
            <div className={"bg-gray-200"}>
                <main className={"container mx-auto mac-w-xl pt-8 min-h-screen"}>
                    <Header/>
                    {children}
                    <Footer/>
                </main>
            </div>

        </>
    )

}