import useOnScreen from "../library/useOnScreen";
import Loader from "./Loader";
import {useRef} from "react";

const LoaderComponent = () => {

    const ref = useRef()
    const isVisible = useOnScreen(ref)

    const style = isVisible ? '' : 'py-10'

    return <div ref={ref} className={`flex justify-center ${style}`}> {!isVisible && <Loader/>}</div>
}

export default LoaderComponent