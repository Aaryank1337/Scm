module.exports = {
    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 7545, // Ganache port (default: 7545)
            network_id: "*", // Any network (default: "*")
        },
    },
    compilers: {
        solc: {
            version: "0.8.0", // or your desired version
        },
    },
};