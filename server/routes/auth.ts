import { Router, Request, Response } from 'express';
import passport from 'passport';
import User from '../entities/User';

const router = Router();

router.get(
  '/login',
  async (req, res, next) => {
    if (req.session && req.session.passport && req.session.passport.user) {
      const user = await User.findById(req.session.passport.user);
      if (user) {
        return res.redirect('/');
      }
    }
    next();
  },
  passport.authenticate('auth0', {
    scope: 'openid email profile',
  }),
  (req: Request, res: Response) => {
    res.redirect('/');
  }
);

router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/auth/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const returnTo = req.session!.returnTo;
      delete req.session!.returnTo;
      res.redirect(returnTo || '/auth/success');
    });
  })(req, res, next);
});

router.get('/success', (req, res) => {
  res.status(200).send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Authorized</title>
    </head>
    <body>
      <h2>You are authorized.</h2>
  
      <script>
        window.onload = window.close();
        const originUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : window.location.origin;
        window.opener.postMessage('SUCCESS', originUrl);
      </script>
    </body>
  </html>
  
    `);
});

export default router;
