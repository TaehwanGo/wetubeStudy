export const localsMiddleware = (req, res, next) => {
    res.locals.siteTitle = "Tony Movies";
    next();
  };
  