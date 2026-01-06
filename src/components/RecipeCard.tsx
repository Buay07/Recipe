import { Card, CardFooter, Image } from "@heroui/react";

interface RecipeCardProps {
  title: string;
  image: string;
}

const RecipeCard = ({ title, image }: RecipeCardProps) => {
  return (
    <Card
      isFooterBlurred
      className="w-full h-[14rem] xl:h-80 xl:w-[18rem] col-span-12 sm:col-span-7  cursor-pointer"
    >
      <Image
        removeWrapper
        alt={title}
        className="z-0 w-full h-full object-cover"
        src={image}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <p className="text-white text-small font-medium text-center w-full">
          {title}
        </p>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
