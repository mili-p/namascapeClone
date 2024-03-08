export const priceFormator = (number,lang) => {
    const numberOkay = Number(number)

    if(lang === 'en'){
        return Number(numberOkay).toLocaleString('en-IN', {
            currency: 'INR',
            minimumFractionDigits: 0
        })
    } else{
        return Number(numberOkay).toLocaleString('de-CH', {
            currency: 'CHF',
            minimumFractionDigits: 0
        })
    }
}
