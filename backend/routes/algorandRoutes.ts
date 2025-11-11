import { Router } from "express";
import { sendAlgo, getTxStatus, listTransactions } from "../controllers/algorandController.js";

const router = Router();

router.post("/send", sendAlgo);
router.get("/status/:txId", getTxStatus);
router.get("/transactions", listTransactions);

export default router;



