const {getTrainee } = require('../models/traineeModel.js');

const getTraineeController = async(req , res) =>{
    try {
        const results = await getTrainee();
        console.log(results)
        return res.send(results);
    } catch (error) {
        console.error("Error in get Trainee controller..:", error);
        res.status(500).send("Internal Server Error");
    }
}
// const getTechnologyController = async(req , res) =>{
//     try {
//         const results = await getTechnology();
//         console.log(results);
//         res.send(results);
//     } catch (error) {
//         console.error("Error in get technology controller..:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }
module.exports = {getTraineeController };