const express = require('express');
const app = express();


const bodyParser = require('body-parser')

const appConfig = require('./config/config-loader').applicationConfig;
const PORT = appConfig.port || '5000';

// app.use(express.static(__dirname + './../../web/src/'));
app.use(express.static(__dirname + './../../web/dist/'));

console.log(`process.env.mode ${process.env.NODE_ENV}`);

app.listen(PORT, () => {
    console.log(`app listening ${PORT}`)
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./route/route.root')({ express }));



app.use(function (err, req, res, next) {
    console.error('ERROR CAUGHT ==============>', err.stack)
    res.status(500).send('Something broke!')
});


process.on('unhandledRejection', (reason, promise) => {
    console.log('\n\n\nUNHANDLED REJECTION  ==========>', reason, promise)
});

process.on('uncaughtException', function (error) {
    // errorManagement.handler.handleError(error);
    // if (!errorManagement.handler.isTrustedError(error))
    //     process.exit(1)
    console.log('UNCAUGHT EXCEPTION =============>', error)

});


// throw new Error("sdfdsf");
