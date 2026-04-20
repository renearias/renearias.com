/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
import { createFunction, server } from './api';
import { Express } from 'express';

let serverPromise: Promise<Express> | undefined;

function getServer(): Promise<Express> {
  serverPromise ??= createFunction(server);
  return serverPromise;
}

export const api = onRequest(
  {
    cors: true,
    invoker: 'public',
    memory: '1GiB',
    preserveExternalChanges: true,
    secrets: ['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'CONTACT_EMAIL'],
  },
  async (request, response) => {
    const handler = await getServer();
    return handler(request, response);
  },
);
