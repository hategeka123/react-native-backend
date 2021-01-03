const AppError = require("./errorController");
const Food = require("../models/food");
const cloudinary = require('cloudinary').v2;
const Restaurant = require("../models/restaurant");
const cloudinaConfig = require('../middlewares/cloudinary');
const ITEM_PER_PAGE = 50;
/**
 * PUBLIC ACCESS
 */
exports.addFood =async (req, res) =>{
  console.log("sending ...");

  const food  = new Food ({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    images:req.body.images
    });
  await food.save((err, data)=>{
      if(err){
       console.log(err.message + " which errors")
      }
      return res.status(201).json({
        status:201,
        message: "successfully created product.",
        data: data
        })
    })

//   cloudinary.config(cloudinaConfig)
//   const files = req.files.images
//   console.log(files)
//    cloudinary.uploader.upload(files.tempFilePath, async (results, err) => {
//      console.log("file")   
//       if(err) {
//         console.log(err + "  check error here")
//         return res.status(400).json({error:err.message})
//       }
//   console.log(" This is a link of file uploaded  ....." + results.url)
//       const food  = new Food ({
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         images:results.url
//         });
//       await food.save((err, data)=>{
//           if(err){
//            console.log(err.message + " which errors")
//           }
//           return res.status(201).json({
//             status:201,
//             message: "successfully created article.",
//             data:data
//             })
//         })
// })
};

