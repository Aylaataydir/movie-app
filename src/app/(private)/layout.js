
'use client'

import { useContext, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'

export default function PrivateLayout({ children }) {
    const { currentUser,loading } = useContext(AuthContext)

    const router = useRouter()
    const pathname = usePathname()


    useEffect(() => {
        if (!loading && !currentUser) {
            router.push(`/login?redirect=${pathname}`)
        }
    }, [loading, currentUser, router])

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Yükleniyor...</div>
    }

    if (!currentUser) {
        return null // yönlendirme gerçekleşene kadar hiçbir şey gösterme
    }

    return <>{children}</>
}