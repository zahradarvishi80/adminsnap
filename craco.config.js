const path = require("path");
module.exports = {
    webpack: {
        alias: {
            "@taban": path.resolve(__dirname, "src"),
        },
    },
};
