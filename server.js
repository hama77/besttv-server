const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors({
    origin: '*',
    exposedHeaders: [
        'X-Forwarded-For',
        'X-Real-IP'
    ]
}));

app.use(express.json());

const MY_IP =
    '126.222.161.191';

const BASE_URL =
    'https://besttv-424r.vercel.app';

// Primary Token

const DYNAMIC_OID =
    'c167de379a78e72f9890945769fa2c3c';

// Secondary Token

const SECOND_TOKEN =
    '5ac5a72c983ccecb047a5cb48761885c';

// AES Configuration

const AES_KEY =
    'KMdaF2HeNUT0ye6N3LVFOMso';

const AES_IV =
    '45760761';

// Current Server Time

function getCurrentServerTime() {

    const now = new Date();

    return now
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
}

// Encryption

function encryptPayload(data) {

    try {

        const payload =
            JSON.stringify(data);

        const keyBuffer =
            crypto.scryptSync(
                AES_KEY,
                SECOND_TOKEN,
                24
            );

        const ivBuffer =
            Buffer.alloc(16, 0);

        Buffer
            .from(AES_IV, 'utf8')
            .copy(ivBuffer);

        const cipher =
            crypto.createCipheriv(
                'aes-192-cbc',
                keyBuffer,
                ivBuffer
            );

        let encrypted =
            cipher.update(
                payload,
                'utf8',
                'base64'
            );

        encrypted +=
            cipher.final('base64');

        return encrypted;

    } catch (error) {

        console.error(
            'Encryption Error:',
            error.message
        );

        return '';
    }
}

// Management Data

const getManagementData = () => {

    return {

        status: 'success',

        server_info: {

            ip: MY_IP,

            port: 60000,

            path: '/live',

            oid: DYNAMIC_OID,

            db_token: SECOND_TOKEN
        },

        system_info: {

            server_time:
                getCurrentServerTime(),

            timestamp:
                Math.floor(Date.now() / 1000)
        },

        user_profile: {

            user_id:
                '9123456780',

            subscription_type:
                'Premium',

            expiry_date:
                '2027-01-01',

            status:
                'active',

            token_v1:
                SECOND_TOKEN
        },

        app_settings: {

            maintenance_mode:
                false,

            min_version:
                '3.0.0'
        },

        auth_status: {

            code: 200,

            message:
                'Authorized'
        },

        api_endpoints: {

            'X-API-Time':
                `${BASE_URL}/api/v1/getTime`,

            'X-API-Balance':
                `${BASE_URL}/api/v1/getUserBalance`,

            'X-API-Scheme':
                `${BASE_URL}/api/v1/getBesttvRenewalScheme`,

            'X-API-Order':
                `${BASE_URL}/api/v1/payBesttvOrderXX`,

            'X-API-Password':
                `${BASE_URL}/api/v1/setPaymentPassword`
        }
    };
};

// API ROUTES

app.get('/api/v1/auth', (req, res) => {

    res.setHeader(
        'Content-Type',
        'text/plain'
    );

    res.send(
        encryptPayload(
            getManagementData()
        )
    );
});

// API TIME

app.get('/api/v1/getTime', (req, res) => {

    res.send(
        encryptPayload({

            server_time:
                getCurrentServerTime(),

            timestamp:
                Math.floor(Date.now() / 1000),

            timezone:
                'Africa/Tunis'
        })
    );
});

// API USER BALANCE

app.get(
    '/api/v1/getUserBalance',
    (req, res) => {

        res.send(
            encryptPayload({

                user_id:
                    '9123456780',

                balance:
                    '100.00',

                currency:
                    'TND',

                status:
                    'active'
            })
        );
    }
);

// API RENEWAL SCHEME

app.get(
    '/api/v1/getBesttvRenewalScheme',
    (req, res) => {

        res.send(
            encryptPayload({

                plans: [

                    {
                        months: 1,
                        price: 10
                    },

                    {
                        months: 6,
                        price: 50
                    },

                    {
                        months: 12,
                        price: 90
                    }
                ]
            })
        );
    }
);

// API ORDER

app.get(
    '/api/v1/payBesttvOrderXX',
    (req, res) => {

        res.send(
            encryptPayload({

                status: true,

                order_id:
                    'ORD-' + Date.now(),

                amount:
                    '10',

                currency:
                    'TND'
            })
        );
    }
);

// API PASSWORD

app.get(
    '/api/v1/setPaymentPassword',
    (req, res) => {

        res.send(
            encryptPayload({

                status: true,

                message:
                    'Password Updated'
            })
        );
    }
);

// Root Route

app.get('/', (req, res) => {

    res.send(
        'BEST-TV PRO Cloud API is LIVE with Dual-Token Support!'
    );
});

// HTTP Server

const port =
    process.env.PORT || 60000;

const server =
    http.createServer(app);

// WebSocket Server

const wss =
    new WebSocket.Server({

        server,

        path: '/live'
    });

wss.on(
    'connection',
    (ws) => {

        ws.send(
            JSON.stringify({

                type: 'welcome',

                data:
                    'authenticated',

                auth_key:
                    SECOND_TOKEN
            })
        );

        ws.on(
            'message',
            (message) => {

                ws.send(
                    JSON.stringify({

                        status: true,

                        echo:
                            message.toString()
                    })
                );
            }
        );
    }
);

// Start Server

server.listen(
    port,
    '0.0.0.0',
    () => {

        console.log(
            `Server running on port ${port} with Token: ${SECOND_TOKEN}`
        );
    }
);
