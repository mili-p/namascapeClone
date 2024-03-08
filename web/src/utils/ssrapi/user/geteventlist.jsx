import { cookies } from 'next/headers'

export default async function getEventList(params) {
    // console.log('params',params)
    const cookieStore = cookies()
    const language = cookieStore.get('language')?.value || 'de'
    try {
        const data = await fetch(
            `${process.env.NEXT_PUBLIC_API_LOCAL}/endUser/web/events/list`,
            {
                method: 'POST',
                body: JSON.stringify({params,web:true}),
                headers: {
                    'Content-Type': 'application/json',
                    'language' : language 
                },
                cache: 'no-store'
            }
        )
        const response = await data.json()
        return response
    } catch (error) {
        
    }
}