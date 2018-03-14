//
// MyRA
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
// Created by Jason Leach on 2018-03-13.
//

/* eslint-env es6 */

'use strict';

/* eslint-disable no-unused-vars,arrow-body-style */
const table = 'grazing_schedule_entry';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { sequelize } = queryInterface;

    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      grace_days: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      livestock_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      livestock_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ref_livestock',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      grazing_schedule_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'grazing_schedule',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
        allowNull: false,
      },
    });

    const query = `
    CREATE TRIGGER update_${table}_changetimestamp BEFORE UPDATE
    ON ${table} FOR EACH ROW EXECUTE PROCEDURE 
    update_changetimestamp_column();`;

    await queryInterface.sequelize.query(query);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(table);
  },
};
