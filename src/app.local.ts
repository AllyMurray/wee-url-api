import app from './components/app';
import { PORT } from './config';

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
