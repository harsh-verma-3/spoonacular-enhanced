import React, { useState, useRef, useEffect } from "react";
import "../styles/header.css";

const Header = ({ searchQuery, setSearchQuery, handleSearch, loading }) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchRef = React.useRef(null);

    const toggleSearch = () => {
        setIsSearchActive(true);
        setTimeout(() => {
            searchRef.current.focus();
        }, 0);
    };

 

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target) && searchQuery.trim() === "") {
            setIsSearchActive(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSearch(e);
    };

    return (
        <header className="bg-[#00843c] text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center py-3">
                    {/* Logo */}
                    <div className="w-16 md:w-auto flex-shrink-0 mb-4 md:mb-0">
                        <a href="/">
                            <img
                                src="/application/frontend/images/spoonacular-logo.svg"
                                title="spoonacular, semantic recipe search engine"
                                className="h-16"
                                alt="Spoonacular"
                            />
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full md:w-2/3 px-4 searchbar" ref={searchRef}>
                        <form id="searchForm" onSubmit={(e) => { e.preventDefault(); handleSearch(e); }}>
                            <div className={`input--makiko ${isSearchActive ? 'input--filled' : ''}`} onClick={toggleSearch}>
                                <input
                                    className="input__field input__field--makiko"
                                    type="search"
                                    id="searchBox"
                                    autoComplete="off"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <label className="input__label input__label--makiko" htmlFor="searchBox">
                                    <span className="input__label-content input__label-content--makiko">
                                        Search spoonacular
                                    </span>
                                </label>
                                <button type="submit" className="search-icon-btn">
                                    {loading ? (
                                        <div className="loader"></div>
                                    ) : (
                                        <img src="/application/frontend/images/search.png" alt="Search" />
                                    )}
                                </button>
                            </div>
                        </form>
                        
                    </div>

                    {/* Navigation Icons */}
                    <div className="hidden md:flex space-x-4 text-center">
                        <a href="/meal-planner" className="flex flex-col items-center">
                            <img
                                src="/application/frontend/images/meal-planner-white.svg"
                                width="40"
                                height="40"
                                alt="Meal Planner"
                            />
                            <span className="text-xs mt-1">Meal Planner</span>
                        </a>
                        <a href="/articles" className="flex flex-col items-center">
                            <img
                                src="/application/frontend/images/reading-white.svg"
                                width="40"
                                height="40"
                                alt="Articles"
                            />
                            <span className="text-xs mt-1">Articles</span>
                        </a>
                        <a href="/articles" className="flex flex-col items-center">
                            <img
                                src="/application/frontend/images/spoonacular-hero.svg"
                                width="40"
                                height="40"
                                alt="Login"
                            />
                            <span className="text-xs mt-1">Login</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex justify-around bg-[#00843c] py-2 border-t border-[#ffffff33]">
                <a href="/meal-planner">Meal Planner</a>
                <a href="/articles">Articles</a>
                <a href="/profile/">My Profile</a>
            </div>
        </header>
    );
};

export default Header;