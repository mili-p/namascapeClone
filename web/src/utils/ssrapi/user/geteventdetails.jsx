import { cookies } from 'next/headers'

export default async function getEventDetails(params) {
    // console.log('params',params)
    const cookieStore = cookies()
    const language = cookieStore.get('language')?.value || 'de'
    const authToken = cookieStore.get('authToken')?.value || ''
    // const encodedToken = atob(authToken)
    // console.log('encodedToken',atob(authToken))
    let pay={
        'Content-Type': 'application/json',
        'language' : language 
    }
    if (authToken) {
        pay.Authorization=`Bearer ${authToken}`
    }
    try {
        const data = await fetch(
            `${process.env.NEXT_PUBLIC_API_LOCAL}/enduser/web/events/view`,
            // { next: { revalidate: 3600 } },
            {
                method: 'POST',
                body: JSON.stringify({eventId: params,web:true}),
                headers:pay ,
                cache: 'no-store',
            }
        )
        const response = await data.json()
        return response
    } catch (error) {

    }
}