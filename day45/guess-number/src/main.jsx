import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from "@chakra-ui/react"
import './index.css'
import theme from './config/theme.js'
import Provider from './core/Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  // </React.StrictMode>,
)
