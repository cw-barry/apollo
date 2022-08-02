const router = require('express').Router();
const axios = require('axios');

router.post('/', async (req, res, next) => {
  const { cookie } = req.headers;
  console.log(cookie);
  try {
    const data = JSON.stringify({
      query: `query Machines {
        entities(model: Machine) 
    }`,
      variables: {},
    });

    const config = {
      method: 'post',
      url: 'https://dev.cormind.com/panel/api/graphql',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
      data: data,
    };

    const response = await axios(config);
    const result = response.data;

    res.send(result);
  } catch (error) {
    next({ code: 500, message: error.message });
  }
});

router.post('/:id', async (req, res, next) => {
  const { cookie } = req.headers;
  const { id } = req.params;

  console.log(id);
  try {
    var data = JSON.stringify({
      query: `query MachineStats($id: ID!) {
      machineStats(id: $id) {
        id
        averageCycle
        idealCycle
        status
        prodAmount
        operator {
          id
          user {
            id
            username
            first_name
            last_name
          }
        }
        shift {
          id
          start
          end
        }
        cycle
        currentProdPlan {
          id
          current_produced
          goods {
            id
            code
            amount
            current_produced
            product {
              code
              name
            }
          }
        }
        defectAmount
        workDuration
        failureDuration
        availability
        performance
        quality
        oee
      }
    }`,
      variables: { id: id },
    });

    const config = {
      method: 'post',
      url: 'https://dev.cormind.com/panel/api/graphql',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
      data: data,
    };

    const response = await axios(config);
    const result = response.data;

    res.send(result);
  } catch (error) {
    next({ code: 500, message: error.message });
  }
});

module.exports = router;
