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
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(registerUser).get(protect, admin, getUsers)

router.post("/login", authUser)
router.post("/logout", logoutUser)

// protected routes
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)

// admin routes
router.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router