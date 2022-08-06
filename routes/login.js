const router = require('express').Router();
const axios = require('axios');
const qs = require('qs');

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const data = qs.stringify({
      username,
      password,
      react: 'true',
    });
    const config = {
      method: 'post',
      url: 'https://dev.cormind.com/panel/login',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    const response = await axios(config);

    // console.log('cookie', response.headers['set-cookie'][0].split(';')[0]);

    const result = response.headers['set-cookie'][0].split(';')[0]; // response.data;

    res.send(result);
  } catch (error) {
    next({ code: 500, message: error.message });
  }
});

module.exports = router;
