import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'


import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <div className='max-w-screen-xl mx-auto m-2 p-2'>
    <RouterProvider router={router} />
    </div>
    </QueryClientProvider>

    </AuthProvider>
    
  </React.StrictMode>,
)
