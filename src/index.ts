import express, { Application, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import cors from 'cors';

const app: Application = express();

app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("I am ruunning!!!");
});
app.get('/stubs/:id', (req: Request, res: Response) => {
    try {
        const resp = fs.readFileSync('./stubs/' + req.params.id + '.json', 'utf-8');
        res.json(JSON.parse(resp));
    } catch (e) {
        res.json({ status: 404, message: 'not found' });
    }

})
app.listen(9000, '0.0.0.0', () => console.log("Server running on port 9000"));