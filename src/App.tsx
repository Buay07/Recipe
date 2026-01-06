import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Spinner } from "@heroui/react";
import MainLayout from "./layouts/MainLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const RecipeDetailsPage = lazy(() => import("./pages/RecipeDetailsPage"));
const CuisinePage = lazy(() => import("./pages/CuisinePage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const AllRecipes = lazy(() => import("./components/AllRecipes"));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-[50vh]">
    <Spinner size="lg" color="primary" label="Loading..." />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/allrecipe" element={<AllRecipes />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
            <Route path="/cuisines/:name" element={<CuisinePage />} />
            <Route path="/search/:searched" element={<SearchResultsPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
