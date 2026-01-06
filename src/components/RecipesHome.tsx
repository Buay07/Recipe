import { Link } from "react-router-dom";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import RecipeCard from "./RecipeCard";
import ErrorDisplay from "./ErrorDisplay";
import { getPopularRecipes } from "../services";

const RecipesHome = () => {
  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularRecipes"],
    queryFn: () => getPopularRecipes(4),
  });

  return (
    <div className="mt-10 lg:mt-24">
      <p className="text-2xl lg:text-5xl text-center font-medium font-serif">
        Popular Recipes You can't Miss
      </p>
      <p className="text-center mt-6 mx-5 text-default-500">
        From comfort food classics to exotic flavors, our featured recipes are
        sure to impress
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-5 p-3">
        {isLoading ? (
          <Spinner size="lg" />
        ) : error ? (
          <ErrorDisplay error={error} />
        ) : (
          recipes?.map((item) => (
            <Link to={`/recipe/${item.id}`} key={item.id}>
              <RecipeCard title={item.title} image={item.image} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipesHome;
