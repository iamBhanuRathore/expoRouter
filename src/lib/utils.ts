export const catchAsyncErrors = (fn: Function) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      // Handle or log the error
      console.error(
        "An error occurred:",
        error?.response?.data?.message || error.message
      );
      // Return null or any default value if needed
      return null;
    }
  };
};
