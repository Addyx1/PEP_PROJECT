const axios = require('axios');

async function testApi() {
    try {
        console.log('Logging in...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'test@example.com',
            password: 'password123'
        });

        const token = loginRes.data.token;
        console.log('Login successful. Token:', token.substring(0, 10) + '...');

        console.log('Calling /api/explanations...');
        const res = await axios.post('http://localhost:5000/api/explanations', {
            code: 'console.log("test")',
            language: 'javascript'
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('API Response:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.log('API Error:', err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
    }
}

testApi();
