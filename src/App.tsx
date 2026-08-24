import '@mantine/core/styles.css';
import Catalog from "./modules/catalog/Catalog.tsx";
import { MantineProvider } from '@mantine/core';
import Header from "./modules/Header/Header.tsx";

function App() {

  return (
      <MantineProvider>
              <Header/>
              <Catalog/>
      </MantineProvider>
  )}

export default App
