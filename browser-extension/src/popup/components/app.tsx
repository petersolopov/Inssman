import { HashRouter } from 'react-router-dom';
import Background from 'src/options/components/common/background/background';
import OverlayContextProvider, { OverlayContext } from 'src/context/overlayContext';
import Content from './content/content';
import Footer from './footer/footer';
import Header from './header/header';
import { useContext } from 'react';

const App = () => {
  const { showOverlay } = useContext(OverlayContext);
  return <div className='w-[650px]'>
      <Background>
          <div className="flex flex-col gap-5 justify-between">
              <Header />
              {!showOverlay && <div className="absolute z-10 bg-black opacity-50 top-[85px] bottom-0 left-0 right-0"></div>}
              <Content />
              <Footer />
          </div>
      </Background>
  </div>
}

const Wrapper = () => {
  return <HashRouter>
    <OverlayContextProvider>
      <App />
    </OverlayContextProvider>
  </HashRouter>
}



export default Wrapper;
