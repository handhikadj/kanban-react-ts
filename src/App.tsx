import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy } from 'react'

const NotFound = lazy(() => import('@/pages/NotFound'))
const Index = lazy(() => import('@/pages/v1/Index'))

export default function App() {
    return (
        <Routes>
            <Route 
                path="*" 
                element={<NotFound />} 
            />

            <Route 
                path="/" 
                element={<Navigate to="/v1" replace />} 
            />
            
            <Route path="/v1" element={<Index />} />
        </Routes>
    )
}
