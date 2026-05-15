const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

// ================= CORS =================

app.use(cors({
    origin: '*',
    exposedHeaders: [
        'X-Forwarded-For',
        'X-Real-IP'
    ]
}));

app.use(express.json());

// ================= GENERAL SETTINGS =================

const MY_IP = '126.222.161.191';

const BASE_URL =
    'https://besttv-424r.vercel.app';

const DYNAMIC_OID =
    '02b9c27e5b2wuy9e3z4iaqxv1c8htg6a';

// ================= AES SETTINGS =================

// AES-192 requires 24-byte key

const AES_SECRET =
    'KMdaF2HeNUT0ye6N3LVFOMso';

const AES_KEY = crypto
    .createHash('sha256')
    .update(AES_SECRET)
    .digest()
    .slice(0, 24);

// Stable 16-byte IV

const AES_IV = Buffer.alloc(16, 0);

// ================= TIME =================

function getCurrentServerTime() {

    return new Date()
        .toISOString()
        .replace('T', ' ')
        .replace(/\..+/, '');
}

// ================= ENCRYPTION =================

function encryptPayload(data) {

    try {

        const payload =
            JSON.stringify(data);

        const cipher =
            crypto.createCipheriv(
                'aes-192-cbc',
                AES_KEY,
                AES_IV
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

// ================= RESPONSE HELPER =================

function sendEncrypted(res, data) {

    try {

        const encrypted =
            encryptPayload(data);

        res.setHeader(
            'Content-Type',
            'text/plain'
        );

        res.setHeader(
            'Cache-Control',
            'no-store'
        );

        res.setHeader(
            'Server',
            'nginx'
        );

        res.status(200).send(encrypted);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: false,

            error:
                'Encryption Failed'
        });
    }
}

// ================= MANAGEMENT DATA =================

function getManagementData() {

    return {

        status: 'success',

        server_info: {

            ip: MY_IP,

            port: 60000,

            path: '/live',

            oid: DYNAMIC_OID
        },

        system_info: {

            server_time:
                getCurrentServerTime(),

            timestamp:
                Math.floor(Date.now() / 1000),

            timezone:
                'Africa/Tunis'
        },

        user_profile: {

            user_id:
                '9123456780',

            balance:
                '100.00',

            currency:
                'TND',

            subscription_type:
                'Premium',

            expiry_date:
                '2027-01-01',

            status:
                'active'
        },

        app_settings: {

            maintenance_mode:
                false,

            force_update:
                false,

            min_version:
                '3.0.0',

            announcement:
                'Welcome to BEST-TV PRO'
        },

        auth_status: {

            code: 200,

            message:
                'Authorized',

            session_token:
                Buffer
                    .from('9123456780')
                    .toString('base64')
        },

        renewal_scheme: {

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
}

// ================= API ROUTES =================

// AUTH

app.get('/api/v1/auth', (req, res) => {

    sendEncrypted(
        res,
        getManagementData()
    );
});

// TIME

app.get('/api/v1/getTime', (req, res) => {

    sendEncrypted(res, {

        server_time:
            getCurrentServerTime(),

        timestamp:
            Math.floor(Date.now() / 1000),

        timezone:
            'Africa/Tunis'
    });
});

// USER BALANCE

app.get(
    '/api/v1/getUserBalance',
    (req, res) => {

        sendEncrypted(
            res,
            getManagementData()
                .user_profile
        );
    }
);

// RENEWAL SCHEME

app.get(
    '/api/v1/getBesttvRenewalScheme',
    (req, res) => {

        sendEncrypted(
            res,
            getManagementData()
                .renewal_scheme
        );
    }
);

// PAYMENT ORDER

app.get(
    '/api/v1/payBesttvOrderXX',
    (req, res) => {

        sendEncrypted(res, {

            status: true,

            order_id:
                'ORD-' + Date.now(),

            amount: '10',

            currency: 'TND',

            message:
                'Order created successfully'
        });
    }
);

// PAYMENT PASSWORD

app.get(
    '/api/v1/setPaymentPassword',
    (req, res) => {

        sendEncrypted(res, {

            status: true,

            message:
                'Password updated successfully'
        });
    }
);

// API ROOT

app.get('/api/v1', (req, res) => {

    res.setHeader(
        'X-Forwarded-For',
        MY_IP
    );

    res.json({

        status: 'success',

        message:
            'BEST-TV PRO API V1 is READY'
    });
});

// ROOT

app.get('/', (req, res) => {

    res.send(
        'BEST-TV PRO Cloud API is LIVE!'
    );
});

// ================= HTTP SERVER =================

const port =
    process.env.PORT || 60000;

const server =
    http.createServer(app);

// ================= WEBSOCKET =================

const wss =
    new WebSocket.Server({

        server,

        path: '/live'
    });

wss.on(
    'connection',
    (ws) => {

        console.log(
            'WebSocket Connected'
        );

        ws.send(
            JSON.stringify({

                type: 'welcome',

                data:
                    'authenticated'
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

        ws.on(
            'error',
            (err) => {

                console.error(
                    'WS Error:',
                    err.message
                );
            }
        );
    }
);

// ================= START SERVER =================

server.listen(
    port,
    '0.0.0.0',
    () => {

        console.log(
            `BEST-TV API running on ${port}`
        );
    }
);
