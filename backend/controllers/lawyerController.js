import lawyerModel from "../models/lawyerModel.js";
//import {changeAvailability} from '../controllers/lawyerController.js';



const changeAvailability = async(req,res) => {
    try{

        const {lawId} = req.body
        const lawData = await lawyerModel.findById(lawId)
        await lawyerModel.findByIdAndUpdate(lawId,{available: !lawData.available})
        res.json({success:true,message: "Availability Changed"})

        
    } catch (error){
        console.log(error);
        res.json({ success:false, message:error.message })
    }
}
export {changeAvailability}