//
// SecureImage
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Jason Leach on 2018-01-10.
//

/* eslint-env es6 */

'use strict';

import cors from 'cors';
import passport from 'passport';
import agreement from './routes/agreement';
import client from './routes/client';
import district from './routes/district';
import ehlo from './routes/ehlo';
import plan from './routes/plan';
import reference from './routes/reference';
import report from './routes/report';
import user from './routes/user';
import zone from './routes/zone';
import feedback from './routes/feedback';
import version from './routes/version';

const corsOptions = {
  // origin: config.get('appUrl'),
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.use('/api/v1/ehlo', ehlo); // probes
  app.use('/api/v1/version', version); // app versions
  // authentication middleware for routes.
  app.use(passport.authenticate('jwt', { session: false }));
  app.use('/api/v1/agreement', agreement);
  app.use('/api/v1/client', client);
  app.use('/api/v1/district', district);
  app.use('/api/v1/plan', plan);
  app.use('/api/v1/reference', reference);
  app.use('/api/v1/zone', zone);
  app.use('/api/v1/report', report);
  app.use('/api/v1/user', user);
  app.use('/api/v1/feedback', feedback);
};