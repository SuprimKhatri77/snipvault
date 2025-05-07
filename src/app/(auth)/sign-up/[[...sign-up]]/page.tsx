import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";


export default function SignUpPage() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <ClerkLoading>
                <div
                    className="inline-block border-green-600 h-8 w-8 animate-spin rounded-full border-4 border-solid border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </ClerkLoading>

            <ClerkLoaded>
                <SignUp signInUrl="/sign-in" />
            </ClerkLoaded>
        </div>
    );

}