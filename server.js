process.env.NODE_OPTIONS = '--openssl-legacy-provider';

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

// CORS Configuration
app.use(cors({
    exposedHeaders: ['X-Forwarded-For', 'X-Real-IP']
}));

app.use(express.json());

// General Settings
const MY_IP = '126.222.161.191';
const DYNAMIC_OID = "02b9c27e5b2wuy9e3z4iaqxv1c8htg6a";

// Encryption Keys
const AES_KEY = "KMdaF2HeNUT0ye6N3LVFOMso";
const AES_IV  = "45760761";

// Current Server Time Generator
function getCurrentServerTime() {

    const now = new Date();

    return now
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
}

// Encryption Function
function encryptPayload(data) {

    try {

        const payload = JSON.stringify(data);

        // Stable AES-192 compatible key
        const keyBuffer = crypto.scryptSync(
            AES_KEY,
            'besttv-secure-salt',
            24
        );

        // Stable 16-byte IV
        const ivBuffer = Buffer.alloc(16);

        Buffer.from(
            AES_IV,
            'utf8'
        ).copy(ivBuffer);

        const cipher = crypto.createCipheriv(
            'aes-192-cbc',
            keyBuffer,
            ivBuffer
        );

        let encrypted = cipher.update(
            payload,
            'utf8',
            'base64'
        );

        encrypted += cipher.final(
            'base64'
        );

        return encrypted;

    } catch (error) {

        console.error(
            "Encryption Error:",
            error.message
        );

        return '';
    }
}

// ================= MANAGEMENT DATA =================

const getManagementData = () => {

    return {

        status: "success",

        server_info: {

            ip: MY_IP,

            port: 60000,

            path: "/live",

            oid: DYNAMIC_OID
        },

        system_info: {

            server_time: getCurrentServerTime(),

            timestamp: Math.floor(Date.now() / 1000),

            timezone: "Africa/Tunis"
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

            announcement: "Welcome to BEST-TV PRO"
        },

        auth_status: {

            code: 200,

            message: "Authorized",

            session_token: "OTEyMzQ1Njc4MA=="
        },

        renewal_scheme: {

            plans: [

                { months: 1, price: 10 },

                { months: 6, price: 50 },

                { months: 12, price: 90 }
            ]
        },

        api_endpoints: {

            "X-API-Time": "https://besttv-424r.vercel.app/api/v1/getTime",

            "X-API-Balance": "https://besttv-424r.vercel.app/api/v1/getUserBalance",

            "X-API-Scheme": "https://besttv-424r.vercel.app/api/v1/getBesttvRenewalScheme",

            "X-API-Order": "https://besttv-424r.vercel.app/api/v1/payBesttvOrderXX",

            "X-API-Password": "https://besttv-424r.vercel.app/api/v1/setPaymentPassword"
        }
    };
};

// ================= API ROUTES =================

app.get('/api/v1/auth', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData()
        )
    );
});

app.get('/api/v1/getTime', (req, res) => {

    const timeData = {

        server_time: getCurrentServerTime(),

        timestamp: Math.floor(Date.now() / 1000),

        timezone: "Africa/Tunis"
    };

    res.send(
        encryptPayload(
            timeData
        )
    );
});

app.get('/api/v1/getUserBalance', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData().user_profile
        )
    );
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData().renewal_scheme
        )
    );
});

app.get('/api/v1', (req, res) => {

    res.setHeader(
        'X-Forwarded-For',
        MY_IP
    );

    res.json({

        status: "success",

        message: "BEST-TV PRO API V1 is READY"
    });
});

app.get('/', (req, res) => {

    res.send(
        'BEST-TV PRO Cloud API is LIVE!'
    );
});

// ================= SERVER =================

const port = process.env.PORT || 60000;

const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({

    server,

    path: '/live'
});

wss.on('connection', (ws, req) => {

    console.log(
        "Connection established successfully"
    );

    ws.send(JSON.stringify({

        type: "welcome",

        data: "authenticated"
    }));

    ws.on('message', (message) => {

        ws.send(JSON.stringify({

            status: true,

            echo: message.toString()
        }));
    });
});

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {

    console.log(
        `Server is running on port ${port}`
    );
});
    try {

        const payload = JSON.stringify(data);

        // Official AES-192 key generation
        const keyBuffer = crypto.scryptSync(
            AES_KEY,
            'besttv-secure-salt',
            24
        );

        // Stable 16-byte IV
        const ivBuffer = Buffer.alloc(16);

        Buffer.from(
            AES_IV,
            'utf8'
        ).copy(ivBuffer);

        const cipher = crypto.createCipheriv(
            'aes-192-cbc',
            keyBuffer,
            ivBuffer
        );

        let encrypted = cipher.update(
            payload,
            'utf8',
            'base64'
        );

        encrypted += cipher.final(
            'base64'
        );

        return encrypted;

    } catch (error) {

        console.error(
            "Encryption Error:",
            error.message
        );

        return '';
    }
}

// ================= MANAGEMENT DATA =================

const getManagementData = () => {

    return {

        status: "success",

        server_info: {

            ip: MY_IP,

            port: 60000,

            path: "/live",

            oid: DYNAMIC_OID
        },

        system_info: {

            server_time: getCurrentServerTime(),

            timestamp: Math.floor(Date.now() / 1000),

            timezone: "Africa/Tunis"
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

            announcement: "Welcome to BEST-TV PRO"
        },

        auth_status: {

            code: 200,

            message: "Authorized",

            session_token: "OTEyMzQ1Njc4MA=="
        },

        renewal_scheme: {

            plans: [

                { months: 1, price: 10 },

                { months: 6, price: 50 },

                { months: 12, price: 90 }
            ]
        },

        api_endpoints: {

            "X-API-Time": "https://besttv-424r.vercel.app/api/v1/getTime",

            "X-API-Balance": "https://besttv-424r.vercel.app/api/v1/getUserBalance",

            "X-API-Scheme": "https://besttv-424r.vercel.app/api/v1/getBesttvRenewalScheme",

            "X-API-Order": "https://besttv-424r.vercel.app/api/v1/payBesttvOrderXX",

            "X-API-Password": "https://besttv-424r.vercel.app/api/v1/setPaymentPassword"
        }
    };
};

// ================= API ROUTES =================

app.get('/api/v1/auth', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData()
        )
    );
});

app.get('/api/v1/getTime', (req, res) => {

    const timeData = {

        server_time: getCurrentServerTime(),

        timestamp: Math.floor(Date.now() / 1000),

        timezone: "Africa/Tunis"
    };

    res.send(
        encryptPayload(
            timeData
        )
    );
});

app.get('/api/v1/getUserBalance', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData().user_profile
        )
    );
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData().renewal_scheme
        )
    );
});

app.get('/api/v1', (req, res) => {

    res.setHeader(
        'X-Forwarded-For',
        MY_IP
    );

    res.json({

        status: "success",

        message: "BEST-TV PRO API V1 is READY"
    });
});

app.get('/', (req, res) => {

    res.send(
        'BEST-TV PRO Cloud API is LIVE!'
    );
});

// ================= SERVER =================

const port = process.env.PORT || 60000;

const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({

    server,

    path: '/live'
});

wss.on('connection', (ws, req) => {

    console.log(
        "Connection established successfully"
    );

    ws.send(JSON.stringify({

        type: "welcome",

        data: "authenticated"
    }));

    ws.on('message', (message) => {

        ws.send(JSON.stringify({

            status: true,

            echo: message.toString()
        }));
    });
});

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {

    console.log(
        `Server is running on port ${port}`
    );
});
    try {

        const payload = JSON.stringify(data);

        // Stable 24-byte AES-192 key
        const keyBuffer = Buffer.alloc(24);

        Buffer.from(AES_KEY, 'utf8')
            .copy(keyBuffer);

        // Stable 16-byte IV
        const ivBuffer = Buffer.alloc(16);

        Buffer.from(AES_IV, 'utf8')
            .copy(ivBuffer);

        const cipher = crypto.createCipheriv(
            'aes-192-cbc',
            keyBuffer,
            ivBuffer
        );

        let encrypted = cipher.update(
            payload,
            'utf8',
            'base64'
        );

        encrypted += cipher.final('base64');

        return encrypted;

    } catch (error) {

        console.error(
            "Encryption Error:",
            error
        );

        return '';
    }
}

// ================= MANAGEMENT DATA =================

const getManagementData = () => {

    return {

        status: "success",

        server_info: {

            ip: MY_IP,

            port: 60000,

            path: "/live",

            oid: DYNAMIC_OID
        },

        system_info: {

            server_time: getCurrentServerTime(),

            timestamp: Math.floor(Date.now() / 1000),

            timezone: "Africa/Tunis"
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

            announcement: "Welcome to BEST-TV PRO"
        },

        auth_status: {

            code: 200,

            message: "Authorized",

            session_token: "OTEyMzQ1Njc4MA=="
        },

        renewal_scheme: {

            plans: [

                { months: 1, price: 10 },

                { months: 6, price: 50 },

                { months: 12, price: 90 }
            ]
        },

        api_endpoints: {

            "X-API-Time": "https://besttv-424r.vercel.app/api/v1/getTime",

            "X-API-Balance": "https://besttv-424r.vercel.app/api/v1/getUserBalance",

            "X-API-Scheme": "https://besttv-424r.vercel.app/api/v1/getBesttvRenewalScheme",

            "X-API-Order": "https://besttv-424r.vercel.app/api/v1/payBesttvOrderXX",

            "X-API-Password": "https://besttv-424r.vercel.app/api/v1/setPaymentPassword"
        }
    };
};

// ================= API ROUTES =================

app.get('/api/v1/auth', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData()
        )
    );
});

app.get('/api/v1/getTime', (req, res) => {

    const timeData = {

        server_time: getCurrentServerTime(),

        timestamp: Math.floor(Date.now() / 1000),

        timezone: "Africa/Tunis"
    };

    res.send(
        encryptPayload(timeData)
    );
});

app.get('/api/v1/getUserBalance', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData().user_profile
        )
    );
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData().renewal_scheme
        )
    );
});

app.get('/api/v1', (req, res) => {

    res.setHeader(
        'X-Forwarded-For',
        MY_IP
    );

    res.json({

        status: "success",

        message: "BEST-TV PRO API V1 is READY"
    });
});

app.get('/', (req, res) => {

    res.send(
        'BEST-TV PRO Cloud API is LIVE!'
    );
});

// ================= SERVER =================

const port = process.env.PORT || 60000;

const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({

    server,

    path: '/live'
});

wss.on('connection', (ws, req) => {

    console.log(
        "Connection established successfully"
    );

    ws.send(JSON.stringify({

        type: "welcome",

        data: "authenticated"
    }));

    ws.on('message', (message) => {

        ws.send(JSON.stringify({

            status: true,

            echo: message.toString()
        }));
    });
});

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {

    console.log(
        `Server is running on port ${port}`
    );
});
    try {

        const payload = JSON.stringify(data);

        // Fixed AES-192 compatible key
        const keyBuffer = crypto
            .createHash('sha256')
            .update(AES_KEY)
            .digest()
            .subarray(0, 24);

        // Fixed IV length
        const ivBuffer = Buffer
            .from(
                AES_IV.padEnd(16, '0'),
                'utf8'
            )
            .subarray(0, 16);

        const cipher = crypto.createCipheriv(
            'aes-192-cbc',
            keyBuffer,
            ivBuffer
        );

        let encrypted = cipher.update(
            payload,
            'utf8',
            'base64'
        );

        encrypted += cipher.final('base64');

        return encrypted;

    } catch (error) {

        console.error(
            "Encryption Error:",
            error.message
        );

        return '';
    }
}

// ================= MANAGEMENT DATA =================

const getManagementData = () => {

    return {

        status: "success",

        server_info: {

            ip: MY_IP,

            port: 60000,

            path: "/live",

            oid: DYNAMIC_OID
        },

        system_info: {

            server_time: getCurrentServerTime(),

            timestamp: Math.floor(Date.now() / 1000),

            timezone: "Africa/Tunis"
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

            announcement: "Welcome to BEST-TV PRO"
        },

        auth_status: {

            code: 200,

            message: "Authorized",

            session_token: "OTEyMzQ1Njc4MA=="
        },

        renewal_scheme: {

            plans: [

                { months: 1, price: 10 },

                { months: 6, price: 50 },

                { months: 12, price: 90 }
            ]
        },

        api_endpoints: {

            "X-API-Time": "https://besttv-424r.vercel.app/api/v1/getTime",

            "X-API-Balance": "https://besttv-424r.vercel.app/api/v1/getUserBalance",

            "X-API-Scheme": "https://besttv-424r.vercel.app/api/v1/getBesttvRenewalScheme",

            "X-API-Order": "https://besttv-424r.vercel.app/api/v1/payBesttvOrderXX",

            "X-API-Password": "https://besttv-424r.vercel.app/api/v1/setPaymentPassword"
        }
    };
};

// ================= API ROUTES =================

app.get('/api/v1/auth', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData()
        )
    );
});

app.get('/api/v1/getTime', (req, res) => {

    const timeData = {

        server_time: getCurrentServerTime(),

        timestamp: Math.floor(Date.now() / 1000),

        timezone: "Africa/Tunis"
    };

    res.send(
        encryptPayload(timeData)
    );
});

app.get('/api/v1/getUserBalance', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData().user_profile
        )
    );
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {

    res.send(
        encryptPayload(
            getManagementData().renewal_scheme
        )
    );
});

app.get('/api/v1', (req, res) => {

    res.setHeader(
        'X-Forwarded-For',
        MY_IP
    );

    res.json({

        status: "success",

        message: "BEST-TV PRO API V1 is READY"
    });
});

app.get('/', (req, res) => {

    res.send(
        'BEST-TV PRO Cloud API is LIVE!'
    );
});

// ================= SERVER =================

const port = process.env.PORT || 60000;

const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({

    server,

    path: '/live'
});

wss.on('connection', (ws, req) => {

    console.log(
        "Connection established successfully"
    );

    ws.send(JSON.stringify({

        type: "welcome",

        data: "authenticated"
    }));

    ws.on('message', (message) => {

        ws.send(JSON.stringify({

            status: true,

            echo: message.toString()
        }));
    });
});

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {

    console.log(
        `Server is running on port ${port}`
    );
});        const keyBuffer = crypto.scryptSync(AES_KEY, 'besttv_salt', 24);

        const ivBuffer = Buffer.from(
            AES_IV.padEnd(16, '0'),
            'utf8'
        );

        const cipher = crypto.createCipheriv(
            'aes-192-cbc',
            keyBuffer,
            ivBuffer
        );

        let encrypted = cipher.update(
            payload,
            'utf8',
            'base64'
        );

        encrypted += cipher.final('base64');

        return encrypted;

    } catch (error) {

        console.error("Encryption Error:", error);

        return null;
    }
}

// ================= MANAGEMENT DATA =================

const getManagementData = () => {
    return {
        status: "success",

        server_info: {
            ip: MY_IP,
            port: 60000,
            path: "/live",
            oid: DYNAMIC_OID
        },

        system_info: {
            server_time: getCurrentServerTime(),
            timestamp: Math.floor(Date.now() / 1000),
            timezone: "Africa/Tunis"
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
            announcement: "Welcome to BEST-TV PRO"
        },

        auth_status: {
            code: 200,
            message: "Authorized",
            session_token: "OTEyMzQ1Njc4MA=="
        },

        renewal_scheme: {
            plans: [
                { months: 1, price: 10 },
                { months: 6, price: 50 },
                { months: 12, price: 90 }
            ]
        },

        api_endpoints: {
            "X-API-Time": "https://besttv-424r.vercel.app/api/v1/getTime",
            "X-API-Balance": "https://besttv-424r.vercel.app/api/v1/getUserBalance",
            "X-API-Scheme": "https://besttv-424r.vercel.app/api/v1/getBesttvRenewalScheme",
            "X-API-Order": "https://besttv-424r.vercel.app/api/v1/payBesttvOrderXX",
            "X-API-Password": "https://besttv-424r.vercel.app/api/v1/setPaymentPassword"
        }
    };
};

// ================= API ROUTES =================

app.get('/api/v1/auth', (req, res) => {
    res.send(encryptPayload(getManagementData()));
});

app.get('/api/v1/getTime', (req, res) => {

    const timeData = {
        server_time: getCurrentServerTime(),
        timestamp: Math.floor(Date.now() / 1000),
        timezone: "Africa/Tunis"
    };

    res.send(encryptPayload(timeData));
});

app.get('/api/v1/getUserBalance', (req, res) => {
    res.send(encryptPayload(getManagementData().user_profile));
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {
    res.send(encryptPayload(getManagementData().renewal_scheme));
});

app.get('/api/v1', (req, res) => {

    res.setHeader('X-Forwarded-For', MY_IP);

    res.json({
        status: "success",
        message: "BEST-TV PRO API V1 is READY"
    });
});

app.get('/', (req, res) => {
    res.send('BEST-TV PRO Cloud API is LIVE!');
});

// ================= SERVER =================

const port = process.env.PORT || 60000;

const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({
    server,
    path: '/live'
});

wss.on('connection', (ws, req) => {

    console.log("Connection established successfully");

    ws.send(JSON.stringify({
        type: "welcome",
        data: "authenticated"
    }));

    ws.on('message', (message) => {

        ws.send(JSON.stringify({
            status: true,
            echo: message.toString()
        }));
    });
});

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {

    console.log(`Server is running on port ${port}`);
});        const cipher = crypto.createCipheriv('aes-192-cbc', keyBuffer, ivBuffer);

        let encrypted = cipher.update(payload, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        return encrypted;

    } catch (error) {
        console.error("Encryption Error:", error);
        return null;
    }
}

// ================= MANAGEMENT DATA =================

const getManagementData = () => {
    return {
        status: "success",

        server_info: {
            ip: MY_IP,
            port: 60000,
            path: "/live",
            oid: DYNAMIC_OID
        },

        system_info: {
            server_time: getCurrentServerTime(),
            timestamp: Math.floor(Date.now() / 1000),
            timezone: "Africa/Tunis"
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
            announcement: "Welcome to BEST-TV PRO"
        },

        auth_status: {
            code: 200,
            message: "Authorized",
            session_token: "OTEyMzQ1Njc4MA=="
        },

        renewal_scheme: {
            plans: [
                { months: 1, price: 10 },
                { months: 6, price: 50 },
                { months: 12, price: 90 }
            ]
        },

        api_endpoints: {
            "X-API-Time": "https://besttv-424r.vercel.app/api/v1/getTime",
            "X-API-Balance": "https://besttv-424r.vercel.app/api/v1/getUserBalance",
            "X-API-Scheme": "https://besttv-424r.vercel.app/api/v1/getBesttvRenewalScheme",
            "X-API-Order": "https://besttv-424r.vercel.app/api/v1/payBesttvOrderXX",
            "X-API-Password": "https://besttv-424r.vercel.app/api/v1/setPaymentPassword"
        }
    };
};

// ================= API ROUTES =================

app.get('/api/v1/auth', (req, res) => {
    res.send(encryptPayload(getManagementData()));
});

app.get('/api/v1/getTime', (req, res) => {
    const timeData = {
        server_time: getCurrentServerTime(),
        timestamp: Math.floor(Date.now() / 1000),
        timezone: "Africa/Tunis"
    };
    res.send(encryptPayload(timeData));
});

app.get('/api/v1/getUserBalance', (req, res) => {
    res.send(encryptPayload(getManagementData().user_profile));
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {
    res.send(encryptPayload(getManagementData().renewal_scheme));
});

app.get('/api/v1', (req, res) => {
    res.setHeader('X-Forwarded-For', MY_IP);
    res.json({
        status: "success",
        message: "BEST-TV PRO API V1 is READY"
    });
});

app.get('/', (req, res) => {
    res.send('BEST-TV PRO Cloud API is LIVE!');
});

// ================= SERVER =================

const port = process.env.PORT || 60000;
const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({
    server,
    path: '/live'
});

wss.on('connection', (ws, req) => {
    console.log("Connection established successfully");

    ws.send(JSON.stringify({
        type: "welcome",
        data: "authenticated"
    }));

    ws.on('message', (message) => {
        ws.send(JSON.stringify({
            status: true,
            echo: message.toString()
        }));
    });
});

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
        const cipher = crypto.createCipheriv('aes-192-cbc', keyBuffer, ivBuffer);

        let encrypted = cipher.update(payload, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        return encrypted;

    } catch (error) {
        console.error("Encryption Error:", error);
        return null;
    }
}

// ================= MANAGEMENT DATA =================

const getManagementData = () => {
    return {
        status: "success",

        server_info: {
            ip: MY_IP,
            port: 60000,
            path: "/live",
            oid: DYNAMIC_OID
        },

        system_info: {
            server_time: getCurrentServerTime(),
            timestamp: Math.floor(Date.now() / 1000),
            timezone: "Africa/Tunis"
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
            announcement: "Welcome to BEST-TV PRO"
        },

        auth_status: {
            code: 200,
            message: "Authorized",
            session_token: "OTEyMzQ1Njc4MA=="
        },

        renewal_scheme: {
            plans: [
                { months: 1, price: 10 },
                { months: 6, price: 50 },
                { months: 12, price: 90 }
            ]
        },

        api_endpoints: {
            "X-API-Time": "https://besttv-424r.vercel.app/api/v1/getTime",
            "X-API-Balance": "https://besttv-424r.vercel.app/api/v1/getUserBalance",
            "X-API-Scheme": "https://besttv-424r.vercel.app/api/v1/getBesttvRenewalScheme",
            "X-API-Order": "https://besttv-424r.vercel.app/api/v1/payBesttvOrderXX",
            "X-API-Password": "https://besttv-424r.vercel.app/api/v1/setPaymentPassword"
        }
    };
};

// ================= API ROUTES =================

app.get('/api/v1/auth', (req, res) => {
    res.send(encryptPayload(getManagementData()));
});

app.get('/api/v1/getTime', (req, res) => {
    const timeData = {
        server_time: getCurrentServerTime(),
        timestamp: Math.floor(Date.now() / 1000),
        timezone: "Africa/Tunis"
    };
    res.send(encryptPayload(timeData));
});

app.get('/api/v1/getUserBalance', (req, res) => {
    res.send(encryptPayload(getManagementData().user_profile));
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {
    res.send(encryptPayload(getManagementData().renewal_scheme));
});

app.get('/api/v1', (req, res) => {
    res.setHeader('X-Forwarded-For', MY_IP);
    res.json({
        status: "success",
        message: "BEST-TV PRO API V1 is READY"
    });
});

app.get('/', (req, res) => {
    res.send('BEST-TV PRO Cloud API is LIVE!');
});

// ================= SERVER =================

const port = process.env.PORT || 60000;
const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({
    server,
    path: '/live'
});

wss.on('connection', (ws, req) => {
    console.log("Connection established successfully");

    ws.send(JSON.stringify({
        type: "welcome",
        data: "authenticated"
    }));

    ws.on('message', (message) => {
        ws.send(JSON.stringify({
            status: true,
            echo: message.toString()
        }));
    });
});

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
            server_time: getCurrentServerTime(),
            timestamp: Math.floor(Date.now() / 1000),
            timezone: "Africa/Tunis"
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
            announcement: "Welcome to BEST-TV PRO"
        },

        auth_status: {
            code: 200,
            message: "Authorized",
            session_token: "OTEyMzQ1Njc4MA=="
        },

        renewal_scheme: {
            plans: [
                { months: 1, price: 10 },
                { months: 6, price: 50 },
                { months: 12, price: 90 }
            ]
        },

        api_endpoints: {
            "X-API-Time": "https://besttv-424r.vercel.app/api/v1/getTime",
            "X-API-Balance": "https://besttv-424r.vercel.app/api/v1/getUserBalance",
            "X-API-Scheme": "https://besttv-424r.vercel.app/api/v1/getBesttvRenewalScheme",
            "X-API-Order": "https://besttv-424r.vercel.app/api/v1/payBesttvOrderXX",
            "X-API-Password": "https://besttv-424r.vercel.app/api/v1/setPaymentPassword"
        }
    };
};

// ================= API ROUTES =================

app.get('/api/v1/auth', (req, res) => {

    res.send(encryptPayload(getManagementData()));
});

app.get('/api/v1/getTime', (req, res) => {

    const timeData = {
        server_time: getCurrentServerTime(),
        timestamp: Math.floor(Date.now() / 1000),
        timezone: "Africa/Tunis"
    };

    res.send(encryptPayload(timeData));
});

app.get('/api/v1/getUserBalance', (req, res) => {

    res.send(encryptPayload(getManagementData().user_profile));
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {

    res.send(encryptPayload(getManagementData().renewal_scheme));
});

app.get('/api/v1', (req, res) => {

    res.setHeader('X-Forwarded-For', MY_IP);

    res.json({
        status: "success",
        message: "BEST-TV PRO API V1 is READY"
    });
});

app.get('/', (req, res) => {

    res.send('BEST-TV PRO Cloud API is LIVE!');
});

// ================= SERVER =================

const port = process.env.PORT || 60000;

const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({
    server,
    path: '/live'
});

wss.on('connection', (ws, req) => {

    console.log("Connection established successfully");

    ws.send(JSON.stringify({
        type: "welcome",
        data: "authenticated"
    }));

    ws.on('message', (message) => {

        ws.send(JSON.stringify({
            status: true,
            echo: message.toString()
        }));
    });
});

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {

    console.log(`Server is running on port ${port}`);
});        timezone: "Africa/Tunis"
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

        announcement: "Welcome to BEST-TV PRO"
    },

    auth_status: {

        code: 200,

        message: "Authorized",

        session_token: "OTEyMzQ1Njc4MA=="
    },

    renewal_scheme: {

        plans: [

            { months: 1, price: 10 },

            { months: 6, price: 50 },

            { months: 12, price: 90 }
        ]
    },

    api_endpoints: {

        "X-API-Time": "https://besttv-api.onrender.com/api/v1/getTime",

        "X-API-Balance": "https://besttv-api.onrender.com/api/v1/getUserBalance",

        "X-API-Scheme": "https://besttv-api.onrender.com/api/v1/getBesttvRenewalScheme",

        "X-API-Order": "https://besttv-api.onrender.com/api/v1/payBesttvOrderXX",

        "X-API-Password": "https://besttv-api.onrender.com/api/v1/setPaymentPassword"
    }
};

// ================= API ROUTES =================

app.get('/api/v1/auth', (req, res) => {

    res.send(encryptPayload(managementData));
});

app.get('/api/v1/getTime', (req, res) => {

    const timeData = {

        server_time: managementData.system_info.server_time,

        timestamp: Math.floor(Date.now() / 1000),

        timezone: managementData.system_info.timezone
    };

    res.send(encryptPayload(timeData));
});

app.get('/api/v1/getUserBalance', (req, res) => {

    res.send(encryptPayload(managementData.user_profile));
});

app.get('/api/v1/getBesttvRenewalScheme', (req, res) => {

    res.send(encryptPayload(managementData.renewal_scheme));
});

app.get('/api/v1', (req, res) => {

    res.setHeader('X-Forwarded-For', MY_IP);

    res.json({

        status: "success",

        message: "BEST-TV PRO API V1 is READY"
    });
});

app.get('/', (req, res) => {

    res.send('BEST-TV PRO Cloud API is LIVE!');
});

// ================= SERVER =================

const port = process.env.PORT || 60000;

const server = http.createServer(app);

// ================= WEBSOCKET SERVER =================

const wss = new WebSocket.Server({

    server,

    path: '/live'
});

wss.on('connection', (ws, req) => {

    console.log("Connection established successfully");

    ws.send(JSON.stringify({

        type: "welcome",

        data: "authenticated"
    }));

    ws.on('message', (message) => {

        ws.send(JSON.stringify({

            status: true,

            echo: message.toString()
        }));
    });
});

// ================= START SERVER =================

server.listen(port, '0.0.0.0', () => {

    console.log(`Server is running on port ${port}`);
});
