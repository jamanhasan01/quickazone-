import ProductModel from '@/models/Product.model'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  let { id } = params
  try {
    let product = await ProductModel.findById(id)
    if (!product) {
       return  NextResponse.json({success:false, message:"Product not found"},{status:404})
    }
  return  NextResponse.json({success:true, data:product},{status:200})
  } catch (error) {
    NextResponse.json({success:false, message:"An internal server error"},{status:500})
  }
}
