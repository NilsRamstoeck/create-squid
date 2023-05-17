import { app } from "squid-ssr";

const port = Number.parseInt(process.env.SQUID_PORT ?? '0') || 3000;

app.listen(port, () => {
  console.log(`✅ Express server listening on port ${port}`);
});