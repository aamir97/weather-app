const request = require('request')
const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWFtaXIxIiwiYSI6ImNrMXQ3ODVlMDBucWwzbm5zYWpidmM0MnUifQ.o3eR3-vq9L5YBEncknfbFA&limit=1'
   request ({ url,json: true },(error,{body}) => {
       if(error){
           callback('unable to connect  to location service.. ', undefined)
       } else if (body.features.length === 0) {
        callback('unable to connect  to location service.. try another search ', undefined)

       }else {
           callback(undefined,{
               latitude: body.features[0].center[0],
               longitude: body.features[0].center[1],
               location: body.features[0].place_name
           })
       }
   })
}

module.exports = geocode;