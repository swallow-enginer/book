import auth0 from '~//src/lib/auth0/auth0';



export default async function login(req, res) {
  var option = {
    authParams: {
      login_hint: "signUp",
      ui_locales: 'nl',
      scope: 'some other scope',
      foo: 'bar',
      display: 'signUp',
    },
    getState: (req) => {
      return {
        redirectTo: '/other-url'
      };
    }
  }
  try {
    await auth0.handleLogin(req, res, option);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

