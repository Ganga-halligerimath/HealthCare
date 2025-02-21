import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";


export const updateUser = async(req,res)=> {
    const id = req.params.id

    try {

        const updateUser =await User.
        findByIdAndUpdate(
            id,{$set:req.body}, 
            {new:true})

        res.status(200).
        json({success:true,
        message:"Successfully updated",
        data:updateUser})
        
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to update"});
    }
};


export const deleteUser = async (req,res) => {
    const id = req.params.id;


    try {
        await User.findByIdAndDelete(id);

        res.status(200)
        .json({
            success:true,
            message:"Successfully deleted",
        });
    } catch (err) {
        res.status(200).json({ success:true, message:"Failed to deleted"});
}
};

export const getSingleUser = async (req,res) => {
    const id = req.params.id;


    try {
        const user = await User.findById(id).select("-password");

        res.status(200)
        .json({
            success:true,
            message:"User found",
            data:user,
        });
    } catch (err) {
        res.status(200).json({ success:false, message:"No user found"});
}
};



export const getAllUser = async (req,res) => {


    try {
        const users = await User.find({}).select("-password");

        res.status(200)
        .json({
            success:true,
            message:"Users found",
            data:users,
        });
    } catch (err) {
        res.status(400).json({ success:false, message:"Not  found"});
}
};

export const getUserProfile = async(req,res)=> {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,DELETE")
    console.log(req.userId);

    try {
        const user = await User.findById(req.userId)


        if(!user){
            return res.status(404).json({success:false, message:"User not found"})
        }
        const {password, ...rest} = user._doc;

        res.status(200).json({success:true, message:"Profile info is getting" ,data:{ ...rest},});

    } catch (err) {
        res.status(500).json({success:false, message:"something went wrong, cannot get"})
    }
};


export const getMyAppointments = async(req,res)=>{

    try {
        
        //step-1 : retrive appointments from booking for specfic user
        const bookings = await Booking.find({user:req.userId})

        //step-2: extract doctor ids from appointment bookings
        const doctorIds = bookings.map(el=>el.doctor.id)

        //step-3 : retrive doctors using doctor ids
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')

        res
        .status(200)
        .json({success:true, 
        message:"Appointments are getting",
        data:doctors,
    });

    } catch (err) {
        res.status(500)
        .json({success:false, 
        message:"Something went wrong ,cannot get"});
    }
};




