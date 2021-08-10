import Head from 'next/head'
import Image from 'next/image'
import Loader from "../components/Loader";
import Footer from "../components/Footer";

export default function About() {
    return (
        <div>
            <h1>About</h1>
            <Loader/>
            <Footer/>
        </div>
    )
}
