import { motion } from "framer-motion";

function CategoryItem({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  return (
    <div className="flex flex-col items-center ">
      <motion.img
        transition={{
          duration: 0.35,
        }}
        whileHover={{
          scale: 1.05,
        }}
        src={image}
        className="h-36 w-36"
      />
      <p className="text-lg">{name}</p>
    </div>
  );
}

export default CategoryItem;
