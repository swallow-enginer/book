import Auth0 from '~//src/lib/auth0/auth0';

export default async function logout(req, res) {
  try {
    await Auth0.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
