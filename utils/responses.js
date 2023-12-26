function sendSuccessfulResponse(res, object){
    res.send({success : true, failure : false, message : object});
}

function sendFailureResponse(res, object){
    res.send({success : false, failure : true, message : object});
}

module.exports = {
    sendSuccessfulResponse,
    sendFailureResponse
}