const MikroNode = require("mikronode-ng");

class MikrotikService {

    async testConnection(routerConfig) {

        const device = new MikroNode(routerConfig.ipAddress);

        const connection = await device.connect(

            routerConfig.username,

            routerConfig.password,

            {

                port: routerConfig.apiPort || 8728,

                tls: routerConfig.apiSsl || false

            }

        );

        const channel = await connection.openChannel();

        const response = await channel.write(

            "/system/resource/print"

        );

        await channel.close();

        connection.close();

        if (!response || !response.data) {

            throw new Error("Router did not return any data.");

        }

        return response.data;

    }

}

module.exports = new MikrotikService();