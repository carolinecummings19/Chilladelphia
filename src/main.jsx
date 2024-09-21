/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { AuthProvider } from "@propelauth/react";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Theme>
			<AuthProvider authUrl={import.meta.env.VITE_AUTH_URL}>
				<App />
			</AuthProvider>
		</Theme>
	</React.StrictMode>
);
