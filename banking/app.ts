import express from "express";
import { PaymentService } from "./paymentService";
import { EODService } from "./eodService";

const app = express();
app.use(express.json());

app.post("/eod", async (req, res) => {
  const { loanId, date } = req.body;

  await EODService.runInterestAccrual(loanId, date);

  res.send({ status: "EOD completed" });
});

app.post("/payment", async (req, res) => {
  const { loanId, date, amount } = req.body;

  try {
    const result = await PaymentService.processPayment(
      loanId,
      date,
      amount
    );
    res.send(result);
  } catch (e: any) {
    res.status(400).send({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});