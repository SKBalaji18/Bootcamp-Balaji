import CityWeather from "../components/CityWeather";
import Navbar from "../components/Navbar";

const PageTwo = () => (
  <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-pink-300 to-yellow-200">
    <Navbar />
    <header className="text-center mt-4">
      <h1 className="text-3xl font-bold">About City Weather</h1>
      <p className="text-lg">Explore the weather of cities around the world.</p>
    </header>
    <main className="mt-6">
      <CityWeather city="Tokyo" />
    </main>
  </div>
);

export default PageTwo;
