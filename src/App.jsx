import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Loader from './components/Loader'

// Routes are lazy-loaded so each page's code is only downloaded when visited.
const Home = lazy(() => import('./pages/Home'))
const EmployeeDetails = lazy(() => import('./pages/EmployeeDetails'))
const EditEmployee = lazy(() => import('./pages/EditEmployee'))
const AddEmployee = lazy(() => import('./pages/AddEmployee'))
const Favorites = lazy(() => import('./pages/Favorites'))

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/employees/:id/edit" element={<EditEmployee />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

export default App
