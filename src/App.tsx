import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/ui/Layout";
import { ThemeProvider } from "./context/theme-provider";
import CityPage from "./pages/city-page";
import WeatherDashboard from "./pages/weather-dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import { fetchWeather } from "./services/api";

const queryClient = new QueryClient();

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>
            {/* Weather Search Section */}
            <div className="p-6">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="border px-2 py-1 mr-2"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-1 bg-blue-500 text-white"
              >
                Search
              </button>

              {error && <p className="text-red-500">{error}</p>}

              {weather && (
                <div className="mt-4">
                  <h2 className="text-2xl">{weather.name}</h2>
                  <p>{weather.weather[0].description}</p>
                  <p className="text-xl">{weather.main.temp}°C</p>
                </div>
              )}
            </div>

            {/* Routes Section */}
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
