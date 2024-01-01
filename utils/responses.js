function sendSuccessRes(res, object, statusCode = 200) {
    return res.status(statusCode).send({success: true, failure: false, result: object.result, message: object.message || 'Success'});
}

function sendFailRes(res, object, statusCode = 500) {
    return res.status(statusCode).send({success: false, failure: true, message: object.message});
}

module.exports = {
    sendSuccessRes,
    sendFailRes
}