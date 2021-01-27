module.exports = function (req, res) {
    res.status(404).json({ message: 'Not found API path' });
};
