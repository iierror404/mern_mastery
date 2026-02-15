import User from "../models/User.js";

/**
 * @desc Get All Users For Admin
 * @route GET /api/admin/users/all
 */
export const getAllUsersCtrl = async (req, res) => {
  try {
    const users = await User.find();
    if (!users)
      return res.status(200).json({
        success: true,
        message: "No Users in Database.",
      });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error in AllUsersController: \n", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc Change User Account Status
 * @route PUT /api/admin/users/status/:id
 */
export const userAccountStatusCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountStatus } = req.body;

    if (!id)
      return res.status(400).json({
        success: false,
        message: "No User ID Provided.",
      });

    const user = await User.findById(id);

    if (!user)
      return res.status(400).json({
        success: false,
        message: "No User With This ID.",
      });

    user.accountStatus = accountStatus;
    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in User Account Status Controller: \n", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc Delete User Account
 * @route DELETE /api/admin/users/delete/:id
 */
export const deleteUserCtrl = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        success: false,
        message: "No User ID Provided.",
      });

    const user = await User.findByIdAndDelete(id);

    if (!user)
      return res.status(400).json({
        success: false,
        message: "No User With This ID.",
      });

    res.status(200).json({
      success: true,
      message: "User Account Deleted Successfully.",
    });
  } catch (error) {
    console.log("Error in Delete User Account Controller: \n", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
