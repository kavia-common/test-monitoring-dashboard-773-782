import { render, screen } from '@testing-library/react';
import { AppRouter } from './router';
import { ThemeProvider } from './components/common/ThemeProvider';
import { StoreProvider } from './state/store';

test('renders app title', () => {
  render(
    <StoreProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </StoreProvider>
  );
  const title = screen.getByTestId('app-title');
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('Test Monitoring Dashboard');
});
