import { asyncHandler } from "../utils/asyncHandler.util.js";

export const addEmployee = asyncHandler(async (req, res)=>{
    res.send("Weeeeeeeeeeeeeeelcome here");
})