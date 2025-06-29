import ProductModel from "@/models/Product.model";
import { NextResponse } from "next/server";

export  async function GET(request) {
    
   try {
     let dealOfTheDayProduct=await ProductModel.findOne({}).sort({ratting:-1})
 
     return NextResponse.json({data:dealOfTheDayProduct})
     
   } catch (error) {
        return NextResponse.json({message:"Internal server error"})
   }
    
}