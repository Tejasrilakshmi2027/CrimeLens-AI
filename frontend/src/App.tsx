import AppRoutes from './routes';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { ChatProvider } from './contexts/ChatContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <LoadingProvider>
            <ChatProvider>
              <AppRoutes />
            </ChatProvider>
          </LoadingProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}