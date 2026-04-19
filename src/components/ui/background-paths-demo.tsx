import { BackgroundPaths } from "@/components/ui/background-paths"

export function DemoBackgroundPaths() {
    return (
        <div className="relative h-screen w-full">
            <BackgroundPaths />
            <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-4xl font-bold">Background Paths Demo</h1>
            </div>
        </div>
    )
}
