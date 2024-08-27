import { AlertTriangleIcon } from "lucide-react";
import { motion } from "framer-motion";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-66px)]">
      <div className="flex flex-col gap-y-2 justify-center items-center text-red-500">
        <motion.b
          initial={{
            rotate: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          whileInView={{
            rotate: 360,
            opacity:1,
          }}
        >
          <AlertTriangleIcon className="size-48" />
        </motion.b>
        <b>Not Found Page</b>
      </div>
    </div>
  );
}

export default NotFoundPage;
