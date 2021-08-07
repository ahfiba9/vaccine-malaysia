import headerStyle from '../styles/Header.module.css'

export const Header = () => {
    return (
        <div>
            <h1 className={headerStyle.title}>
                <span>Covid In Malaysia</span>
            </h1>
            <p className={headerStyle.description}>
                Bringing you covid data in Malaysia in graph
            </p>
        </div>
    )
}