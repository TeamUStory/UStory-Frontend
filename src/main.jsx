import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '@/components/Error/Error.jsx';  

ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary
    fallbackRender={({ resetErrorBoundary }) => <Error resetErrorBoundary={resetErrorBoundary} />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
)