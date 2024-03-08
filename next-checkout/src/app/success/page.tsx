import React, { useEffect } from 'react'
import { useParams, useRouter } from "next/navigation"
import constants from '@/constants'

export default async function Success({searchParams: {source}} : {searchParams: {source: string}}) {
    let failure = false;
    console.log(source)
    if (source) {
        try {
            const data = await fetch(`${constants.endpoint}/orders/confirm`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({source})
        })
        const jsonData = await data.json()
        failure = jsonData.statusCode >= 400

    } catch(e) {
        console.log(e)
    }
    }

    return (
        <div className="py-5 text-center">
            <h2>{(failure) ? "Failure" : "Success"}</h2>
            <p className="lead">{(failure) ? "Your purchase failed..." : "Your purchase has been completed!"}</p>
        </div>
    )
}
