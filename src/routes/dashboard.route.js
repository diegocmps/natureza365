const { Router } = require("express");
const DashboardController = require("../controllers/DashboardController");

const dashboardRoutes = Router();

dashboardRoutes.get('/', DashboardController.home);

module.exports = dashboardRoutes;