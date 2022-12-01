// eslint prettier single comma rule
// spaced-comment: add space or tab after // in below imports

// Routes
import AppRoutes from './routes/applicationRoutes';

// Styling
import './App.css';

// Components
import { Navbar } from './layout/navbar/navbar';

// eslint-disable  import/no-named-as-default
import Banner from './components/banner/banner';

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <main className="main">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
