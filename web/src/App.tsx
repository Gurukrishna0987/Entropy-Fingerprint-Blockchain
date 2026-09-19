import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pipeline from './components/Pipeline'
import Components from './components/Components'
import Ledger from './components/Ledger'
import Quickstart from './components/Quickstart'
import Footer from './components/Footer'
import './index.css'
import './responsive.css'

function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <Hero />
      <Pipeline />
      <Components />
      <Ledger />
      <Quickstart />
      <Footer />
    </div>
  )
}

export default App
