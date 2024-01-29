import mongoose from "mongoose";

 export const connection = async () => {
   try{ await mongoose.connect("mongodb://localhost:27017/grapesjs")
        console.log("DB Connected");
   }
    catch (e) {console.error("error: ", e);
  }
}