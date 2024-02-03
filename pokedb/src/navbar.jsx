import { Link, useResolvedPath, useMatch} from "react-router-dom" 

export default function Navbar() {
    return (
        <nav className = "nav"> {/* Router replaces href with to, and anchor tags with links  */}
            <Link to = "/" id = "home-link">
                <img src = "../public/images/PokeDB.png" className = "logo" alt = "Home Logo"/>
            </Link>
            <ul>
                <CustomLink to = "/evolutions">Evolutions</CustomLink>
                <CustomLink to = "/abilities">Abilities</CustomLink>
                <CustomLink to = "/natures">Natures</CustomLink>
                <CustomLink to = "/items">Items</CustomLink>
            </ul>
        </nav>
    )
}

{/* Custom link component that wraps link */}
function CustomLink( {to, children, ...props }) { 
    const resolvedPath = useResolvedPath(to); {/* Takes relative or absolute path and combines with current user path to give a full path */}
    const isActive = useMatch({ path: resolvedPath.pathname, end: true}); {/* passes our path name, and the entire link path must match */}
    return (
        <li className = {isActive ? "active" : ""}> {/* Determines if link is currently active */}
            <Link to = {to} {...props}> {/* Passes path to the full url */}
                {children} {/* Placeholder for content in link */}
            </Link>
        </li>
    )
}
