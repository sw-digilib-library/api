const User  = require("../models/user");


//GET: Search all user.
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//POST: Insert a user.
exports.create = async (req, res) => {
    const { email } = req.body;
    
    const userEmail = await User.findOne({
        where: { email }
    });

    if (userEmail) {
        res.status(401).json({ error: "Email is invalid or already taken." });
    } else {
        try {
            user = req.body;
            const newUser = await User.create({
                name: user.name,
                email: user.email,
                password: user.password,
                registration: user.registration,
                occupation: user.occupation
            });

            res.json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
};

//PUT: Update user data.
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const payload = {};

        if (!!req.body.name) {
            payload.name = req.body.name;
        }
        if (!!req.body.registration) {
            payload.registration = req.body.registration;
        }
        if (!!req.body.email) {
            payload.email = req.body.email;
        }
        if (!!req.body.occupation) {
            payload.occupation = req.body.occupation;
        }

        const updatedUser = await User.update(payload, {
            where: { id },
        });

        res.json({ success: !!updatedUser && +updatedUser[0] > 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//DELETE: Remove user data.
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.deleteOne({
            where: {
                id,
            },
        });

        res.json({ success: !!deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// Validation functions
//const jwt = require("jsonwebtoken");
//const dotenv = require("dotenv").config();
//const { encryptSHA256 } = require("../auth");
//const TOKEN_SECRET = process.env.TOKEN_SECRET;

// exports.checkLogin = async (req, res) => {

//     const { email, password } = req.body;

//     const user =  await User.findOne({
//         attributes: ["id", "name", "email", "isAdmin"],
//         where: { email, password: encryptSHA256(password) },
//         raw: true,
//     });

//     if (!!user) {
//         const token = jwt.sign({ ...user, sub: user.id }, TOKEN_SECRET);
//         const userId = user.id;
//         res.json({
//             userId,
//             token,
//             sucess: true,
//             error: false,
//         });
//     } else {
//         res.status(401).json({ error: "Email or password is invalid." });
//     }

// };


// exports.changePassword = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { oldPassword, newPassword } = req.body;


//         const user = await User.updateOne(
//             //filter
//             { _id: id, password: encryptSHA256(oldPassword) },
//             //changed value
//             { password: encryptSHA256(newPassword) });

//         if (!!user.modifiedCount <= 0) {
//             res.status(400).json({ error: "Old password is invalid." })
//         }
//         else {
//             return res.status(200).json({ status: true });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// };