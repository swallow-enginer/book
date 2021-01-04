import Auth0 from '~//src/lib/auth0/auth0';
import AppConst from '~/src/lib/appConst';

export default async function login(req, res) {
  try {
    await Auth0.handleLogin(req, res, {
      redirectTo: req.query.redirectTo? req.query.redirectTo : AppConst.URL.HOME
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

