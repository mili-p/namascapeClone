import { cookies } from 'next/headers'

export default function dynamicTitle(p) {
    const lang = cookies()?.get('language')?.value || 'de' 
    return p?.[lang]
  }

