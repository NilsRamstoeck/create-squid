import type { SquidApiRequest, Response } from 'squid';

const methods = {
  GET: (req: SquidApiRequest, res: Response) => _get(req, res),
  HEAD: (req: SquidApiRequest, res: Response) => _head(req, res),
  POST: (req: SquidApiRequest, res: Response) => _post(req, res),
  PUT: (req: SquidApiRequest, res: Response) => _put(req, res),
  DELETE: (req: SquidApiRequest, res: Response) => _delete(req, res),
  UPDATE: (req: SquidApiRequest, res: Response) => _update(req, res),
  OPTIONS: (req: SquidApiRequest, res: Response) => _options(req, res),
  TRACE: (req: SquidApiRequest, res: Response) => _trace(req, res),
};

export default async function handler(req: SquidApiRequest, res: Response) {
  const method = req.method ?? 'GET';
  if (Object.hasOwn(methods, method))
    await methods[method as keyof typeof methods](req, res);
}

async function _get(req: SquidApiRequest, res: Response) {
  res.status(200).json({
    hello: req.queryParams.thing
  });
}

async function _post(req: SquidApiRequest, res: Response) {
  res.status(500).send('Method does not exist for this route');
}

async function _put(req: SquidApiRequest, res: Response) {
  res.status(500).send('Method does not exist for this route');
}

async function _delete(req: SquidApiRequest, res: Response) {
  res.status(500).send('Method does not exist for this route');
}

async function _head(req: SquidApiRequest, res: Response<any>) {
  res.status(500).send('Method does not exist for this route');
}
async function _update(req: SquidApiRequest, res: Response<any>) {
  res.status(500).send('Method does not exist for this route');
}

async function _trace(req: SquidApiRequest, res: Response<any>) {
  res.status(500).send('Method does not exist for this route');
}

async function _options(req: SquidApiRequest, res: Response) {
  res.status(500).send('Method does not exist for this route');
}
