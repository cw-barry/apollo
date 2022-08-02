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
        Cookie:
          'panel=s%3Aw2Tq_UO92YTTBye-qJoozbPzmx5fTezY.5pUFTxTnvh859foBiL0BWdIusr0EA19ONGp5LsNHNUQ',
      },
      data: data,
    };

    const response = await axios(config);

    const result = response.config.headers.Cookie; // response.data;

    // console.log(response.config.headers.Cookie);
    res.send(result);
  } catch (error) {
    next({ code: 500, message: error.message });
  }
});

module.exports = router;
