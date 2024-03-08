// import { cookies } from 'next/headers'

export default async function viewEventAPI(id,authToken){
    // const cookieStore = cookies()
    // const language = cookieStore.get('language').value
    try {
         const data = await fetch(
             `${process.env.NEXT_PUBLIC_API_LOCAL}/organizer/web/events/view`,
             {
                 method: 'POST',
                 body: JSON.stringify({eventId:id}),
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${authToken}`,
                    // 'language' : language
                 },
                 cache: 'no-store'
             }
         )
     
         const response = await data.json()
         return response.data
    } catch (error) {
        console.log(
            "errror",error
        );
    }
 }