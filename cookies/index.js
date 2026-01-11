const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

/* ---------- CREATE COOKIE ---------- */
app.get("/set-cookie", (req, res) => {
  res.cookie("myCookie", "hello123", {
    httpOnly: true
  });

  res.send("Cookie created");
});

/* ---------- CHECK COOKIE ---------- */
app.get("/check-cookie", (req, res) => {
  const cookieValue = req.cookies.myCookie;

  if (cookieValue) {
    res.send("Cookie exists: " + cookieValue);
  } else {
    res.send("No cookie found");
  }
});

/* ---------- DELETE COOKIE ---------- */
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("myCookie");
  res.send("Cookie deleted");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
