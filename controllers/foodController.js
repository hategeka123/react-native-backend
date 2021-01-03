const AppError = require("./errorController");
const Food = require("../models/food");
const Restaurant = require("../models/restaurant");
const cloudinary = require("cloudinary")

const cloudinaConfig = require('../middlewares/cloudinary')
const ITEM_PER_PAGE = 50;
/**
 * PUBLIC ACCESS
 */
exports.addFood = () =>{
  cloudinary.config(cloudinaConfig)

    const file = req.files.images
   cloudinary.uploader.upload(file.tempFilePath, async (results, err) => {
        
      if(err) {
        console.log(err + "  check error here")
        return res.status(400).json({error:err.message})
      }
     
  

  console.log(" This is a link of file uploaded  ....." + results.url)

      const food  = new Food ({
        mane:req.body.name,
        description:req.body.description,
        price:req.body.price,
        images:results.url
        });

      await food.save((err, data)=>{
          if(err){
           console.log(err.message + " which errors")
          }
          return res.status(201).json({
            status:201,
            message: "successfully created article.",
            data
            })
        })
})
};

exports.getAvailableFoods = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalFoods;
  Food.find()
    .countDocuments()
    .then((numbersOfFoods) => {
      totalFoods = numbersOfFoods;
      return Food.find()
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE);
    })
    .then((foods) => {
      return res.status(200).json(foods);
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};

/**
 * Get Top 10 restaurants in specified Area
 */
exports.getTopRestaurants = (req, res, next) => {
  Restaurant.find()
    .populate("foods")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      return AppError.onError(res, "restaurant add error" + err);
    });
};

exports.getAllFoodsFromRestaurant = (req, res, next) => {
  const restaurantId = req.params.id;
  Restaurant.findById(restaurantId)
    .populate("foods")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};

exports.getFoodDetails = (req, res, next) => {
  const foodId = req.params.id;
  Food.findById(foodId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};

exports.getInThirtyMinutes = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalFoods;
  Food.find({ readyTime: { $lt: 31 } })
    .countDocuments()
    .then((numbersOfFoods) => {
      totalFoods = numbersOfFoods;
      return Food.find({ readyTime: { $lt: 31 } })
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE);
    })
    .then((foods) => {
      return res.status(200).json(foods);
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};
