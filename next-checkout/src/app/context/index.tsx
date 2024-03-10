"use client"

import { createContext, useState, useContext } from 'react'

type Context = {
    hello: string
}

const AppContext = createContext<Context>({
    hello: "world"
})

export function AppWrapper({children} : {
    children: React.ReactNode;
}) {
    let [state, setState] = useState({
        hello: "world"
    })

    // .Provider passes down the values all the way through to all of its children
    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}

// USAGE:
// 1. Wrap the code you want to have access to this context in <AppWrapper></AppWrapper>
// 2. const { hello } = useAppContext()