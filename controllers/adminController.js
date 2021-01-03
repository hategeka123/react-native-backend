const Food = require("../models/food");
const Restaurant = require("../models/restaurant");
const AppError = require("./errorController");
const User = require("../models/user")

exports.addRestaurant = (req, res, next) => {
  const name = req.body.name;
  const foodType = req.body.foodType;
  const pincode = req.body.pincode;
  const address = req.body.address;
  const phone = req.body.phone;

  const restaurant = new Restaurant({
    name: name,
    foodType: foodType,
    pincode: pincode,
    address: address,
    phone: phone,
  });

  restaurant
    .save()
    .then((restaurant) => {
      return res.json(restaurant);
    })
    .catch((err) => {
      return AppError.onError(res, "restaurant add error" + err);
    });
};
// allUsers
exports.getAllUsers = async (req, res) => {
  const users = await User.find()
  if(!users) return res.status(404).json({message:"Users not found in DB"})
  return res.status(200).json({users: users})
}
// get singleUser
exports.singleUser = async(req, res) => {
  const userId = req.params.id;
  console.log(userId)
  const user = await User.findOne({_id:userId})
  if (!user) return res.status(404).json({status:404, message:"No user with that ID"})
  return res.status(200).json({status:200, user: user}) 
}
// delete seller 
exports.deleteUser = async (req, res) => {
  console.log("delete user")
  const userId = req.params.id;
  const user = await User.findOne({_id:userId})
  console.log(user)
  if (!user) return res.status(404).json({status:404, message:"No user found with that ID"})
 User.deleteOne({_id:userId}).then(() => {
   return res.status(200).json({status:200, message:"User deleted successful"})
 }).catch((error) => res.json({err :error.message}))
}
// Adding Seller
exports.addSeller = async (req, res)=>{
  const id = req.params.id
const {role} = req.body
const user = await User.findOne({_id:id})
if(!user) return res.status(404).json({message:"user not found"})
if(user){
  User.updateOne({_id:user._id},{role}).then(() => {
    res.status(200).json({message:"user added to to the seller"})
  }).catch((er) => console.log(er.message))
}
};

exports.viewAllRestaurant = (req, res, next) => {
  Restaurant.find()
    .then((restaurants) => {
      res.status(200).json(restaurants);
    })
    .catch((err) => {
      return AppError.onError(res, "restaurant add error" + err);
    });
};

exports.addFood = (req, res, next) => {
  const restaurantId = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const price = req.body.price;
  const readyTime = req.body.readyTime;

  let currentRestaurant;

  Restaurant.findById(restaurantId)
    .then((restaurant) => {
      currentRestaurant = restaurant;
      let food = new Food({
        name: name,
        description: description,
        category: category,
        rating: 0,
        price: price,
        images: [],
        readyTime: readyTime,
      });

      return food.save();
    })
    .then((food) => {
      currentRestaurant.foods.push(food);
      return currentRestaurant.save();
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      err.statusCode = 503;
      next(err);
    });
};
