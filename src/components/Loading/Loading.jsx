import { Spinner } from "flowbite-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner
                aria-label="Default status example"
                color="purple"
                size="xl"
            />
        </div>
    )
}