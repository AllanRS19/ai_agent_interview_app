'use client';

import { redirect } from "next/navigation";
import { signOut } from "@/lib/actions/auth.actions";
import { Button } from "./ui/button";

const SignOutButton = () => {

    const handleSignOut = async () => {
        await signOut();
        redirect('/sign-in');
    }

    return (
        <Button
            onClick={handleSignOut}
            className="cursor-pointer"
            variant="destructive"
        >
            Sign out
        </Button>
    )
}

export default SignOutButton