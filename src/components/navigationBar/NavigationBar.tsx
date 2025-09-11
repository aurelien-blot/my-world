import {Home} from "lucide-react"
import {CircleUser} from "lucide-react"
import {Settings} from "lucide-react"
import {NavLink} from "react-router-dom"

function NavigationBar() {

    const inactiveClass = "bg-gray-800 text-white ";
    const activeClass = "bg-white text-gray-800 ";
    const hoverClass = "hover:bg-gray-600 ";
    const baseLinkClass = "flex items-center space-x-2 flex-1 justify-center p-2 h-10 " + hoverClass
    const navClass = "fixed left-0 right-0 flex justify-around md:bottom-auto md:top-0 bottom-0 "
    //const navClass="flex shrink-0 ";
    return (
        <nav className={navClass}>
            <NavLink
                to="/"
                className={({isActive}) =>
                    `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
            >
                <Home className="h-6 w-6"/>
                <span className="hidden md:inline">Accueil</span>
            </NavLink>
            <NavLink
                to="/profile"
                className={({isActive}) =>
                    `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
                }
            >
                <CircleUser className="h-6 w-6"/>
                <span className="hidden md:inline">Profil</span>
            </NavLink>

            <NavLink to="/settings"
                     className={({isActive}) =>
                         `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
                     }
            >
                <Settings className="h-6 w-6"/>
                <span className="hidden md:inline">Paramètres</span>
            </NavLink>
        </nav>
    )
}

export default NavigationBar;