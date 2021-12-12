import { Request } from 'express';
import * as admin from 'firebase-admin';
import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import AuthorizationError from '../../utils/error/AuthorizationError';
import * as serviceAccount from './praha-firebase-authentication-firebase-adminsdk.json';

export default class FirebaseAdmin {
  private readonly serviceAccount: ServiceAccount;

  constructor() {
    this.serviceAccount = serviceAccount as ServiceAccount;
  }

  public initialize() {
    return initializeApp({
      credential: admin.credential.cert(this.serviceAccount),
    });
  }

  public async getUIdIfVerifyToken(token: string): Promise<string> {
    return await admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => decodedToken.uid)
      .catch((error) => {
        console.log(`Can not verify the requested token. token: ${token}`);
        throw new AuthorizationError(error);
      });
  }

  public getAuthorizationToken(request: Request): string {
    const authorizationToken = request.headers.authorization;
    if (authorizationToken) {
      return authorizationToken.split(' ')[1];
    }

    throw new AuthorizationError('Can not get authorization token');
  }
}
