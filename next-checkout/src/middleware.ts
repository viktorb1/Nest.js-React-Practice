import  { NextResponse } from "next/server"
import type {NextRequest} from "next/server"

const isLoggedIn: boolean = true;

export function middleware(request: NextRequest) {
    let cookie = request.cookies.get('my-cookie')
    let headers = new Headers(request.headers)
    // CASE 1:
    // return NextResponse.json({
    //     hello: "middleware"
    // }) // stops all requests


    // CASE 2:
    // if (!isLoggedIn && request.url === 'http://localhost:3000/profile') {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

    // // allows you to proceed
    // return NextResponse.next()

    // CASE 3 (middleware only runs for matches listed in config below):
    if (isLoggedIn) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/', request.url))
}


export const config = {
    matcher: ['/profile']
}