import express from 'express';
import { port } from "./config/env"
import { router } from "./routes/router"

const app = express();

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Server on in port ${port}`);
})
