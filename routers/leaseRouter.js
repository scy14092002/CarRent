const express=require("express")
const Lease=require("../models/lease")
const Deal=require("../models/deal")
const checkAdmin=require('../middleware/checkAdmin')
const checkLogin=require('../middleware/checkLogin')

const router=express.Router()
router.post("/",checkLogin,async(req,res)=>{
    try{ 
        const {car,deal,startDate,endDate}=req.body;
        const dealData=await Deal.findById(deal)
        if(!dealData){
            return res.status(404).json({
                msg:"Deal is not found"
            })
        }
        if(dealData.car.toString()!==car){
            return res.status(404).json({
                msg:"The deal does not belong to this car"
            })
        }
        const existingLease = await Lease.findOne({
          car: car,
           status: { $in: ["pending", "active"] },
         startDate: { $lt: endDate },
         endDate: { $gt: startDate }
       });

       if (existingLease) {
       return res.status(409).json({
        msg: "Car is not available for these dates"
        });
         }

        const lease= new Lease({
            user:req.user.userId,
            car,deal,startDate,endDate
        })
        await lease.save();
        const populatedLease = await lease.populate([
    { path: "user", select: "-password" },
    { path: "car" },
    { path: "deal" }
        ]);
        res.status(201).json({
            msg:"Lease crated successfully "
            ,
            lease:populatedLease
        })


    }
    catch(error){
        res.status(500).json({
            msg:"Server side error",
            error:error.message
        })

    }
})
router.get("/my",checkLogin,async(req,res)=>{
    try{
        const leases=await Lease.find({
            user:req.user.userId
        })
        .populate("car")
        .populate("deal")

        res.status(200).json({
            leases
        })
    }
    catch(error){
        res.status(500).json({
            msg:"Server side error",
            error:error.message
        })

    }
})
router.get("/",checkLogin,checkAdmin,async(req,res)=>{
    try{
        const leases= await Lease.find()
         .populate("user","-password")
         .populate("car")
         .populate("deal")

         res.status(200).json({
            leases
         })



    }
    catch(error){
        res.status(500).json({
            msg:"Server side error",
            error:error.message
                })

    }
})
router.get("/availability/:carId",checkLogin,async(req,res)=>{
    try{
        const today =new Date()
        const lease = await Lease.findOne({
            car:req.params.carId,
            status:{$in :["pending","active"]},
            startDate:{$lte:today},
            endDate:{$gt:today}
        }).sort({endDate:1});
        if(!lease){
            return res.status(200).json({
                available:true
            }
            )
        }
        res.status(200).json({
            available:false,
            startDate:lease.startDate,
            endDate:lease.endDate
        })

    }
    catch(error){
        res.status(500).json({
            msg:"Server side error",
            error:error.message
        })

    }
})
router.put("/:id/approve", checkLogin, checkAdmin, async (req, res) => {
    try {
        const lease = await Lease.findById(req.params.id);

        if (!lease) {
            return res.status(404).json({
                msg: "Lease not found"
            });
        }

        if (lease.status !== "pending") {
            return res.status(400).json({
                msg: "Only pending leases can be approved"
            });
        }

        lease.status = "active";

        await lease.save();

        const populatedLease = await lease.populate([
            { path: "user", select: "-password" },
            { path: "car" },
            { path: "deal" }
        ]);

        res.status(200).json({
            msg: "Lease approved successfully",
            lease: populatedLease
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Server side error",
            error: error.message
        });
    }
});
router.put("/:id/rejected",checkLogin,checkAdmin, async(req,res)=>{
    try{
        const lease =await Lease.findById(req.params.id);
        if(!lease){
             return res.status(404).json({
                msg:"Lease not found"

            })
            
        }
        if(lease.status!=="pending"){
            return res.status(400).json({
                msg:"Only pending leases can be rejected"
            })
        }
        lease.status="rejected"
        await lease.save();
        const populatedLease=await lease.populate([
            {path:"user",select:"-password"},
            {path:"car"},
            {path:"deal"}
        ])
        res.status(200).json({
            msg:"Lease rejected successfully",
            lease:populatedLease
        })
    }
    catch(error){
        res.status(500).json({
            msg:"Server side error",
            error:error.message
        })

    }
})
router.put("/:id/cancel", checkLogin, async (req, res) => {
    try {
        const lease = await Lease.findById(req.params.id);

        if (!lease) {
            return res.status(404).json({
                msg: "Lease not found"
            });
        }

        if (lease.user.toString() !== req.user.userId) {
            return res.status(403).json({
                msg: "You can only cancel your own lease"
            });
        }

        if (lease.status !== "pending" && lease.status !== "active") {
            return res.status(400).json({
                msg: "Only pending or active leases can be cancelled"
            });
        }

        lease.status = "cancelled";

        await lease.save();

        const populatedLease = await lease.populate([
            { path: "user", select: "-password" },
            { path: "car" },
            { path: "deal" }
        ]);

        res.status(200).json({
            msg: "Lease cancelled successfully",
            lease: populatedLease
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Server side error",
            error: error.message
        });
    }
});
module.exports = router;

