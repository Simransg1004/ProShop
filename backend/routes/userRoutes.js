import express from "express"
import { authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser } from "../contollers/userController.js"

const router = express.Router()

router.route("/").post(registerUser).get(getUsers)

router.post("/login", authUser)
router.post("/logout", logoutUser)

router.route("/profile").get(getUserProfile).post(updateUserProfile)

router.route("/:id").delete(deleteUser).get(getUserById).post(updateUser)
export default router