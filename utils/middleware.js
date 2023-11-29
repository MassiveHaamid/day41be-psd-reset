const responseLogger = (request, response, next) => {
    const oldSend = response.send;

    response.send = function (data) {
        console.log('Response:', data);
        oldSend.apply(response, arguments);
    };

    next();
};

const requestLogger = (request, response, next) => {

    next();
};

module.exports = {
    requestLogger,
    responseLogger
};
