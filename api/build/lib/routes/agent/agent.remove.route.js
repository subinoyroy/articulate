"use strict";

var _boom = _interopRequireDefault(require("boom"));

var _constants = require("../../../util/constants");

var _agent = _interopRequireDefault(require("../../validators/agent.validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const logger = require('../../../server/util/logger')({ name: `route:agent:removeById` });
module.exports = {
  method: 'delete',
  path: `/${_constants.ROUTE_AGENT}/{${_constants.PARAM_AGENT_ID}}`,
  options: {
    tags: ['api'],
    validate: _agent.default.remove,
    handler: async (request, h) => {
      const _ref = await request.services(),
            agentService = _ref.agentService;

      const id = request.params[_constants.PARAM_AGENT_ID];

      try {
        await agentService.remove({
          id
        });
        return h.continue;
      } catch (_ref2) {
        let message = _ref2.message;
        let statusCode = _ref2.statusCode;
        return new _boom.default(message, {
          statusCode
        });
      }
    }
  }
};
//# sourceMappingURL=agent.remove.route.js.map