
export const toastOption = (
  status: "error" | "success",
  description: string
) => {
  const position: "top" = "top";
  if (status === "error")
    return {
      status,
      duration: 3000,
      description,
      position,
    };
  else
    return {
      status,
      duration: 3000,
      description,
      position,
      colorScheme: "yellow",
    };
};

