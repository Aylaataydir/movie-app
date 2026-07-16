
'use client'

import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'

export default function PrivateLayout({ children }) {
    const { currentUser, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/login')
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