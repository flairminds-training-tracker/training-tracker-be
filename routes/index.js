const routesMap = {
    "/user": require('./userRouter')['userRouter'],
    "/tech": require('./technologyRouter')['technologyRouter'],
    "/acti": require('./activitiesRouter')['activitiesRouter'],
    "/trainee": require('./traineeRouter')['traineeRouter'],
    "/trainingPlan": require('./trainingPlanRouter')['trainingPlanRouter']
}

module.exports = { routesMap }