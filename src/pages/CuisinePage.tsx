import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import food_th from "../assets/cuisines_thai.png";
import food_us from "../assets/cuisines_american.png";
import food_jp from "../assets/cuisines_japan.png";
import food_mx from "../assets/cuisines_mexican.png";
import RecipeCard from "../components/RecipeCard";
import ErrorDisplay from "../components/ErrorDisplay";
import { getRecipesByCuisine } from "../services";

const cuisineImages: Record<string, string> = {
  Thai: food_th,
  American: food_us,
  Japanese: food_jp,
  Mexican: food_mx,
};

const cuisineGradients: Record<string, string> = {
  Thai: "bg-gradient-to-r from-red-500 via-blue-400 to-slate-100",
  American: "bg-gradient-to-r from-blue-600 via-red-500 to-slate-400",
  Japanese: "bg-gradient-to-r from-red-600 via-red-500 to-slate-400",
  Mexican: "bg-gradient-to-r from-green-700 via-red-600 to-slate-400",
};

const CuisinePage = () => {
  const { name } = useParams<{ name: string }>();

  const {
    data: cuisines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cuisineRecipes", name],
    queryFn: () => getRecipesByCuisine(name!),
    enabled: !!name,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="grid grid-cols-2 cursor-default">
        <div className="flex justify-center md:justify-end items-center col-span-2 md:col-span-1 mt-5 lg:mt-0">
          <div className="text-4xl leading-tight text-center md:text-start lg:text-6xl">
            <div className="font-serif">
              <p>CUISINES</p>
              {name && (
                <p
                  className={`${
                    cuisineGradients[name] || ""
                  } text-transparent bg-clip-text font-bold`}
                >
                  {name.toUpperCase()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-start ms-5">
          {name && cuisineImages[name] && (
            <img
              className="w-2/5 hidden md:block"
              src={cuisineImages[name]}
              alt={name}
            />
          )}
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center p-10">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <ErrorDisplay error={error} />
        ) : (
          <div className="flex flex-wrap justify-center gap-4 mx-0 xl:mx-60 p-3">
            {cuisines?.map((item) => (
              <Link to={`/recipe/${item.id}`} key={item.id}>
                <RecipeCard title={item.title} image={item.image} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CuisinePage;
