import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';
import Modal from 'react-modal';
import { setVoice } from './helpers/setVoice';

const rootElement = document.getElementById('root');
Modal.setAppElement('#root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText =
    'padding: 20px; font-family: sans-serif; background: #f8d7da; color: #721c24; border-radius: 4px; margin: 20px;';
  errorDiv.innerHTML =
    '<h1>Application Error</h1><p>Unable to initialize: root element with id="root" not found in the page.</p>';
  document.body.appendChild(errorDiv);
}
setVoice(); /* preload voices */
