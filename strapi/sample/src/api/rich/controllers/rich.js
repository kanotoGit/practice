'use strict';

/**
 * rich controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::rich.rich', ({}) => ({
  async find(ctx) {
    // GETリクエストデータ
    console.log(ctx.query);

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now()

    data.attributes.Rtext = data.attributes.Rtext.replaceAll('TMP', ctx?.query?.replace ?? '')

    console.log({ data, meta })

    return { data, meta };
  },
}));