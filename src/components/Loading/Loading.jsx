import { Spinner } from "flowbite-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center mt-30">
            <Spinner
                aria-label="Default status example"
                color="purple"
                size="xl"
            />
        </div>
    )
}