import { Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <div className="flex items-center h-[calc(100vh-64px)] ">
      <Spinner colorScheme="green" size={"lg"} />
    </div>
  );
}

export default Loading;
