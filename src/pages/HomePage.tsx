import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button, Card, Divider } from "@heroui/react";
import food from "../assets/chef1.png";
import food2 from "../assets/chef4.png";
import RecipesHome from "../components/RecipesHome";

const stats = [
  {
    label: "Ingredients",
    value: "2,600+",
    icon: "https://spoonacular.com/application/frontend/images/food-api/landing/vegetarian-food.svg",
  },
  {
    label: "Recipes",
    value: "5,000+",
    icon: "https://spoonacular.com/application/frontend/images/food-api/landing/kitchen.svg",
  },
  {
    label: "Products",
    value: "600K+",
    icon: "https://spoonacular.com/application/frontend/images/food-api/landing/shopping-basket.svg",
  },
  {
    label: "Menu Items",
    value: "115K+",
    icon: "https://spoonacular.com/application/frontend/images/food-api/landing/hamburger.svg",
  },
];

const HomePage = () => {
  return (
    <motion.div
      className="space-y-20 lg:space-y-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[70vh]">
        <div className="space-y-8 text-center md:text-start">
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-8xl font-serif font-black leading-tight tracking-tight">
              Let's Start <br />
              <span className="text-primary italic">Cooking</span> With <br />
              Popular Recipes
            </h1>
          </div>

          <div className="space-y-6 max-w-xl mx-auto md:mx-0">
            <p className="text-lg text-default-500 leading-relaxed">
              Want to learn cook but confused how to start? <br />
              No need to worry again! Explore our curated collection of
              flavor-packed journeys.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/allrecipe">
                <Button
                  size="lg"
                  color="primary"
                  variant="shadow"
                  className="px-10 font-bold"
                >
                  Explore all Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <img
            className="w-full max-w-lg object-contain drop-shadow-2xl"
            src={food}
            alt="Hero recipes"
          />
        </div>
      </section>

      <section className="py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              isHoverable
              className="p-6 border-none bg-default-50 dark:bg-default-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="p-3 bg-white dark:bg-default-200 rounded-2xl shadow-sm">
                  <img
                    src={stat.icon}
                    alt={stat.label}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-default-400 font-bold">
                    {stat.label}
                  </p>
                  <p className="font-serif font-black text-3xl mt-1">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <RecipesHome />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pb-10">
        <div className="order-2 md:order-1 flex justify-center md:justify-start">
          <img
            className="w-full max-w-sm rounded-[3rem] shadow-2xl rotate-3"
            src={food2}
            alt="Cooking joy"
          />
        </div>

        <div className="order-1 md:order-2 text-center md:text-end space-y-6">
          <h2 className="text-4xl lg:text-6xl font-serif font-black leading-tight italic">
            Cooking and share joy{" "}
            <span className="text-primary not-italic">no matter</span> your
            skill level!
          </h2>
          <p className="text-default-500 text-lg max-w-md ml-auto">
            From beginners to kitchen masters, we bring recipes that make every
            meal a celebration.
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
