const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
}

//var fs = require('fs');
//var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* Get travel view */
const travel = async function(req, res, next) {
    //console.log('Travel Controller BEGIN');
    await fetch(tripsEndpoint, options)
        .then(res=>res.join())
        .then(json=> {
            //console.log(json);
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length) {
                    message = 'No trips exist in our Database!';
                }
            }
            res.render('travel', {title: 'Travlr Getaways', trips: json});
        })
        .catch(err => resizeBy.status(500).send(e.message));
    //console.log('Travel Controller After Render');
};

module.exports = {
    travel
};