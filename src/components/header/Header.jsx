import { useState, useEffect } from "react";
import useTheme from "../../hooks/Theme";

export default function Header() {

    const { theme, handleDarkMode, handleLightMode } = useTheme();

    return (
        <header
            className="flex flex-row items-center w-full lg:w-24 lg:flex-col lg:fixed lg:h-screen justify-between
                bg-[var(--custom-header-color)] dark:bg-[var(--custom-dark-color)] h-[72px] pr-5 lg:pr-0 lg:rounded-r-2xl z-50"
        >
            <div className="relative flex items-end bg-[var(--custom-color-1)] rounded-r-2xl w-[72px] h-full lg:w-24 lg:h-24">
                <div className="bg-[var(--custom-color-2)] rounded-tl-2xl rounded-br-2xl h-1/2 w-full"></div>
                <img
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    src="/assets/logo.svg"
                    alt="company logo"
                />
            </div>
            <div className="flex items-center lg:flex-col h-full lg:h-fit lg:w-full gap-8 lg:pb-5">
                {theme === "light" ?
                    <button
                        className="cursor-pointer hover:scale-140 transition-transform"
                        onClick={handleDarkMode}
                    >
                        <img src="/assets/icon-moon.svg" alt="" />
                    </button>
                    :
                    <button
                        className="cursor-pointer hover:scale-140 transition-transform"
                        onClick={handleLightMode}
                    >
                        <img src="/assets/icon-sun.svg" alt="" />
                    </button>
                }
                <div className="h-full w-[1px] lg:h-[1px] lg:w-full  bg-[#494E6E]"></div>
                <img
                    className="w-8 h-8 object-cover rounded-full"
                    src="/assets/avatar.png"
                    alt="User avatar"
                />
            </div>
        </header >
    )
}