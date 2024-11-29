import { useState } from "react";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { gobbleGumImages } from "../gubbleGumsUri";
import GubblegumCard from "../components/gubblegumCard.component";
import useImages from "../hooks/gubblegumFetch";

export default function Index() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { images, loading, error } = useImages('http://localhost:4000/api/images/get-images');
    if(loading) return (
        <p>cargndo</p>
    )

    if(error) return (
        <p>{error}</p>
    )

    const titulos = extractAndReplace(gobbleGumImages);

    function extractAndReplace(urls) {
        return urls.map(url => {
          // Decodificamos la URL para convertir los caracteres codificados (como %27) a su forma original
          const decodedUrl = decodeURIComponent(url);
      
          // Usamos la expresión regular para capturar la parte antes de "_GobbleGum"
          const match = decodedUrl.match(/\/([A-Za-z0-9_]+(?:%27|[^/])*?)_GobbleGum/);  // Captura cualquier codificación especial
      
          if (match) {
            // Extraemos la parte antes de "_GobbleGum"
            let extracted = match[1];
      
            // Reemplazamos todos los guiones bajos por un espacio
            extracted = extracted.replace(/_/g, ' ');
      
            // Reemplazamos "%27" por una comilla simple
            extracted = extracted.replace(/%27/g, "'");
      
            return extracted;
          }
          return null;  // Si no hay coincidencia, devuelve null
        }).filter(item => item !== null);  // Filtramos los valores null (en caso de que no haya coincidencia)
      }
      
      

    return (
        <>
            <nav className="sticky top-0 w-full bg-primary shadow-sm z-50">
                <div className="container mx-auto flex items-center justify-between p-4 lg:p-0">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img className="w-[50px] h-[50px] sm:w-[75px] sm:h-[75px]" src="/Logo.png"
                             alt="Symphony Logo"/>
                    </div>

                    {/* Menu icon for mobile */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <IoClose className="w-8 h-8"/> : <IoMenu className="w-8 h-8"/>}
                        </button>
                    </div>

                    {/* Links and search bar for larger screens */}
                    <div className="hidden lg:flex items-center space-x-5">
                        <div className="relative flex items-center text-gray-500">
                            <IoSearch className="absolute ml-3 w-5 h-5"/>
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar..."
                                className="w-full sm:w-40 lg:w-56 py-2 pl-10 pr-3 font-semibold text-black placeholder-gray-500 rounded-lg border-none ring-2 ring-gray-300"
                            />
                        </div>
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-dark_complementary font-semibold bg-white border-2 border-secondary py-2 px-3 rounded-lg hover:bg-complementary hover:border-complementary hover:text-white transition duration-500 ease-in-out"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    to="/sign-up"
                                    className="text-white font-semibold bg-secondary border-2 border-secondary py-2 px-3 rounded-lg hover:bg-white hover:border-complementary hover:text-dark_complementary transition duration-500 ease-in-out"
                                >
                                    Crear cuenta
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="font-medium text-lg sm:text-xl">¡Hola {user.name}!</p>
                                <button
                                    onClick={logout}
                                    className="text-white font-semibold bg-secondary border-2 border-secondary py-2 px-3 rounded-lg hover:bg-white hover:border-complementary hover:text-dark_complementary transition duration-500 ease-in-out"
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div
                        className="absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center p-8 space-y-6 text-center shadow-lg lg:hidden">
                        {/* Close button */}
                        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-700">
                            <IoClose className="w-8 h-8"/>
                        </button>

                        <ScrollLink
                            to="home"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="w-full py-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Inicio
                        </ScrollLink>
                        <ScrollLink
                            to="about-us"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="w-full py-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Nosotros
                        </ScrollLink>
                        <div className="w-full flex items-center justify-center relative text-gray-500">
                            <IoSearch className="absolute left-3 w-5 h-5"/>
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar..."
                                className="w-full py-2 pl-10 pr-3 font-semibold text-black placeholder-gray-500 rounded-lg border-none ring-2 ring-gray-300"
                            />
                        </div>
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="w-full py-3 text-dark_complementary font-semibold bg-white border-2 border-secondary rounded-lg hover:bg-complementary hover:border-complementary hover:text-white transition duration-500 ease-in-out"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    to="/sign-up"
                                    className="w-full py-3 text-white font-semibold bg-secondary border-2 border-secondary rounded-lg hover:bg-white hover:border-complementary hover:text-dark_complementary transition duration-500 ease-in-out"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Crear cuenta
                                </Link>
                            </>
                        ) : (
                            <>
                                <p className="font-medium text-lg sm:text-xl">¡Hola {user.name}!</p>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full py-3 text-white font-semibold bg-secondary border-2 border-secondary rounded-lg hover:bg-white hover:border-complementary hover:text-dark_complementary transition duration-500 ease-in-out"
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        )}
                    </div>
                )}
            </nav>

            <body className="bg-primary flex flex-wrap gap-4">
            {images.map((image, index) => (
                <GubblegumCard key={index} src={image} titulo={titulos[index]}/>
            ))}

            </body>
        </>
    )
}