var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
    'method': 'POST',
    'hostname': 'n86r3e.api.infobip.com',
    'path': '/whatsapp/1/message/template',
    'headers': {
        'Authorization': 'App ********************************-********-****-****-****-********058c',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function (error) {
        console.error(error);
    });
});

var postData = JSON.stringify({
    "messages": [
        {
            "from": "447860099299",
            "to": "212609343953",
            "messageId": "380c147f-fc79-4e70-8e54-4a65b6e35391",
            "content": {
                "templateName": "message_test",
                "templateData": {
                    "body": {
                        "placeholders": ["NOUR EDDINE"]
                    }
                },
                "language": "en"
            }
        }
    ]
});

req.write(postData);

req.end();