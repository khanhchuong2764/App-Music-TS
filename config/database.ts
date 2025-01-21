import mongoose from "mongoose";

export const connect = async ():Promise<void> => {
    try {   
        await mongoose.connect(process.env.Mongourl);
        console.log("connect success");
    } catch (error) {
        console.log("connect error");
    }
}