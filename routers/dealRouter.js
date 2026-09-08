const express=require("express")
const Deal=require("../models/deal")
const Car = require("../models/cars");
const checkAdmin=require("../middleware/checkAdmin")
const checkLogin=require("../middleware/checkLogin")



const router=express.Router()

router.get("/", async (req, res) => {
    try {

        const deals = await Deal.find()
            .populate("car");

        res.status(200).json({
            deals
        });

    } catch (error) {

        res.status(500).json({
            msg: "Server error",
            error: error.message
        });

    }
});


router.get("/:id", async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id)
            .populate("car");

        if (!deal) {
            return res.status(404).json({
                msg: "Deal not found"
            });
        }

        res.json({
            deal
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
});



router.post("/", checkLogin, checkAdmin, async (req, res) => {
    try {
        const deal = new Deal(req.body);

        await deal.save();

        const populatedDeal = await deal.populate("car");

        res.status(201).json({
            msg: "Deal created successfully",
            deal: populatedDeal
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
});


router.put("/:id", checkLogin, checkAdmin, async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("car");

        if (!deal) {
            return res.status(404).json({
                msg: "Deal not found"
            });
        }

        res.json({
            msg: "Deal updated successfully",
            deal
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
});


router.delete("/:id", checkLogin, checkAdmin, async (req, res) => {
    try {
        const deal = await Deal.findByIdAndDelete(req.params.id);

        if (!deal) {
            return res.status(404).json({
                msg: "Deal not found"
            });
        }

        res.json({
            msg: "Deal deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
});


module.exports = router;