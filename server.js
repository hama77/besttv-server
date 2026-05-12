const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();

app.use(cors());
app.use(express.json());

const EXTERNAL_DOMAIN = 'besttv-pro.onrender.com';

// ================= DUCKDNS UPDATE =================

exec('./duck.sh', (err, stdout, stderr) => {

    if (err) {

        console.error(
            'DuckDNS Update Failed:',
            err
        );

        return;
    }

    console.log(
        'DuckDNS Sync Status:',
        stdout
    );

});

// ================= MANAGEMENT DATA =================

const managementData = {

    system_info: {

        server_time: "2026-05-11 14:15:00",

        timestamp:
        Math.floor(Date.now() / 1000),

        timezone: "Africa/Tunis",

        domain_active:
        EXTERNAL_DOMAIN
    },

    user_profile: {

        user_id: "9123456780",

        balance: "100.00",

        currency: "TND",

        subscription_type: "Premium",

        expiry_date: "2027-01-01",

        status: "active"
    },

    app_settings: {

        maintenance_mode: false,

        force_update: false,

        min_version: "3.0.0",

        announcement:
        `Welcome to BEST-TV PRO on ${EXTERNAL_DOMAIN}`
    },

    auth_status: {

        code: 200,

        message: "Authorized",

        session_token:
        "OTEyMzQ1Njc4MA=="
    },

    renewal_scheme: {

        plans: [

            { months: 1, price: 10 },

            { months: 6, price: 50 },

            { months: 12, price: 90 }
        ]
    },

    websocket: {

        enabled: true,

        protocol: "wss",

        host: "126.222.161.191",

        url: "wss://126.222.161.191"
    },

    api_endpoints: {

        "X-API-Time":
        "https://besttv-424r.vercel.app/api/v1/getTime",

        "X-API-Balance":
        "https://besttv-424r.vercel.app/api/v1/getUserBalance",

        "X-API-Scheme":
        "https://besttv-424r.vercel.app/api/v1/getBesttvRenewalScheme",

        "X-API-Order":
        "https://besttv-424r.vercel.app/api/v1/payBesttvOrderXX",

        "X-API-Password":
        "https://besttv-424r.vercel.app/api/v1/setPaymentPassword"
    }
};

// ================= API V1 =================

// AUTH
app.get('/api/v1/auth', (req, res) => {

    res.json(managementData);

});

// TIME
app.get('/api/v1/getTime', (req, res) => {

    res.json({

        server_time:
        managementData.system_info.server_time,

        timestamp:
        managementData.system_info.timestamp,

        timezone:
        managementData.system_info.timezone
    });

});

// USER BALANCE
app.get('/api/v1/getUserBalance', (req, res) => {

    res.json({

        user_id:
        managementData.user_profile.user_id,

        balance:
        managementData.user_profile.balance,

        currency:
        managementData.user_profile.currency,

        status:
        managementData.user_profile.status
    });

});

// RENEWAL SCHEME
app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {

    res.json(
        managementData.renewal_scheme
    );

});

// PAYMENT
app.post('/api/v1/payBesttvOrderXX', (req, res) => {

    res.json({

        status: true,

        message:
        "Payment Successful",

        order_id:
        "BESTTV-2026"
    });

});

// PAYMENT PASSWORD
app.post('/api/v1/setPaymentPassword', (req, res) => {

    res.json({

        status: true,

        message:
        "Password Updated Successfully"
    });

});

// ================= HOME ROUTE =================

app.get('/', (req, res) => {

    res.send('BEST-TV PRO Cloud API is LIVE!');

});

// ================= HTTP SERVER =================

const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({ server });

// ================= WEBSOCKET CONNECTION =================

wss.on('connection', (ws) => {

    console.log(

        `WebSocket Connection established for ${EXTERNAL_DOMAIN}`

    );

    ws.send(JSON.stringify({

        event: "auth_success",

        token:
        managementData.auth_status.session_token,

        ssl_status:
        "managed_by_cloud",

        websocket:
        managementData.websocket
    }));

    ws.on('message', (message) => {

        console.log(

            'Client Message:',
            message.toString()

        );

        ws.send(JSON.stringify({

            status: true,

            echo:
            message.toString()
        }));
    });
});

// ================= RENDER PORT =================

const port = process.env.PORT || 60000;

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {

    console.log(`Server is LIVE on port ${port}`);

});
