import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
const Index: NextPage = (): JSX.Element => {
    const { status, data } = useSession();

    useEffect(() => {
        console.log(data?.user?.image)
        if (status === "unauthenticated") Router.replace("/auth/signin");
    }, [status]);
    if (data?.user?.image === "Admin")
        return (
            <div className='px-10'>
                <main className='flex items-center justify-center'>
                    <h1 className='text-3xl font-bold'>Admin Dash Board</h1>
                    <Button>click me</Button>
                </main>
            </div>
        )
    return <div>You are not autherized to visit this page</div>;


}

export default Index