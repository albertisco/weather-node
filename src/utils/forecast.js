const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/d02109bc1066bd5b93da06da629eccf5/${lat},${long}?units=si`

    request({
        url,
        'json':true
    }, (error,{body}) => {
        const {currently} = body
        const {temperature, precipProbability, error:errorbody = undefined} = currently
        if(error) {
            callback('Unable to connect weather service !!',undefined)
        } else if (errorbody) {
            callback('Unable to location, try again with another coords',undefined)
        } else {
            callback(undefined, {
                 temperature,
                 precipProbability
            })
        }
    })
}

module.exports = forecast;