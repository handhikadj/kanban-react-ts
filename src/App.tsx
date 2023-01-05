import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy } from 'react'
const Index = lazy(() => import('@/pages/V1/Index'))

export default function App() {
    return (
        <Routes>
            <Route 
                path="/" 
                element={<Navigate to="/v1" replace />} 
            />
            <Route path="/v1" element={<Index />} />
        </Routes>
    )
}
