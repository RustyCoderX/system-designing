const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const JWT_SECRET_KEY = 'ayush@20004';

const users = [];

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      id: users.length + 1,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User has been created' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }


  console.log(users);
});




app.post('/login' , async (req,res) =>{

  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }




})

app.listen(5000, () => console.log('Server started on port 5000'));
