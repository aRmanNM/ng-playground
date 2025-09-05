import 'zone.js/dist/zone-node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
const bodyParser = require('body-parser');
import { existsSync } from 'fs';
import { join } from 'path';

const jwt = require("jsonwebtoken");

import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/playground/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.use(bodyParser.json());

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  //
  // sse api endpoint
  //
  server.get('/api/report', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
      for await (const report of generateReports()) {
        res.write(`data: ${JSON.stringify(report)}\n\n`);
      }
      res.end();
    } catch (err) {
      console.error("Error streaming reports:", err);
      res.end();
    }
  });

  // sample user:
  const user = {
    id: 1,
    username: "guest",
    password: "guest"
  };

  //
  // token api
  //
  server.post('/api/token', async (req, res) => {
    const { username, password } = req.body;

    if (username !== user.username || password !== user.password) {
      res.status(401).json({
        success: false,
        message: 'invalid username or password'
      });

      return;
    }

    // generate token
    const secretKey = process.env.SECRET_KEY ?? "sample-secret-key";
    const options = {
      expiresIn: '1m'
    };

    const token = jwt.sign({ sub: user.id, name: user.username }, secretKey, options);

    res.json({
      success: true,
      message: "auth success",
      token: token,
    });
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  const universalRoutes = ['/ssr'];

  // All regular routes use the Universal engine
  server.get(universalRoutes, (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  server.get('*', (req, res) => {
    res.sendFile(join(distFolder, 'index.html'));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

async function* generateReports() {
  for (let i = 1; i <= 10; i++) {
    // Simulate an async calculation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Yield a new report object
    yield {
      id: i,
      from: (new Date(new Date().getDate() - (10 - i + 1))).toISOString(),
      to: (new Date(new Date().getDate() - (10 - i))).toISOString(),
      averageScore: Math.random() * 20,
      successPercentage: Math.random() * 100,
    };
  }
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
