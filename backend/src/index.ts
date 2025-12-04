import Express, { type Request, type Response } from 'express';
const app = Express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});