import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './layouts/layout'
import Home from './pages/home/Home'
import InvoiceView from './pages/invoice_view/InvoiceView'
import EditInvoice from './pages/Edit_invoice/EditInvoice'
import CreateInvoice from './pages/Create_invoice/CreateInvoice'

const router = createBrowserRouter([
  {
    path: "/", element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "invoice/:id", element: <InvoiceView /> },
      { path: "edit/invoice/:id", element: <EditInvoice /> },
      { path: "create/invoice", element: <CreateInvoice /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
