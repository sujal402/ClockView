"use client"
import { useMyContext } from "@/context/context";

export default function admin(){

    const { user, userRoll, updateState } = useMyContext();

    return <>
        <h1>admin dashboard</h1>
    </>
}