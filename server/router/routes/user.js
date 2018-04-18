
//
// MYRA
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
// Created by Kyubin Han on 2018-04-12.
//

/* eslint-env es6 */

'use strict';

import { Router } from 'express';
import { asyncMiddleware, errorWithCode } from '../../libs/utils';

import config from '../../config';
import DataManager from '../../libs/db';

const dm = new DataManager(config);
const {
  User,
} = dm;

const router = new Router();

// Get
router.get('/', asyncMiddleware(async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users).end();
  } catch (error) {
    throw error;
  }
}));

module.exports = router;