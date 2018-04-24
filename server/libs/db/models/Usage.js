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
// Created by Jason Leach on 2018-02-21.
//

/* eslint-env es6 */

'use strict';

export default (sequelize, DataTypes) => {
  const Usage = sequelize.define('usage', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    authorizedAum: {
      type: DataTypes.INTEGER,
      field: 'authorized_aum',
      allowNull: false,
    },
    temporaryIncrease: {
      type: DataTypes.INTEGER,
      field: 'temporary_increase',
      allowNull: false,
      defaultValue: 0,
    },
    totalNonUse: {
      type: DataTypes.INTEGER,
      field: 'total_non_use',
      allowNull: false,
      defaultValue: 0,
    },
    totalAnnualUse: {
      type: DataTypes.INTEGER,
      field: 'total_annual_use',
      allowNull: false,
      defaultValue: 0,
    },
    agreementId: {
      type: DataTypes.INTEGER,
      field: 'agreement_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    tableName: 'ref_usage',
  });

  //
  // Instance Method
  //

  /* eslint-disable func-names, arrow-body-style */

  Usage.prototype.calculateTotalAnnualUse = function () {
    return (this.authorizedAum + this.temporaryIncrease) - this.totalNonUse;
  };

  //
  // Hooks
  //

  Usage.beforeCreate((usage) => {
    /* eslint-disable-next-line no-param-reassign */
    usage.totalAnnualUse = usage.calculateTotalAnnualUse();
  });

  Usage.beforeUpdate((usage) => {
    /* eslint-disable-next-line no-param-reassign */
    usage.totalAnnualUse = usage.calculateTotalAnnualUse();
  });

  return Usage;
};
