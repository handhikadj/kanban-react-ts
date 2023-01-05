import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/styles/app.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />

            {import.meta.env.VITE_APP_ENV !== 'production' ? <ReactQueryDevtools /> : null}
        </QueryClientProvider>
    </React.StrictMode>,
)
