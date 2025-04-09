import express from "express"
import { addProvider, listProviders, removeProvider } from "../controllers/providerController.js"

const providerRouter = express.Router()

providerRouter.post("/add", addProvider)
providerRouter.post("/remove", removeProvider)
providerRouter.get("/list", listProviders)

export default providerRouter;