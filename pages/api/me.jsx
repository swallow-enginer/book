import Auth0 from '~//src/lib/auth0/auth0';

export default async function me(req, res) {
  try {
    await Auth0.handleProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
