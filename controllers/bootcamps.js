const Bootcamp= require('../models/Bootcamp');

//@desc Get all Bootcamps
//@route GET /api/v1/bootcamps
//@access Private
exports.getBootcamps=async (req,res,next)=>{
    try{
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            count:bootcamps.length,
            data: bootcamps
        });

    }
    catch(err){
        res.status(400).json({
            success: false
        });
    }
}

//@desc Get single Bootcamps
//@route GET /api/v1/bootcamps/:id
//@access Private
exports.getBootcamp=async(req,res,next)=>{
    try{
        const bootcamp =await Bootcamp.findById(req.params.id);

        if(!bootcamp){
            return res.status(400).json({success:false});
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        });
    }
    catch(err){
        res.status(400).json({
            success: false
        });
    }
}

//@desc Create new Bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp= async (req,res,next)=>{
    try{
        const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    });

    }
    catch{
        res.status(400).json({
            success: false
        });

    }
};

//@desc Update Bootcamp
//@route UPDATE /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp=async (req,res,next)=>{
    try{
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!bootcamp){
            return res.send(400).json({success: false});
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        });

    }
    catch(err){
        res.status(400).json({
            success: false
        });
    }
}

//@desc Delete Bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp=async(req,res,next)=>{
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp){
            return res.send(400).json({success: false});
        }
        res.status(200).json({
            success: true,
            data: {}
        });

    }
    catch(err){
        res.status(400).json({
            success: false
        });
    }
}