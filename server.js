import { default as server } from './app';

const { app } = server;
const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
