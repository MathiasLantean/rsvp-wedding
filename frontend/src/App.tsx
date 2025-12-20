import Hero from './Hero';
import mobileHero from './assets/hero-mobile.jpg';
import desktopHero from './assets/hero-desktop.jpg';

function App() {
  return <Hero imageMobile={mobileHero} imageDesktop={desktopHero} />;
}
export default App;
