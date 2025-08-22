import { useTheme } from "@/context/theme-provider"
import { Link } from "react-router-dom";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";


const Header = () => {
    const {theme, setTheme}=  useTheme();
    const isDark = theme === "dark";

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur py-5 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-10 items-center justify-between px-13">
                <Link to={"/"}>
                    <img src={theme==="dark"? "/ForeCastly.png": "/white.png"} alt="ForeCastly Logo" className="h-16 px-4" />
                </Link>
                <div>
                    {/*search*/}
                    {/*toggle theme*/}
                    <div onClick={()=> setTheme(isDark? "light" : "dark")} className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark?"rotate-180":"rotate-0"}`}>
                        {isDark? (<Sun className ="h-7 w-7 text-yellow-500 rotate-0 transition-all"/>) : (<Moon className="h-7 w-7 text-blue-500 rotate-0 transition-all"/>)}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
