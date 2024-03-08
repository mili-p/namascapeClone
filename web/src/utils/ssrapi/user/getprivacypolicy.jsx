import { cookies } from 'next/headers'

export default async function getPrivacyPolicyListData({params}) {
    // console.log('params',params)
    const cookieStore = cookies()
    const language = cookieStore.get('language')?.value || 'de'
    try {
        // const params = {
        //     // Include other necessary parameters if needed
        //     slug: 'privacy-policy' // Assuming slug is a parameter for fetching specific data
        // };
        const data = await fetch(
            `${process.env.NEXT_PUBLIC_API_LOCAL}/cms/view-cms`,
            {
                method: 'POST',
                body: JSON.stringify({slug:params,web:true}),    
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
        console.log(
            "errror",error
        );
    }
}