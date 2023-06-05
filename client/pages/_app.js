import '@/styles/globals.css';
import '@/styles/footer.css';
import '@/styles/header.css';
import '@/styles/heroStyle.css';
import '@/styles/script.js';

import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider } from '@/context';

const App = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider activeChain={ChainId.Mumbai}>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  );
};

export default App;
