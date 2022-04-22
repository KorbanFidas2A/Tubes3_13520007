import { React, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const NavItems = ["Beranda", "Prediksi", "Riwayat", "Penyakit", "Tentang"];

  return (
    <>
      <nav className="fixed z-10 flex w-full flex-wrap items-center justify-between py-[0.8rem] px-[1.75rem] backdrop-blur-sm lg:py-[1.125rem] lg:px-[9.75rem]">
        <div className="container flex flex-wrap items-center justify-between">
          <div className="flex w-full items-center justify-between lg:block lg:w-auto lg:justify-start">
            {/* LOGO */}
            <Link to="/">
              <img
                src={images.logo}
                alt="Logo"
                className="w-[6.125rem] lg:w-[13rem] "
              />
            </Link>

            {/* BURGER BUTTON */}
            <button
              className="block rounded focus:outline-none lg:hidden"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? (
                <FontAwesomeIcon icon={faBars} />
              ) : (
                <FontAwesomeIcon icon={faX} />
              )}
            </button>
          </div>

          <div
            className={"items-center lg:flex" + (isOpen ? " flex" : " hidden")}
          >
            <ul className="flex list-none flex-col pt-[2.25rem] lg:ml-auto lg:flex-row lg:pt-0">
              {NavItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center pb-[1.5rem] lg:ml-[2.25rem] lg:pb-0"
                >
                  <Link
                    to={item === "Beranda" ? "/" : `/${item}`}
                    className="text-[1.125rem] font-normal transition duration-300  ease-in-out hover:text-turquoise lg:text-[1.5rem]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
    //   <nav className='w-full lg:py-[1.125rem] px-[1.75rem] lg:px-[9.75rem] backdrop-blur-sm fixed z-20'>
    //     <div className='flex items-center justify-between w-full'>

    //       {/* LOGO */}
    //       <div className='flex items-center'>
    //         <Link to="/"><img src={images.logo} alt="Logo" className='w-[6rem] lg:w-[13rem]' /></Link>
    //       </div>

    //       {/* MENU */}
    //       <div className='hidden lg:flex'>
    //         <ul className='flex items-center list-none'>
    //           {['Beranda', 'Penyakit', 'Prediksi', 'Riwayat', 'Tentang'].map((item, index) => (
    //             <li key={index} className='lg:ml-[2.25rem] '>
    //               <Link to={`/${item}`} className='text-[1.125rem] lg:text-[1.5rem] font-normal hover:text-turquoise'>{item}</Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>

    //       {/* BURGER BUTTON */}
    //       <div className="flex lg:hidden">
    //         <button
    //           onClick={() => setIsOpen(!isOpen)}
    //           type="button"
    //           className="bg-transparent inline-flex items-center justify-center p-[1rem] rounded-sm "
    //           aria-controls="mobile-menu"
    //           aria-expanded="false"
    //         >
    //           <span className="sr-only">Open main menu</span>
    //           {!isOpen ? (<FontAwesomeIcon icon={faBars} />) : (<FontAwesomeIcon icon={faX} />)}
    //         </button>
    //       </div>

    //     </div>
    //     <p>aaaaaaaaaaaaaaaaaaa</p>
    //     {/* MOBILE MENU */}
    //     <Transition
    //       show={true}
    //       enter="transition ease-out duration-100 transform"
    //       enterFrom="opacity-0 scale-95"
    //       enterTo="opacity-100 scale-100"
    //       leave="transition ease-in duration-75 transform"
    //       leaveFrom="opacity-100 scale-100"
    //       leaveTo="opacity-0 scale-95"
    //     >
    //       {(ref) => (
    //         <div className="" id="mobile-menu">
    //           <div ref={ref} className="px-2 pt-2 pb-3 text-[1.125rem]">
    //             <p>AAAAAAAAAAA</p>
    //             {/* <ul className='items-center justify-center list-none'>
    //               {['Beranda', 'Penyakit', 'Prediksi', 'Riwayat', 'Tentang'].map((item, index) => (
    //                 <li key={index} className=' '>
    //                   <Link to={`/${item}`} className='text-[1.125rem] block font-normal hover:text-turquoise'>{item}</Link>
    //                 </li>
    //               ))}
    //             </ul> */}
    //           </div>
    //         </div>
    //       )}
    //     </Transition>
    //     <p>aaaaaaaaaaaaaaaaaaa</p>
    //   </nav>
  );
};

export default Navbar;
