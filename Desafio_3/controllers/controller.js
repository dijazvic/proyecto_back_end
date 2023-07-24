import express, {response, request} from "express";
import { getProductByIdService, getProductsService } from "../services/service.js";

export const getProductsController = async (req=request, res=response) =>{
    try {
        const { limit } = req.query
        const data = await getProductsService(Number(limit))
        return res.status(200).json(data)
    } catch (error) {
        return res.status(error.httpcode).json({error})
    }
}

export const getProductByIdController = async (req=request, res=response)=>{
    try {
        const { id } = req.params
        const data = await getProductByIdService(Number(id))
        return res.status(200).json(data)
    } catch (error) {
        return res.status(error.httpcode).json({error})
    }
}