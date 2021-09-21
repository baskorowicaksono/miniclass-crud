const { User } = require("../models");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

// Registration
module.exports.register = async(req, res, next) => {
    // Register Validation
    const { error } = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
        // Properties from req.body
        const { name, email, phone_number, password } = req.body;

        // Checking if the email already exist
        const emailExist = await User.findAll({where: {email: req.body.email}});
        if(emailExist.length != 0){
            next(new Error("Email already used"));
        }
        // Checking the amount of superadmin
        const duplicateSuperAdmin = await User.findAll({where: {role: "superadmin"}});
        const role = req.body.role || "user";
        if(role === "superadmin"){
            if(duplicateSuperAdmin.length != 0){
                next(new Error("Superadmin already exist"));
            }
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try{    // Create a new user
            const savedUser = await User.create({
                name: name,
                email: email,
                phone_number: phone_number,
                password: hashedPassword,
                role: role
            })
            const token = jwt.encode(savedUser, process.env.ACCESS_TOKEN_SECRET);
            res.json({
                savedUser,
                success: true,
                token: `JWT ${token}`
            });
            res.status(200).send(savedUser);
        } catch(err){
            next(err);
        }
}

// Login
module.exports.login = async(req, res, next) => {
    // Login Validation
    const { error } = loginValidation(req.body);
    if(error) {
        next(new Error(error.details[0].message));
    }

    // Checking if the email doesn't exist
    const user = await User.findAll({where: {email: req.body.email}});
    if(user.length === 0){
        next(new Error("Email is not found"));
    }
    // Password validation
    await bcrypt.compare(req.body.password, user[0].password, (err, data) => {
        if(err){
            next(new Error(err));
        }
        if(data){
            const token = jwt.encode({uuid: user[0].uuid, role: user[0].role}, process.env.ACCESS_TOKEN_SECRET);
            res.json({
                success: true,
                token: `JWT ${token}`
            });
        }
        else{
            return res.json({
                success: false,
                message: "Invalid Password"
            })
        }
    });
}

// Get all users
module.exports.getUsers = async(req, res) => {
    try{
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch(err){
        if(err){
            console.log(err);
            return res.status(500).json({message: "Something went wrong..."});
        }
    }
}

// Get users by specific UUID
module.exports.getUser = async(req, res) => {
    try{
        const userId = req.params.userId;
        const users = await User.findAll({where:{uuid:userId}});
        return res.status(200).json(users);
    } catch(err){
        if(err){
            console.log(err);
            return res.status(500).json({message: "Something went wrong..."});
        }
    }
}

// Updating user password, and finding user data based on the UUID
module.exports.updateUserPassword = async(req, res) => {
    try{
        const newPassword = req.params.newPassword;
        const hashedPassword = hashPassword(newPassword);
        const userId = req.params.userId;
        const theUser = await User.update({password : hashedPassword},{
            where : {
                uuid: userId
            }
        });
        return res.status(200).send({
            data: theUser,
            message: "Password has been updated"
        });
    } catch(err){
        if(err){
            console.log(err);
            return res.status(500).json({message: "Something went wrong..."});
        }
    }
}

// Delete a specific user, identified by UUID
module.exports.deleteUser = async(req, res) => {
    try{
        const userId = req.params.userId;
        await User.destroy({where: {uuid: userId}});
        return res.status(200).json({
            data: null,
            message: "User has been deleted"
        });
    } catch(err){
        if(err){
            console.log(err);
            return res.status(500).json({message: "Something went wrong..."});
        }
    }
}

// Delete all user, except superadmin
module.exports.deleteAllUsers = async(req, res) => {
    try{
        await User.destroy({
            where: {role: "user"}
        });
        return res.status(200)
                  .json({
                      data: null,
                      message: "All user has been deleted"
                  });
    } catch(err){
        if(err){
            console.log(err);
            return res.status(500)
                      .json({
                          message: "Something went wrong..."
                      });
        }
    }
}



