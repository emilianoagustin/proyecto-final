export default (req, res) => {
  res.status(404).json({ error: "Not Found" });
};
