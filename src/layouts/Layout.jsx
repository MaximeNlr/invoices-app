import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"

export default function Layout() {
    return (
        <main className="dark:bg-[var(--custom-color-12)] md:h-screen lg:h-fit md:pb-20">
            <Header />
            <Outlet />
        </main>
    )
}