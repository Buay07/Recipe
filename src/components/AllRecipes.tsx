import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import food from "../assets/chef2.png";
import RecipeCard from "./RecipeCard";
import ErrorDisplay from "./ErrorDisplay";
import { getRandomRecipes } from "../services";

const AllRecipes = () => {
  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allRecipes"],
    queryFn: () => getRandomRecipes(9),
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="grid grid-cols-2 cursor-default">
        <div className="flex justify-center md:justify-end items-center col-span-2 md:col-span-1 mt-10 lg:mt-0 ms-0 lg:ms-10">
          <div className="text-4xl leading-tight text-center md:text-start lg:text-6xl">
            <div className="font-serif">
              <p>Flavors Galore</p>
              <p>Your Recipes,</p>
              <p>Your Way!</p>
            </div>
          </div>
        </div>
        <div className="flex justify-start ms-10">
          <img className="w-1/2 hidden md:block" src={food} alt="recipes" />
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
          <div className="flex flex-wrap justify-center gap-4 mx-0 xl:mx-60 p-5">
            {recipes?.map((item) => (
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

export default AllRecipes;
