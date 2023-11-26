const responseLogger = (request, response, next) => {
    const oldSend = response.send;

    response.send = function (data) {
        console.log('Response:', data);
        oldSend.apply(response, arguments);
    };

    next();
};

module.exports = {
    requestLogger,
    responseLogger
};
