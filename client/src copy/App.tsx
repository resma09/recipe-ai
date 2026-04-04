import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Spinner from "./components/Spinner";

const GeneratorPage = lazy(() => import("./pages/GeneratorPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-transparent">
        <Header />
        <main className="flex-1 container mx-auto p-4 lg:p-8">
          <Suspense fallback={<Spinner label="Loading page..." />}>
            <Routes>
              <Route path="/" element={<GeneratorPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
