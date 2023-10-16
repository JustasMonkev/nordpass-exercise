import {createHmac} from 'crypto';

export function generateHMACSignature(signatureKey: string, nonce: string, method: string, path: string): string {
    const message = `${method} ${path}`;
    return createHmac('sha256', signatureKey).update(message + nonce).digest('hex');
}
