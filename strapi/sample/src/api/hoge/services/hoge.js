'use strict';

/**
 * hoge service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hoge.hoge');
