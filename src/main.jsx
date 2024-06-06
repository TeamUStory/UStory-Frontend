import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary
      fallback={<div>Error!</div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
)
