import { default as server } from './app';

const { app } = server;
const port = process.env.PORT;
app.listen(port);

export default app;
