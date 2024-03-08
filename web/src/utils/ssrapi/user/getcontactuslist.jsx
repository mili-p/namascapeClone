import { cookies } from 'next/headers'

export default async function getContactUsList() {
    // console.log('params',params)
    const cookieStore = cookies()
    const language = cookieStore.get('language')?.value || 'de'
    // console.log('language',language)
    try {
        const data = await fetch(
            `${process.env.NEXT_PUBLIC_API_LOCAL}/contact-us/view-config`,
            {
                method: 'POST',
                body: JSON.stringify({web:true}),
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