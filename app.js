const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors");
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
});