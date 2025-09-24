import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"

export default function Layout() {
    return (
        <main className="md:h-screen lg:min-h-[100vh] md:pb-20">
            <Header />
            <Outlet />
        </main>
    )
}