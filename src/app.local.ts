import app from './components/app';

const PORT: number = parseInt(process.env.PORT || '5000', 10);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
