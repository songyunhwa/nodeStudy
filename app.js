const express = require('express');
const userRouter = require('./router.js');

const app = express();
const port = process.env.PORT || 4000;

app.use(userRouter); //route 적용하기

app.listen(port, () => {
    console.log('####Express listening on port####', port);
});