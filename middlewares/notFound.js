const notFoundMiddleware = () => {
  return (req, res) => {
    res.status(400).json({ message: "Route don't exist" });
  };
};

export default notFoundMiddleware;
