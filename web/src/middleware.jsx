import { NextResponse } from 'next/server'

export const middleware = (request) => {
    const path = request.nextUrl.pathname
    const queryParams = request.nextUrl.searchParams
    const emailQuery = queryParams.get('email')
    const authPages = [
        '/signin/',
        '/signup/',
        '/forgot-password/',
        '/reset-password/',
        '/otp-verification/',
        '/',
        '/about-us/',
        '/contact-us/',
        '/events/'
    ]
    const userAuthPages = ['/my-account/', '/edit-profile/']
    const isUserAuth = userAuthPages.includes(path)
    const isAuthRoute = authPages.includes(path)
    const NotDirectAccessRoute = ['/reset-password/', '/otp-verification/']
    const isNotDirectAccessRoute = NotDirectAccessRoute.includes(path)
    const tokenValue = request.cookies.get('authToken')?.value || ''
    const userType = request.cookies.get(`userType`)?.value || ''
    const currentPage = request.cookies.get(`currentPage`)?.value || '/'
    if ((isAuthRoute || isUserAuth) && tokenValue && userType === '1') {
        return NextResponse.redirect(new URL('/dashboard/', request.url))
    }
    // if(["/events/status/"].includes(path) && !tokenValue){
    //     return NextResponse.redirect(new URL('/', request.url))
    // }
    if (isNotDirectAccessRoute && !tokenValue && !emailQuery) {
        return NextResponse.redirect(new URL('/signin/', request.url))
    }

    if (!isAuthRoute && !tokenValue) {
        return NextResponse.redirect(new URL('/signin/', request.url))
    }
    if (tokenValue && userType === '2') {
        const nonAuthRoutes = [
            '/dashboard/',
            '/event-management/',
            '/event-booking/',
            '/signin/',
            '/signup/',
            '/otp-verification/',
            '/reset-password/',
            '/forgot-password/',
            '/myaccount/',
        ]
        const isNonAuthRoute = nonAuthRoutes.includes(path)
        if (isNonAuthRoute) {
            return NextResponse.redirect(new URL(currentPage, request.url))
        }
    }
}
export const config = {
    matcher: [
        '/signin/',
        '/signup/',
        '/forgot-password/',
        '/reset-password/',
        '/otp-verification/',
        '/',
        '/dashboard/',
        '/about-us/',
        '/contact-us/',
        '/events/',
        '/event-management/',
        '/events/organizer-profile/',
        '/event-booking/',
        '/myaccount/',
        '/myaccount/change-password/',
        '/credit-card/',
        '/twint/',
        '/myaccount/personal-details/',
        '/myaccount/bank-details/',
        '/my-account/',
        '/edit-profile/',
        '/change-password/',
        '/change-language/',
        '/create-event/',
        '/create-event/:path*/',
        '/payment/',
        "/termsandconditions/",
        '/e-ticket/',
        '/terms-of-service/',
        '/privacy-policy-tab/',
        '/event-booking/:path*/',
        '/events/payment/:path*/',
        '/events/status/',
        "/events/event-attendees/:path*/",
        // {
        //     source : "https://test.adyen.com/acquirersimulator/:path*"
        // }
    ]
}

// import {NextResponse} from 'next/server'

// export function middleware (request){
//     let privateRoute= ["/study/private-route-1", "/study/private-route-2"]
//     let authRoute= ["/study/auth-route-1", "/study/auth-route-2"]
//     if (privateRoute.includes(request.nextUrl.pathname)) {
//         console.log("TEST")
//         return NextResponse.redirect(new URL("/login", request.url));
//         // Perform private route logic here
//         // ...
//       }

//       // Check if the requested URL matches any auth route
//       if (authRoute.includes(request.nextUrl.pathname)) {
//         console.log("TEST")
//         return NextResponse.redirect(new URL("/about", request.url));
//         // Perform auth route logic here
//         // ...
//       }

//       // If the requested URL doesn't match any private or auth route,
//       // redirect to the login page

// }

// export const config = {
//     // matcher : ["/about/:path*","/studentlist/:path*"]
//     matcher : ["/study/private-route-1", "/study/private-route-2","/study/auth-route-1", "/study/auth-route-2"],

// }
