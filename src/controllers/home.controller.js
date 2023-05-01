export default (function homeController() {
  return {
    index(req, res) {
      return res.status(200).json({
        test: 'ok',
      });
    },
  };
}());
