const request = require('request')



const geocode = (adress,callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1Ijoia3VuYWxiZXJ0bzciLCJhIjoiY2p5bjUwMGR5MG9jcTNkdXcwMjVteXpkMCJ9.MDvZqD3kB_DrwIQK3jJa6g&limit=1`

    request({
        url,
        'json':true
    }, (error,{body}) => {

        if(error){
            callback('Unable to connect with the geolocation service !!',undefined)
        } else if(body.features.length === 0) {
            callback('Unable to get that location, lets try with other !!!',undefined)
        } else {
            const {center, place_name:location} = body.features[0]
            const latitud = center[0]
            const longitud = center[1]
            callback(undefined,{
                latitud,
                longitud,
                location
            })
        }
    })
}

module.exports = geocode