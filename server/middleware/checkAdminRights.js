const Users=require("../models/User")

const checkAdminRights = (req, res, next) => {
    Users.findOne({email: req.user.name})
    .then(response => {
        if(response._doc.isAdmin){
            next()
        }
        else{
            res.json({message: "No admin rights"})
        }
        
    })
    .catch(err => {
        res.json({message: "Error"})
    })
}

module.exports = checkAdminRights