import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import Contact from './pages/Contact';
import Map from './pages/Map.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Involvement from './pages/Involvement.jsx';
import ForumPage from './pages/ForumPage.jsx';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/map' element={<Map />} />
				<Route path='/involvement' element={<Involvement />} />
				<Route path='/forum' element={<ForumPage />} />
				<Route path='/about' element={<AboutUs />} />
				<Route path='/privacy-policy' element={<PrivacyPolicy />} />
				<Route path='/terms' element={<Terms />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
