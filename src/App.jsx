import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import Contact from './pages/Contact';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/privacy-policy' element={<PrivacyPolicy />} />
				<Route path='/terms' element={<Terms />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
