export const catchAsyncErrors = (theFunction) => {
<<<<<<< HEAD
    return (req, res, next) => {
      Promise.resolve(theFunction(req, res, next)).catch(next);
    };
  };
  
=======
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
>>>>>>> 6ebb4cb1eda6464260e326b98b123f73a0eb1869
