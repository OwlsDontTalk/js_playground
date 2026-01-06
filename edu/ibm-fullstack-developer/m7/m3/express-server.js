import express from 'express';

const app = express();
const host = '0.0.0.0';
const port = Number(process.env.EXPRESS_PORT) || 4000;

const PLANTS = [
  { id: 1, name: 'Monstera Deliciosa', light: 'Bright, indirect' },
  { id: 2, name: 'Snake Plant', light: 'Low to bright' },
  { id: 3, name: 'Peace Lily', light: 'Medium' },
];

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Express API demo' });
});

app.get('/plants', (_req, res) => {
  res.json({ count: PLANTS.length, items: PLANTS });
});

app.post('/orders', (req, res) => {
  const { customer = 'Guest', plantId } = req.body ?? {};
  const plant = PLANTS.find((item) => item.id === Number(plantId));

  if (!plant) {
    res.status(400).json({ error: 'Unknown plantId. Try 1, 2, or 3.' });
    return;
  }

  res.status(201).json({
    message: `Order placed for ${plant.name}.`,
    customer,
    plant,
  });
});

app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.path}` });
});

app.listen(port, host, () => {
  console.log(`Express demo server ready at http://${host}:${port}/`);
});
