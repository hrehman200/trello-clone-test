const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require("feathers-authentication-hooks");

const limitToOwner = setField({
  from: "params.user._id",
  as: "params.query.userId",
});

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [
      setField({
        from: "params.user._id",
        as: "data.ownerId",
      }),
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
