// Debug middleware to identify route registration issues
const debugRoutes = (req, res, next) => {
    console.log(`[DEBUG] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = debugRoutes;
