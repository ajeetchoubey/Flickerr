import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircleHeart, User, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <header className=" bg-gradient-to-r from-pink-500  via-pink-600 to-pink-700 shadow-lg">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex justify-between items-center py-4">
          <div className=" flex items-center">
            <Link to={"/"} className=" flex items-center space-x-2">
              <MessageCircleHeart className=" w-10 h-10 text-white" />
              <span className=" text-2xl font-sans font-semibold text-white hidden sm:inline">
                Flickerr
              </span>
            </Link>
          </div>
          <div className=" hidden md:flex items-center space-x-4">
            {authUser ? (
              <div className=" relative" ref={dropDownRef}>
                <button
                  onClick={() => setDropDown(!dropDown)}
                  className=" flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={authUser.profilePic || "../../public/avatar.png"}
                    alt="profile image"
                    className=" h-10 w-10 object-cover rounded-full border-2 border-white"
                  />
                  <span className=" text-white font-medium">
                    {authUser.name}
                  </span>
                </button>
                {dropDown && (
                  <div className=" absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to={"/profile"}
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setDropDown(false)}
                    >
                      <User className=" mr-2" size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className=" w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className=" mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className=" text-white hover:text-pink-200 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className=" bg-white text-pink-600 px-4 py-2 rounded-full font-medium hover:bg-pink-100 transition duration-150 ease-in-out"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
				<div className='md:hidden bg-pink-600'>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
						{authUser ? (
							<>
								<Link
									to='/profile'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Profile
								</Link>
								<button
									onClick={() => {
										logout();
										setMobileMenuOpen(false);
									}}
									className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
								>
									Logout
								</button>
							</>
						) : (
							<>
								<Link
									to='/auth'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Login
								</Link>
								<Link
									to='/auth'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			)}
    </header>
  );
};

export default Header;
