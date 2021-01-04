import Auth0 from '~//src/lib/auth0/auth0';
import AppConst from '~/src/lib/appConst';

export default async function callback(req, res) {
  try {
    await Auth0.handleCallback(req, res, {redirectTo: AppConst.URL.HOME});
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}