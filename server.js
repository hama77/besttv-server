const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors({
    origin: '*',
    exposedHeaders: ['X-Forwarded-For', 'X-Real-IP']
}));

app.use(express.json());

// ================== CONFIG ==================

const MY_IP = '126.222.161.191';
const DYNAMIC_OID = 'c167de379a78e72f9890945769fa2c3c';
const SECOND_TOKEN = '5ac5a72c983ccecb047a5cb48761885c';

// AES-192-CBC
const AES_SECRET = 'KMdaF2HeNUT0ye6N3LVFOMso';

const AES_KEY = crypto
    .createHash('sha256')
    .update(AES_SECRET)
    .digest()
    .slice(0, 24);

const AES_IV = Buffer.alloc(16, 0);

// ================== TIME ==================

function getCurrentServerTime() {
    const now = new Date();
    return now.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

// ================== ENCRYPTION ==================

function encryptPayload(data) {
    try {
        const payload = JSON.stringify(data);
        const cipher = crypto.createCipheriv('aes-192-cbc', AES_KEY, AES_IV);

        let encrypted = cipher.update(payload, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        return encrypted;
    } catch (err) {
        console.error("Encryption Error:", err.message);
        return '';
    }
}

function sendEncrypted(res, data) {
    try {
        const encrypted = encryptPayload(data);
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(encrypted);
    } catch (err) {
        res.status(500).json({ status: false, error: 'Encryption Failed' });
    }
}

// ================== SERVER OBJECT (المطلوب فقط) ==================

function getManagementData() {
    return {
        ip: MY_IP,
        port: 60000,
        path: "/live",
        oid: DYNAMIC_OID,
        db_token: SECOND_TOKEN,
        timestamp: Math.floor(Date.now() / 1000)
    };
}

// ================== AUTH PAYLOAD (مطابق 100%) ==================

function getAuthPayload() {
    const server = getManagementData();

    const uid = "9123456780";
    const now = Math.floor(Date.now() / 1000);
    const expire = now + (30 * 24 * 60 * 60);

    const token = Buffer.from(`${uid}:${expire}:${SECOND_TOKEN}`).toString("base64");

    return {
        code: 0,
        msg: "success",
        data: {
            uid: uid,
            expire: expire,
            token: token,
            server: server
        }
    };
}

// ================== ROUTES ==================

app.get('/api/v1/auth', (req, res) => {
    sendEncrypted(res, getAuthPayload());
});

app.get('/api/v1/getTime', (req, res) => {
    sendEncrypted(res, {
        server_time: getCurrentServerTime(),
        timestamp: Math.floor(Date.now() / 1000)
    });
});

app.get('/api/v1/getUserBalance', (req, res) => {
    sendEncrypted(res, {
        balance: 999,
        currency: "TND"
    });
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {
    sendEncrypted(res, {
        plans: [
            { months: 1, price: 10 },
            { months: 6, price: 50 },
            { months: 12, price: 90 }
        ]
    });
});

app.get('/api/v1/payBesttvOrderXX', (req, res) => {
    sendEncrypted(res, {
        status: true,
        order_id: "ORD-" + Date.now(),
        message: "Order created successfully"
    });
});

app.get('/api/v1/setPaymentPassword', (req, res) => {
    sendEncrypted(res, {
        status: true,
        message: "Password updated successfully"
    });
});

// ================== ROOT ==================

app.get('/', (req, res) => {
    res.send('BEST-TV PRO Cloud API is LIVE');
});

// ================== HTTP + WEBSOCKET ==================

const port = process.env.PORT || 60000;
const server = http.createServer(app);

const wss = new WebSocket.Server({
    server,
    path: '/live'
});

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({
        type: "welcome",
        data: "authenticated",
        auth_key: SECOND_TOKEN
    }));

    ws.on('message', (msg) => {
        ws.send(JSON.stringify({ echo: msg.toString() }));
    });
});

// ================== START ==================

server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
