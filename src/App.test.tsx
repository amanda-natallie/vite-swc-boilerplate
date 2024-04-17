import { Helpers } from 'tests/helpers';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const { expectParagraphText, clickOnButton } = Helpers;
  it('should render the App component', () => {
    render(<App />);

    expectParagraphText('Vite + React');
    expectParagraphText('count is 0');
    expectParagraphText('src/App.tsx');
    expectParagraphText('Click on the Vite and React logos to learn more');
  });

  it('should increment count when the button is clicked', () => {
    render(<App />);
    clickOnButton('count is 0');
    expectParagraphText('count is 1');
  });
});
