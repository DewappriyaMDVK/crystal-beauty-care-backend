import express from 'express'
import { createOder, getOrders } from '../controllers/oderController.js'

const oderRouter = express.Router()

oderRouter.post("/",createOder)
oderRouter.get("/",getOrders)

export default oderRouter;