import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, Tab, Chip, Card, Spinner, Image } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { GiMeat, GiBroccoli } from "react-icons/gi";
import { IoFlame } from "react-icons/io5";
import { MdOutlineWaterDrop } from "react-icons/md";
import ErrorDisplay from "../components/ErrorDisplay";
import { getRecipeWithNutrition } from "../services";

const RecipeDetailsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("summary");
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipeDetails", id],
    queryFn: () => getRecipeWithNutrition(id!),
    enabled: !!id,
  });

  const detail = data?.detail;
  const nutrition = data?.nutrition;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!detail) {
    return null;
  }

  return (
    <motion.div
      className="lg:w-full xl:w-4/5 m-auto cursor-default grid grid-rows-1 grid-cols-1 lg:grid-cols-2 mt-5 lg:mt-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div>
        <p className="font-serif text-6xl font-black p-5 md:px-10 text-center lg:text-start text-primary">
          {detail.title}
        </p>
        <div className="md:px-10 flex flex-wrap justify-center xl:justify-start text-center lg:text-start gap-1">
          {detail.dishTypes?.map((type) => (
            <Chip key={type} color="primary" variant="bordered" size="sm">
              {type}
            </Chip>
          ))}
        </div>
        <div className="flex flex-col items-center xl:items-start px-5 sm:px-10 p-5">
          <Tabs
            aria-label="Recipe Info"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
            variant="underlined"
            classNames={{
              tabList: "gap-6",
            }}
          >
            <Tab key="summary" title="Summary">
              <div className="mt-4">
                <p
                  className="text-sm text-justify"
                  dangerouslySetInnerHTML={{ __html: detail.summary }}
                ></p>
              </div>
            </Tab>
            <Tab key="ingredients" title="Ingredients">
              <div className="mt-4 space-y-2">
                {detail.extendedIngredients?.slice(0, 10).map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <span className="w-28 font-medium">{item.name}</span>
                    <span>
                      {Number.isInteger(item.amount)
                        ? item.amount
                        : item.amount.toFixed(1)}{" "}
                      {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab key="howto" title="How to">
              <div className="mt-4">
                {detail.analyzedInstructions?.map((instruction, idx) => (
                  <div key={idx} className="relative pl-4">
                    <div className="absolute h-full border border-opacity-20 border-primary left-4"></div>
                    {instruction.steps.map((step) => (
                      <div
                        key={step.number}
                        className="flex items-start w-full my-3 -ml-1.5"
                      >
                        <div className="w-8 z-10 flex-shrink-0">
                          <div className="w-3.5 h-3.5 bg-primary rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{step.step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      <div className="flex-col flex items-center m-5">
        <Image
          className="order-2 xl:order-1 w-full my-4 rounded-2xl shadow-lg"
          src={detail.image}
          alt={detail.title}
        />
        <div className="order-1 lg:order-2 grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 m-3">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <IoFlame className="text-4xl text-orange-500" />
              <div>
                <p className="text-sm text-default-500">Calories</p>
                <p className="font-bold text-lg">{nutrition?.calories}</p>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <GiMeat className="text-4xl text-red-500" />
              <div>
                <p className="text-sm text-default-500">Protein</p>
                <p className="font-bold text-lg">{nutrition?.protein}</p>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <GiBroccoli className="text-4xl text-green-500" />
              <div>
                <p className="text-sm text-default-500">Carbs</p>
                <p className="font-bold text-lg">{nutrition?.carbs}</p>
              </div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <MdOutlineWaterDrop className="text-4xl text-yellow-500" />
              <div>
                <p className="text-sm text-default-500">Fat</p>
                <p className="font-bold text-lg">{nutrition?.fat}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetailsPage;
