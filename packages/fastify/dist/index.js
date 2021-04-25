"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullMonitorFastify = void 0;
const root_1 = require("@bull-monitor/root");
const apollo_server_fastify_1 = require("apollo-server-fastify");
// @ts-ignore
class BullMonitorFastify extends root_1.BullMonitor {
    async init() {
        this.createServer(apollo_server_fastify_1.ApolloServer);
        this.plugin = (instance, _opts, done) => {
            instance.register(this.server.createHandler({
                path: this.gqlEndpoint,
            }));
            instance.get(this.uiEndpoint, (_req, reply) => {
                reply.type('text/html').send(this.renderUi());
            });
            done();
        };
    }
}
exports.BullMonitorFastify = BullMonitorFastify;
//# sourceMappingURL=index.js.map