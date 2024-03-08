export default function swDev(params) {
    let swUrl=`${import.meta.env.VITE_APP_BASENAME}sw.js`
    navigator.serviceWorker.register(swUrl).then((res)=>{
    }).catch((err)=>{
        console.log(err)
    })
}