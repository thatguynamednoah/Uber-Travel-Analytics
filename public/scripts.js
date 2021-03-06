search_return_vals = [];
search_pointer = 0;
search_pointer_init = 0;
search_pointer_final = 0;

$(function () {

    // GET/cab_type
    $('#cab_type').on('click', function () {
        ClearBelowTable()
        document.getElementById('container').style.display = "block";
        $.ajax({
            url: '/cab_type',
            contentType: 'application/json',
            success: function (response) {
    
                var tbodyEl = $('tbody');
    
                tbodyEl.html('<h2>Did Uber outpreform Lyft</h2>');
    
                    /*tbodyEl.append('\
                    <tr>\
                        <td class="Uber">' + 'Uber: ' + response.cab_type.Uber + '</td>\
                        <td class="Lyft">' + 'Lyft: ' + response.cab_type.Lyft + '</td>\
                        <td class="Total">' + 'Total: ' + response.cab_type.Total + '</td>\
                    </tr>\
                ');*/


                //pie chart
                anychart.onDocumentReady(function() {
 
                    // set the data
                    var data;
                    var name1 = "Uber";
                    var name2 = "Lyft";

                        
                    data = {
                        header: ["Name", "Number of Rides"],
                        rows: [
                              [name1, response.cab_type.Uber],
                              [name2, response.cab_type.Lyft]
                              ]
                    };



                   
                    // create the chart
                    var chart = anychart.pie();
             
                    // add the data
                    chart.data(data);

                    //change the radius
                    //chart.radius("100%");
             
                    // set the chart title
                    chart.title("Comparing " + name1 + " & " + name2);
                    
                    // set the position of labels
                    //chart.labels().position("outside");

                    // configure connectors
                    //chart.connectorStroke({color: "#595959", thickness: 2, dash:"2 2"});
             
                    // draw
                    chart.container("container");
                    chart.draw();
                 });



            }
        });
    });
    
    
    
        // GET/cab_price
        $('#cab_price').on('click', function () {
            ClearBelowTable()
            document.getElementById('container').style.display = "block";
            $.ajax({
                url: '/cab_price',
                contentType: 'application/json',
                success: function (response) {
    
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('<h2>Prices for Uber and Lyft</h2>');
                    /*tbodyEl.append('\
                        <tr>\
                            <td> <b>Ride Service</b> </td>\
                            <td> <b>Ride Type</b> </td>\
                            <td> <b>Minimum</b> </td>\
                            <td> <b>Maximum</b> </td>\
                        </tr>\
                    ');
                    response.cab_price.forEach(function (cab) {
                        tbodyEl.append('\
                        <tr>\
                            <td class="Cab_Type">' + cab.Cab_Type + '</td>\
                            <td class="Name">' + cab.Name + '</td>\
                            <td class="Lowest_price">' + cab.Lowest_price + '</td>\
                            <td class="Highest_price">' + cab.Highest_price + '</td>\
                        </tr>\
                    ');
    
                    });*/


                    anychart.onDocumentReady(function() {
 

                        var row = []

                        response.cab_price.forEach(function (cab) {
                        row.push([cab.Cab_Type + ": " + cab.Name, cab.Lowest_price, cab.Highest_price])
        
                        });
                         
                        var data = anychart.data.set(row);

                        // map the data
                        var seriesData_1 = data.mapAs({x: 0, value: 1});
                        var seriesData_2 = data.mapAs({x: 0, value: 2});
    
                       
                        // create the chart
                        var chart = anychart.bar();


                        // create the first series, set the data and name
                        var series1 = chart.bar(seriesData_1);
                        series1.name("Minimum Cost");

                        // create the second series, set the data and name
                        var series2 = chart.bar(seriesData_2);
                        series2.name("Maximum Cost");

                        // set the padding between bars
                        chart.barsPadding(-0.5);

                        // set the padding between bar groups
                        chart.barGroupsPadding(2);
 
                        // set the chart title
                        chart.title("Minimum and Maximum Prices for various riding services");
                 
                        // draw
                        chart.container("container");
                        chart.draw();
                     });







                }
            });
        });
    
            // GET/popular_destination_boston
            $('#popular_destination_boston').on('click', function () {
                ClearBelowTable()
                document.getElementById('container').style.display = "block";
                $.ajax({
                    url: '/popular_destination_boston',
                    contentType: 'application/json',
                    success: function (response) {
                        var tbodyEl = $('tbody');
        
                        tbodyEl.html('<h2>Most Popular Pick-up Locations and Destinations in Boston</h2>');



                        /*tbodyEl.append('\
                        <tr>\
                            <td class="Location">Source</td>\
                            <td class="Count">Count</td>\
                        </tr>\
                        ');
                        response.popular_destination_boston.forEach(function (cab) {

                            if(cab.Type == "Source")
                            {
                                tbodyEl.append('\
                                <tr>\
                                    <td class="Location">' + cab.Location + '</td>\
                                    <td class="Count">' + cab.Count + '</td>\
                                </tr>\
                            ');
                            }

        
                        });

                        tbodyEl.append('\
                        <tr>\
                            <td class="Location">Destination</td>\
                            <td class="Count">Count</td>\
                        </tr>\
                        ');
                        response.popular_destination_boston.forEach(function (cab) {
                            if(cab.Type == "Destination")
                            {
                                tbodyEl.append('\
                                <tr>\
                                    <td class="Location">' + cab.Location + '</td>\
                                    <td class="Count">' + cab.Count + '</td>\
                                </tr>\
                                ');
                            }

        
                        });*/




                        anychart.onDocumentReady(function() {
 

                            var row = []
                            response.popular_destination_boston.forEach(function (cab) {
                            

                                if(cab.Type == "Source")
                                {
                                    row.push([cab.Location, cab.Count, 0])
                                }
    
            
                            });

                            response.popular_destination_boston.forEach(function (cab) {

                                if(cab.Type == "Destination")
                                {
                                    let index = row.findIndex((item) => item[0] === cab.Location);
                                    row[index][2] = cab.Count;
                                }
    
            
                            });
                            
                             
                            var data = anychart.data.set(row);

                            // map the data
                            var seriesData_1 = data.mapAs({x: 0, value: 1});
                            var seriesData_2 = data.mapAs({x: 0, value: 2});
        
                           
                            // create the chart
                            var chart = anychart.bar();
                     
                            // add the data
                            //chart.data(data);


                            // create the first series, set the data and name
                            var series1 = chart.bar(seriesData_1);
                            series1.name("Source");

                            // create the second series, set the data and name
                            var series2 = chart.bar(seriesData_2);
                            series2.name("Destination");

                            // set the padding between bars
                            chart.barsPadding(-0.5);

                            // set the padding between bar groups
                            chart.barGroupsPadding(2);




                     
                            // set the chart title
                            chart.title("Most popular pick-up and drop-off locations");
                     
                            // draw
                            chart.container("container");
                            chart.draw();
                         });



                    }
                });

            });
    
    // GET/popular_routes
    $('#popular_routes').on('click', function () {
        ClearBelowTable()
        document.getElementById('container').style.display = "block";
        $.ajax({
            url: '/popular_routes',
            contentType: 'application/json',
            success: function (response) {
    
                var tbodyEl = $('tbody');
    
                tbodyEl.html('<h2>Most popular Drop-off Destinations for Uber and Lyft</h2>');
    
                /*response.popular_routes.forEach(function (cab) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="source">' + cab.source + '</td>\
                        <td class="destination">' + cab.destination + '</td>\
                        <td class="count">' + cab.count + '</td>\
                    </tr>\
                ');
    
                });*/




                anychart.onDocumentReady(function() {
 
                    // set the data
                    var data;
                    var row = [];
                        
                    response.popular_routes.forEach(function (cab) {
                        row.push([cab.source + " to " + cab.destination, cab.count]);
        
                    });
                        
                    data = {
                        header: ["Route", "Number of Rides"],
                        rows: row
                    };
   


                   
                    // create the chart
                    var chart = anychart.bar();
             
                    // add the data
                    chart.data(data);
             
                    // set the chart title
                    chart.title("Most popular routes");
             
                    // draw
                    chart.container("container");
                    chart.draw();
                 });



            }
        });
    });
    
        // GET/pickup
        $('#get-pickup').on('click', function () {
            ClearBelowTable()
            document.getElementById('container').style.display = "none";
            $.ajax({
                url: '/pickup_date',
                contentType: 'application/json',
                success: function (response) {
    
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
    
                    response.uber_date.forEach(function (uber) {
                        tbodyEl.append('\
                        <tr>\
                            <td class="date">' + uber.date + '</td>\
                            <td class="time">' + uber.time + '</td>\
                            <td class="longitude">' + uber.longitude + '</td>\
                            <td class="latitude">' + uber.latitude + '</td>\
                        </tr>\
                    ');
    
                    });
                }
            });
        });
    
    
        $('#save_uber_ride').on('click', function () {
            ClearBelowTable()
            document.getElementById('container').style.display = "none";
            $.ajax({
                url: '/save_uber',
                contentType: 'application/json',
                success: function (response) {
    
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
                    tbodyEl.append(response);
                }
            });
        });
    
    
        $('#save_fhv_ride').on('click', function () {
            ClearBelowTable()
            document.getElementById('container').style.display = "none";
            $.ajax({
                url: '/save_fhv',
                contentType: 'application/json',
                success: function (response) {
    
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
                    tbodyEl.append(response);
                }
            });
        });

        $('#save_lyft_ride').on('click', function () {
            ClearBelowTable()
            document.getElementById('container').style.display = "none";
            $.ajax({
                url: '/save_lyft',
                contentType: 'application/json',
                success: function (response) {
    
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
                    tbodyEl.append(response);
                }
            });
        });
    
        // GET/compare
        $('#compareDiplo').on('click', function () {
            ClearBelowTable()
            document.getElementById('container').style.display = "block";
            $.ajax({
                url: '/compareDiplo',
                contentType: 'application/json',
                success: function (response) {
    
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
                    tbodyEl.append('\
                    <tr>\
                        <td class="month">' + "month" + '</td>\
                        <td class="u_rides">' + "Uber Rides" + '</td>\
                        <td class="f_rides">' + response.comparing[0].f_name + " Rides" + '</td>\
                    </tr>\
                    ');
    
                    response.comparing.forEach(function (compare) {
                        tbodyEl.append('\
                        <tr>\
                            <td class="month">' + compare.month + '</td>\
                            <td class="u_rides">' + compare.u_rides + '</td>\
                            <td class="f_rides">' + compare.f_rides + '</td>\
                        </tr>\
                        ');
    
                    });
    
                }
            });
        });
    
    
    
        // CREATE/POST
        $('#search_parameters').on('submit', function (event) {
            event.preventDefault();
            search_pointer = 0;
            var ride_service = $('#ride_service');
            var date_begin = $('#date_begin');
            var date_end = $('#date_end');
            var time_begin = $('#time_begin');
            var time_end = $('#time_end');
            var location = $('#location');
            //--------------------------------
            // var distance_traveled = $('#distance_traveled');
            var source = $('#source');
            var destination = $('#destination');
            // var price_from = $('#price_from');
            // var price_to = $('#price_to');
            var lyft_type = $('#lyft_type');
            //--------------------------------
            var search_type = '';
    
            if ($('#search_type:checked').val() != 'on') {
                search_type = 'view_only';
            }
            else {
                search_type = 'edit';
            }
    
            console.log(ride_service.val(),/* date_begin.val(), date_end.val(), time_begin.val(), time_end.val(), location.val(),*/source.val(), destination.val(), lyft_type.val(), search_type);
    
            //loading animation show
            document.getElementById('loader').style.display = "block";


            $.ajax({
                url: '/search_results',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ rideService: ride_service.val(), dateBegin: date_begin.val(), dateEnd: date_end.val(), timeBegin: time_begin.val(), timeEnd: time_end.val(), address: location.val(), source: source.val(), destination: destination.val(), lyftType: lyft_type.val(), searchType: search_type }),

                
                
                success: function (response) {
                    //hide the loader
                    document.getElementById('loader').style.display = "none";
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
                    search_return_vals = response;

                    final_is_larger = false;
                    if (search_return_vals.length < 20) {
                        final_is_larger = true;
                    }
                    else {
                        final_is_larger = false;
                    }

                    response.forEach(ride => {
                        if (search_pointer < 20) {
                        if (ride.Type == 'view_only') {
                            tbodyEl.append('\
                                <tr>\
                                    <td class="date">' + 'Date: ' + ride.Date + ' | ' + '</td>\
                                    <td class="time">' + 'Time: ' + ride.Time + ' | ' + '</td>\
                                    <td class="address">' + 'Address: ' + ride.Address + '</td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'view_only_l') {
                            tbodyEl.append('\
                                <tr>\
                                    <td class="source">' + 'Source: ' + ride.Source + ' | ' + '</td>\
                                    <td class="destination">' + 'Destination: ' + ride.Destination + ' | ' + '</td>\
                                    <td class="lyft_type">' + 'Ride Type: ' + ride.lyftType + ' | ' + '</td>\
                                    <td class="price">' + 'Price: $' + ride.Price + '</td>\
                                    <td class="distance">' + '| Distance (mi): ' + ride.Distance + '</td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'edit_uber') {
                            tbodyEl.append('\
                                <tr>\
                                    <td>' + 'Identifier: ' + '</td>\
                                    <td class="identifier">' + ride.Identifier + '</td>\
                                    <td>' + ' | ' + '</td>\
                                    <td>' + 'Date: ' + '<input type="date" class="date" min="2014-04-01" max="2014-09-30" value="' + ride.Date + '"></td>\
                                    <td>' + 'Time: ' + '<input type="time" class="time" value="' + ride.Time + '"></td>\
                                    <td>' + 'Longitude: ' + '<input type="text" class="longitude" value="' + ride.Longitude + '"></td>\
                                    <td>' + 'Latitude: ' + '<input type="text" class="latitude" value="' + ride.Latitude + '"></td>\
                                    <td>' + 'Base: ' + '<input type="text" class="base" value="' + ride.Base + '"></td>\
                                    <td>\
                                        <button class="modify_uber_ride"> Update Ride </button>\
                                        <button class="delete_uber_ride"> Remove Ride </button>\
                                    </td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'edit_fhv') {
                            tbodyEl.append('\
                                <tr>\
                                    <td>' + 'Identifier: ' + '</td>\
                                    <td class="identifier">' + ride.Identifier + '</td>\
                                    <td>' + ' | ' + '</td>\
                                    <td>' + 'Date: ' + '<input type="date" class="date" min="2014-07-01" max="2014-09-30" value="' + ride.Date + '"></td>\
                                    <td>' + 'Time: ' + '<input type="time" class="time" value="' + ride.Time + '"></td>\
                                    <td>' + 'Address: ' + '<input type="text" class="address" value="' + ride.Address + '"></td>\
                                    <td>\
                                        <button class="modify_fhv_ride"> Update Ride </button>\
                                        <button class="delete_fhv_ride"> Remove Ride </button>\
                                    </td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'edit_lyft') {
                            tbodyEl.append('\
                                <tr>\
                                <td>' + 'Identifier: ' + '</td>\
                                <td class="identifier">' + ride.Identifier + '</td>\
                                <td>' + ' | ' + '</td>\
                                <td>\
                                    Source: <select class="source1" id="source1" value=' + ride.Source + '>\
                                        <option disabled selected value> Select Location </option>\
                                        <option value="Haymarket Square">Haymarket Square</option>\
                                        <option value="Back Bay">Back Bay</option>\
                                        <option value="North End">North End</option>\
                                        <option value="North Station">North Station</option>\
                                        <option value="Beacon Hill">Beacon Hill</option>\
                                        <option value="Boston University">Boston University</option>\
                                        <option value="Fenway">Fenway</option>\
                                        <option value="South Station">South Station</option>\
                                        <option value="Theatre District">Theatre District</option>\
                                        <option value="West End">West End</option>\
                                        <option value="Financial District">Financial District</option>\
                                        <option value="Northeastern University">Northeastern University</option>\
                                    </select> | \
                                <td>\
                                <td>\
                                    Destination: <select class="destination1" id="destination1" value=' + ride.Destination + '>\
                                        <option disabled selected value> Select Location </option>\
                                        <option value="Haymarket Square">Haymarket Square</option>\
                                        <option value="Back Bay">Back Bay</option>\
                                        <option value="North End">North End</option>\
                                        <option value="North Station">North Station</option>\
                                        <option value="Beacon Hill">Beacon Hill</option>\
                                        <option value="Boston University">Boston University</option>\
                                        <option value="Fenway">Fenway</option>\
                                        <option value="South Station">South Station</option>\
                                        <option value="Theatre District">Theatre District</option>\
                                        <option value="West End">West End</option>\
                                        <option value="Financial District">Financial District</option>\
                                        <option value="Northeastern University">Northeastern University</option>\
                                    </select> | \
                                <td>\
                                <td>\
                                    Type: <select class="lyft_type1" id="lyft_type1" value=' + ride.lyftType + '>\
                                        <option disabled selected value> Select Type </option>\
                                        <option value="Shared">Shared</option>\
                                        <option value="Lux">Lux</option>\
                                        <option value="Lyft">Lyft</option>\
                                        <option value="Lux Black XL">Lux Black XL</option>\
                                        <option value="Lyft XL">Lyft XL</option>\
                                        <option value="Lux Black">Lux Black</option>\
                                    </select> | \
                                <td>\
                                <td>' + 'Price: ' + '<input type="number" class="price" min="0.0" max="100.0" step="0.1" value=' + ride.Price + '>' + '</td>\
                                <td>' + '| Distance (mi): ' + '<input type="number" class="distance_traveled" min="0.00" max="10.00" step="0.01" value=' + ride.Distance + '>' + '</td>\
                                    <td>\
                                        <button class="modify_lyft_ride"> Update Ride </button>\
                                        <button class="delete_lyft_ride"> Remove Ride </button>\
                                    </td>\
                                </tr>\
                            ');
                        }
                        }
                        if (search_pointer < 20) { 
                            search_pointer += 1;
                        }
                    });
                    if (!final_is_larger) {
                        tbodyEl.append('\
                                <tr>\
                                    <td>\
                                        <button class="next_twenty"> >> </button>\
                                    </td>\
                                </tr>\
                            ');
                    }
                }
            });
        });

        $('table').on('click', '.next_twenty', function () {
            $.ajax({
                url: '/next_twenty',
                method: 'POST',
                contentType: 'application/json',

                success: function (response) {
                    var tbodyEl = $('tbody');
                    
                    tbodyEl.html('');
                    search_pointer_init = search_pointer;
                    search_pointer_final = search_pointer + 20;
                    search_pointer = 0;
                    final_is_larger = false;
                    if (search_pointer_final > search_return_vals.length) {
                        final_is_larger = true
                    }
                    else {
                        final_is_larger = false;
                    }

                    search_return_vals.forEach(ride => {
                        console.log(search_pointer, search_pointer_init, search_pointer_final, search_pointer >= search_pointer_init, search_pointer < search_pointer_final)
                        if (search_pointer >= search_pointer_init && search_pointer < search_pointer_final) {
                        if (ride.Type == 'view_only') {
                            tbodyEl.append('\
                                <tr>\
                                    <td class="date">' + 'Date: ' + ride.Date + ' | ' + '</td>\
                                    <td class="time">' + 'Time: ' + ride.Time + ' | ' + '</td>\
                                    <td class="address">' + 'Address: ' + ride.Address + '</td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'view_only_l') {
                            tbodyEl.append('\
                                <tr>\
                                    <td class="source">' + 'Source: ' + ride.Source + ' | ' + '</td>\
                                    <td class="destination">' + 'Destination: ' + ride.Destination + ' | ' + '</td>\
                                    <td class="lyft_type">' + 'Ride Type: ' + ride.lyftType + ' | ' + '</td>\
                                    <td class="price">' + 'Price: $' + ride.Price + '</td>\
                                    <td class="distance">' + '| Distance (mi): ' + ride.Distance + '</td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'edit_uber') {
                            tbodyEl.append('\
                                <tr>\
                                    <td>' + 'Identifier: ' + '</td>\
                                    <td class="identifier">' + ride.Identifier + '</td>\
                                    <td>' + ' | ' + '</td>\
                                    <td>' + 'Date: ' + '<input type="date" class="date" min="2014-04-01" max="2014-09-30" value="' + ride.Date + '"></td>\
                                    <td>' + 'Time: ' + '<input type="time" class="time" value="' + ride.Time + '"></td>\
                                    <td>' + 'Longitude: ' + '<input type="text" class="longitude" value="' + ride.Longitude + '"></td>\
                                    <td>' + 'Latitude: ' + '<input type="text" class="latitude" value="' + ride.Latitude + '"></td>\
                                    <td>' + 'Base: ' + '<input type="text" class="base" value="' + ride.Base + '"></td>\
                                    <td>\
                                        <button class="modify_uber_ride"> Update Ride </button>\
                                        <button class="delete_uber_ride"> Remove Ride </button>\
                                    </td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'edit_fhv') {
                            tbodyEl.append('\
                                <tr>\
                                    <td>' + 'Identifier: ' + '</td>\
                                    <td class="identifier">' + ride.Identifier + '</td>\
                                    <td>' + ' | ' + '</td>\
                                    <td>' + 'Date: ' + '<input type="date" class="date" min="2014-07-01" max="2014-09-30" value="' + ride.Date + '"></td>\
                                    <td>' + 'Time: ' + '<input type="time" class="time" value="' + ride.Time + '"></td>\
                                    <td>' + 'Address: ' + '<input type="text" class="address" value="' + ride.Address + '"></td>\
                                    <td>\
                                        <button class="modify_fhv_ride"> Update Ride </button>\
                                        <button class="delete_fhv_ride"> Remove Ride </button>\
                                    </td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'edit_lyft') {
                            tbodyEl.append('\
                                <tr>\
                                <td>' + 'Identifier: ' + '</td>\
                                <td class="identifier">' + ride.Identifier + '</td>\
                                <td>' + ' | ' + '</td>\
                                <td>\
                                    Source: <select class="source1" id="source1" value=' + ride.Source + '>\
                                        <option disabled selected value> Select Location </option>\
                                        <option value="Haymarket Square">Haymarket Square</option>\
                                        <option value="Back Bay">Back Bay</option>\
                                        <option value="North End">North End</option>\
                                        <option value="North Station">North Station</option>\
                                        <option value="Beacon Hill">Beacon Hill</option>\
                                        <option value="Boston University">Boston University</option>\
                                        <option value="Fenway">Fenway</option>\
                                        <option value="South Station">South Station</option>\
                                        <option value="Theatre District">Theatre District</option>\
                                        <option value="West End">West End</option>\
                                        <option value="Financial District">Financial District</option>\
                                        <option value="Northeastern University">Northeastern University</option>\
                                    </select> | \
                                <td>\
                                <td>\
                                    Destination: <select class="destination1" id="destination1" value=' + ride.Destination + '>\
                                        <option disabled selected value> Select Location </option>\
                                        <option value="Haymarket Square">Haymarket Square</option>\
                                        <option value="Back Bay">Back Bay</option>\
                                        <option value="North End">North End</option>\
                                        <option value="North Station">North Station</option>\
                                        <option value="Beacon Hill">Beacon Hill</option>\
                                        <option value="Boston University">Boston University</option>\
                                        <option value="Fenway">Fenway</option>\
                                        <option value="South Station">South Station</option>\
                                        <option value="Theatre District">Theatre District</option>\
                                        <option value="West End">West End</option>\
                                        <option value="Financial District">Financial District</option>\
                                        <option value="Northeastern University">Northeastern University</option>\
                                    </select> | \
                                <td>\
                                <td>\
                                    Type: <select class="lyft_type1" id="lyft_type1" value=' + ride.lyftType + '>\
                                        <option disabled selected value> Select Type </option>\
                                        <option value="Shared">Shared</option>\
                                        <option value="Lux">Lux</option>\
                                        <option value="Lyft">Lyft</option>\
                                        <option value="Lux Black XL">Lux Black XL</option>\
                                        <option value="Lyft XL">Lyft XL</option>\
                                        <option value="Lux Black">Lux Black</option>\
                                    </select> | \
                                <td>\
                                <td>' + 'Price: ' + '<input type="number" class="price" min="0.0" max="100.0" step="0.1" value=' + ride.Price + '>' + '</td>\
                                <td>' + '| Distance (mi): ' + '<input type="number" class="distance_traveled" min="0.00" max="10.00" step="0.01" value=' + ride.Distance + '>' + '</td>\
                                    <td>\
                                        <button class="modify_lyft_ride"> Update Ride </button>\
                                        <button class="delete_lyft_ride"> Remove Ride </button>\
                                    </td>\
                                </tr>\
                            ');
                        }
                        }
                        if (search_pointer < search_pointer_final) {
                            search_pointer += 1;
                        }
                    });
                    if (final_is_larger) {
                        tbodyEl.append('\
                                <tr>\
                                    <td>\
                                        <button class="past_twenty"> << </button>\
                                    </td>\
                                </tr>\
                            ');
                        search_pointer = search_pointer_final
                    }
                    if (!final_is_larger) {
                        tbodyEl.append('\
                                <tr>\
                                    <td>\
                                        <button class="past_twenty"> << </button>\
                                        <button class="next_twenty"> >> </button>\
                                    </td>\
                                </tr>\
                            ');
                    }
                    
                }
            });
        });

        $('table').on('click', '.past_twenty', function () {
            $.ajax({
                url: '/past_twenty',
                method: 'POST',
                contentType: 'application/json',

                success: function (response) {
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
                    console.log(search_pointer, search_pointer_init, search_pointer_final, search_pointer >= search_pointer_init, search_pointer < search_pointer_final)

                    search_pointer_init = (search_pointer - 40);
                    search_pointer_final = search_pointer_init + 20;
                    search_pointer = 0;

                    if (search_pointer_init < 0) {
                        search_pointer_init = 0;
                        search_pointer_final = 20;
                    }
                    init_is_smaller = false;
                    if (search_pointer_init <= 0) {
                        init_is_smaller = true
                    }
                    else {
                        init_is_smaller = false;
                    }
                    console.log(search_pointer, search_pointer_init, search_pointer_final, search_pointer >= search_pointer_init, search_pointer < search_pointer_final)

                    search_return_vals.forEach(ride => {
                        if (search_pointer >= search_pointer_init && search_pointer < search_pointer_final) {
                        if (ride.Type == 'view_only') {
                            tbodyEl.append('\
                                <tr>\
                                    <td class="date">' + 'Date: ' + ride.Date + ' | ' + '</td>\
                                    <td class="time">' + 'Time: ' + ride.Time + ' | ' + '</td>\
                                    <td class="address">' + 'Address: ' + ride.Address + '</td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'view_only_l') {
                            tbodyEl.append('\
                                <tr>\
                                    <td class="source">' + 'Source: ' + ride.Source + ' | ' + '</td>\
                                    <td class="destination">' + 'Destination: ' + ride.Destination + ' | ' + '</td>\
                                    <td class="lyft_type">' + 'Ride Type: ' + ride.lyftType + ' | ' + '</td>\
                                    <td class="price">' + 'Price: $' + ride.Price + '</td>\
                                    <td class="distance">' + '| Distance (mi): ' + ride.Distance + '</td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'edit_uber') {
                            tbodyEl.append('\
                                <tr>\
                                    <td>' + 'Identifier: ' + '</td>\
                                    <td class="identifier">' + ride.Identifier + '</td>\
                                    <td>' + ' | ' + '</td>\
                                    <td>' + 'Date: ' + '<input type="date" class="date" min="2014-07-01" max="2014-09-30" value="' + ride.Date + '"></td>\
                                    <td>' + 'Time: ' + '<input type="time" class="time" value="' + ride.Time + '"></td>\
                                    <td>' + 'Longitude: ' + '<input type="text" class="longitude" value="' + ride.Longitude + '"></td>\
                                    <td>' + 'Latitude: ' + '<input type="text" class="latitude" value="' + ride.Latitude + '"></td>\
                                    <td>' + 'Base: ' + '<input type="text" class="base" value="' + ride.Base + '"></td>\
                                    <td>\
                                        <button class="modify_uber_ride"> Update Ride </button>\
                                        <button class="delete_uber_ride"> Remove Ride </button>\
                                    </td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'edit_fhv') {
                            tbodyEl.append('\
                                <tr>\
                                    <td>' + 'Identifier: ' + '</td>\
                                    <td class="identifier">' + ride.Identifier + '</td>\
                                    <td>' + ' | ' + '</td>\
                                    <td>' + 'Date: ' + '<input type="date" class="date" min="2014-07-01" max="2014-09-30" value="' + ride.Date + '"></td>\
                                    <td>' + 'Time: ' + '<input type="time" class="time" value="' + ride.Time + '"></td>\
                                    <td>' + 'Address: ' + '<input type="text" class="address" value="' + ride.Address + '"></td>\
                                    <td>\
                                        <button class="modify_fhv_ride"> Update Ride </button>\
                                        <button class="delete_fhv_ride"> Remove Ride </button>\
                                    </td>\
                                </tr>\
                            ');
                        }
                        else if (ride.Type == 'edit_lyft') {
                            tbodyEl.append('\
                                <tr>\
                                <td>' + 'Identifier: ' + '</td>\
                                <td class="identifier">' + ride.Identifier + '</td>\
                                <td>' + ' | ' + '</td>\
                                <td>\
                                    Source: <select class="source1" id="source1" value=' + ride.Source + '>\
                                        <option disabled selected value> Select Location </option>\
                                        <option value="Haymarket Square">Haymarket Square</option>\
                                        <option value="Back Bay">Back Bay</option>\
                                        <option value="North End">North End</option>\
                                        <option value="North Station">North Station</option>\
                                        <option value="Beacon Hill">Beacon Hill</option>\
                                        <option value="Boston University">Boston University</option>\
                                        <option value="Fenway">Fenway</option>\
                                        <option value="South Station">South Station</option>\
                                        <option value="Theatre District">Theatre District</option>\
                                        <option value="West End">West End</option>\
                                        <option value="Financial District">Financial District</option>\
                                        <option value="Northeastern University">Northeastern University</option>\
                                    </select> | \
                                <td>\
                                <td>\
                                    Destination: <select class="destination1" id="destination1" value=' + ride.Destination + '>\
                                        <option disabled selected value> Select Location </option>\
                                        <option value="Haymarket Square">Haymarket Square</option>\
                                        <option value="Back Bay">Back Bay</option>\
                                        <option value="North End">North End</option>\
                                        <option value="North Station">North Station</option>\
                                        <option value="Beacon Hill">Beacon Hill</option>\
                                        <option value="Boston University">Boston University</option>\
                                        <option value="Fenway">Fenway</option>\
                                        <option value="South Station">South Station</option>\
                                        <option value="Theatre District">Theatre District</option>\
                                        <option value="West End">West End</option>\
                                        <option value="Financial District">Financial District</option>\
                                        <option value="Northeastern University">Northeastern University</option>\
                                    </select> | \
                                <td>\
                                <td>\
                                    Type: <select class="lyft_type1" id="lyft_type1" value=' + ride.lyftType + '>\
                                        <option disabled selected value> Select Type </option>\
                                        <option value="Shared">Shared</option>\
                                        <option value="Lux">Lux</option>\
                                        <option value="Lyft">Lyft</option>\
                                        <option value="Lux Black XL">Lux Black XL</option>\
                                        <option value="Lyft XL">Lyft XL</option>\
                                        <option value="Lux Black">Lux Black</option>\
                                    </select> | \
                                <td>\
                                <td>' + 'Price: ' + '<input type="number" class="price" min="0.0" max="100.0" step="0.1" value=' + ride.Price + '>' + '</td>\
                                <td>' + '| Distance (mi): ' + '<input type="number" class="distance_traveled" min="0.00" max="10.00" step="0.01" value=' + ride.Distance + '>' + '</td>\
                                    <td>\
                                        <button class="modify_lyft_ride"> Update Ride </button>\
                                        <button class="delete_lyft_ride"> Remove Ride </button>\
                                    </td>\
                                </tr>\
                            ');
                        }
                        }
                        if (search_pointer < search_pointer_final) {
                            search_pointer += 1;
                        }
                    });
                    if (init_is_smaller) {
                        tbodyEl.append('\
                                <tr>\
                                    <td>\
                                        <button class="next_twenty"> >> </button>\
                                    </td>\
                                </tr>\
                            ');
                    }
                    if (!init_is_smaller) {
                        tbodyEl.append('\
                                <tr>\
                                    <td>\
                                        <button class="past_twenty"> << </button>\
                                        <button class="next_twenty"> >> </button>\
                                    </td>\
                                </tr>\
                            ');
                    }
                }
            });
        });
    
    
    
    
    
    // CREATE/POST
    $('#busiest-times').on('click', function (event) {
        ClearBelowTable()
        document.getElementById('container').style.display = "none";
        event.preventDefault();
    
        $.ajax({
            url: '/busiest-times',
            method: 'POST',
            contentType: 'application/json',
    
            success: function (response) {
                var tbodyEl = $('tbody');
    
                tbodyEl.html('');
    
    
                    tbodyEl.append('\
                        <tr>\
                            <td>' + '<b>Select a Riding Service to view Pick-ups per Hour</b> | ' + '</td>\
                            <td>\
                                Ride Service: <select class="service_selector_time" id="ride_service_time">\
                                <option value="Uber">Uber</option>\
                                <option value="American">American</option>\
                                <option value="Diplo">Diplo</option>\
                                <option value="Firstclass">Firstclass</option>\
                                <option value="Highclass">Highclass</option>\
                                <option value="Prestige">Prestige</option>\
                                </select>\
                                <button class="service4Time"> Search Times </button>\
                            </td>\
                        </tr>\
                    ');
                    ClearBelowTable();
            }
        });
    });
    
    
    
        //Process busiest-time query and search
        $('table').on('click', '.service4Time', function () {
            ClearBelowTable()
            document.getElementById('container').style.display = "block";
            console.log("Before...")
            var rowEl = $(this).closest('tr');
            var service = rowEl.find('.service_selector_time').val();
            console.log("After...")
            $.ajax({
                url: '/find_busiest_time',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ Service: service }),
                success: function (response) {
                    //console.log(response);
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('<h2>Busiest Times for '+service+'</h2>');
    
                    /*tbodyEl.append('\
                    <tr>' + '<b>' + 'service' + ' Pick-ups per Hour</b> ' + '</tr>\
                    <tr>\
                        <td class="hour">' + "Hour" + '</td>\
                        <td class="value">' + "Number of Rides" + '</td>\
                    </tr>\
                    ');
    
                    response.Busiest_Time.forEach(function (time) {
                        tbodyEl.append('\
                        <tr>\
                            <td class="hour">' + time.hour + '</td>\
                            <td class="value">' + time.value + '</td>\
                        </tr>\
                    ');
                    });*/


                    anychart.onDocumentReady(function() {
 
                        // set the data
                        const data=[];
                        
                        response.Busiest_Time.forEach(function (time) {
                            data.push({"x": time.hour, "value": time.value});
                        });
    
    
                       
                        // create the chart
                        var chart = anychart.line();
                 
                        // add the data
                        chart.data(data);
                 
                        // set the chart title
                        chart.title("Number of Pickups per Hour for "+service);
                 
                        // draw
                        chart.container("container");
                        chart.draw();
                     });




                }
            });
        });
    
    
    
    
    
    
        // CREATE/POST
        $('#add_fhv_ride').on('click', function (event) {
            ClearBelowTable()
            document.getElementById('container').style.display = "none";
            event.preventDefault();
    
            $.ajax({
                url: '/add_fhv_ride',
                method: 'POST',
                contentType: 'application/json',
    
                success: function (response) {
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
    
    
                        tbodyEl.append('\
                            <tr>\
                                <td>' + '<b>Add a For-Hire Service Trip</b> | ' + '</td>\
                                <td>\
                                    Ride Service: <select class="service_selector" id="ride_service">\
                                    <option value="American">American</option>\
                                    <option value="Diplo">Diplo</option>\
                                    <option value="Firstclass">Firstclass</option>\
                                    <option value="Highclass">Highclass</option>\
                                    <option value="Prestige">Prestige</option>\
                                    </select>\
                                </td>\
                                <td>' + ' Date: ' + '<input type="date" min="2014-07-01" max="2014-09-30" class="date"></td>\
                                <td>' + ' Time: ' + '<input type="time" class="time"></td>\
                                <td>' + ' Address: ' + '<input type="text" class="address" placeholder="2557 Marion Ave Fordham"></td>\
                                <td>\
                                    <button class="new_fhv_ride"> Add Ride </button>\
                                </td>\
                            </tr>\
                        ');
                        ClearBelowTable();
                }
            });
        });
    
        // CREATE/POST
        $('#add_uber_ride').on('click', function (event) {
            ClearBelowTable()
            document.getElementById('container').style.display = "none";
            event.preventDefault();
    
            $.ajax({
                url: '/add_uber_ride',
                method: 'POST',
                contentType: 'application/json',
    
                success: function (response) {
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
    
                        tbodyEl.append('\
                            <tr>\
                                <td>' + '<b>Add an Uber Trip</b> | ' + '</td>\
                                <td>' + ' Date: ' + '<input type="date" min="2014-04-01" max="2014-09-30" class="date"></td>\
                                <td>' + ' Time: ' + '<input type="time" class="time"></td>\
                                <td>' + ' Longitude: ' + '<input type="text" class="longitude" placeholder="-7X.XXXX"></td>\
                                <td>' + ' Latitude: ' + '<input type="text" class="latitude" placeholder="40.XXXX"></td>\
                                <td>' + ' Base: ' + '<input type="text" class="base" placeholder="B02XXX"></td>\
                                <td>\
                                    <button class="new_uber_ride"> Add Ride </button>\
                                </td>\
                            </tr>\
                        ');
                }
            });
        });

        // CREATE/POST
        $('#add_lyft_ride').on('click', function (event) {
            ClearBelowTable()
            document.getElementById('container').style.display = "none";
            event.preventDefault();
    
            $.ajax({
                url: '/add_lyft_ride',
                method: 'POST',
                contentType: 'application/json',
    
                success: function (response) {
                    var tbodyEl = $('tbody');
    
                    tbodyEl.html('');
    
                    tbodyEl.append('\
                    <tr>\
                    <td>' + '<b>Add a Lyft Trip</b> | ' + '</td>\
                    <td>\
                        Source: <select class="source1" id="source1">\
                            <option disabled selected value> Select Location </option>\
                            <option value="Haymarket Square">Haymarket Square</option>\
                            <option value="Back Bay">Back Bay</option>\
                            <option value="North End">North End</option>\
                            <option value="North Station">North Station</option>\
                            <option value="Beacon Hill">Beacon Hill</option>\
                            <option value="Boston University">Boston University</option>\
                            <option value="Fenway">Fenway</option>\
                            <option value="South Station">South Station</option>\
                            <option value="Theatre District">Theatre District</option>\
                            <option value="West End">West End</option>\
                            <option value="Financial District">Financial District</option>\
                            <option value="Northeastern University">Northeastern University</option>\
                        </select>  \
                    <td>\
                    <td>\
                        Destination: <select class="destination1" id="destination1">\
                            <option disabled selected value> Select Location </option>\
                            <option value="Haymarket Square">Haymarket Square</option>\
                            <option value="Back Bay">Back Bay</option>\
                            <option value="North End">North End</option>\
                            <option value="North Station">North Station</option>\
                            <option value="Beacon Hill">Beacon Hill</option>\
                            <option value="Boston University">Boston University</option>\
                            <option value="Fenway">Fenway</option>\
                            <option value="South Station">South Station</option>\
                            <option value="Theatre District">Theatre District</option>\
                            <option value="West End">West End</option>\
                            <option value="Financial District">Financial District</option>\
                            <option value="Northeastern University">Northeastern University</option>\
                        </select>  \
                    <td>\
                    <td>\
                        Type: <select class="lyft_type1" id="lyft_type1">\
                            <option disabled selected value> Select Type </option>\
                            <option value="Shared">Shared</option>\
                            <option value="Lux">Lux</option>\
                            <option value="Lyft">Lyft</option>\
                            <option value="Lux Black XL">Lux Black XL</option>\
                            <option value="Lyft XL">Lyft XL</option>\
                            <option value="Lux Black">Lux Black</option>\
                        </select>  \
                    <td>\
                    <td>' + 'Price: ' + '<input type="number" class="price" min="0.0" max="100.0" step="0.1">' + '</td>\
                    <td>' + ' Distance (mi): ' + '<input type="number" class="distance_traveled" min="0.00" max="10.00" step="0.01">' + '</td>\
                    <td>\
                        <button class="new_lyft_ride"> Add Ride </button>\
                    </td>\
                    </tr>\
                ');
                }
            });
        });
    
        // Add New Ride
        $('table').on('click', '.new_fhv_ride', function () {
            var rowEl = $(this).closest('tr');
            var newService = rowEl.find('.service_selector').val();
            var newDate = rowEl.find('.date').val();
            var newTime = rowEl.find('.time').val();
            var newAddress = rowEl.find('.address').val();
    
            $.ajax({
                url: '/add_fhv',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ Service: newService, Date: newDate, Time: newTime, Address: newAddress }),
                success: function (response) {
                    console.log(response);
                }
            });
        });
    
        $('table').on('click', '.new_uber_ride', function () {
            var rowEl = $(this).closest('tr');
            var newDate = rowEl.find('.date').val();
            var newTime = rowEl.find('.time').val();
            var newLongitude = rowEl.find('.longitude').val();
            var newLatitude = rowEl.find('.latitude').val();
            var newBase = rowEl.find('.base').val();
    
            $.ajax({
                url: '/add_uber',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ Date: newDate, Time: newTime, Longitude: newLongitude, Latitude: newLatitude, Base: newBase }),
                success: function (response) {
                    console.log(response);
                }
            });
        });
        // Add New Ride
        $('table').on('click', '.new_fhv_ride', function () {
            var rowEl = $(this).closest('tr');
            var newService = rowEl.find('.service_selector').val();
            var newDate = rowEl.find('.date').val();
            var newTime = rowEl.find('.time').val();
            var newAddress = rowEl.find('.address').val();
    
            $.ajax({
                url: '/add_fhv',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ Service: newService, Date: newDate, Time: newTime, Address: newAddress }),
                success: function (response) {
                    console.log(response);
                }
            });
        });
    
        $('table').on('click', '.new_uber_ride', function () {
            var rowEl = $(this).closest('tr');
            var newDate = rowEl.find('.date').val();
            var newTime = rowEl.find('.time').val();
            var newLongitude = rowEl.find('.longitude').val();
            var newLatitude = rowEl.find('.latitude').val();
            var newBase = rowEl.find('.base').val();
    
            $.ajax({
                url: '/add_uber',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ Date: newDate, Time: newTime, Longitude: newLongitude, Latitude: newLatitude, Base: newBase }),
                success: function (response) {
                    console.log(response);
                }
            });
        });

        $('table').on('click', '.new_lyft_ride', function () {
            var rowEl = $(this).closest('tr');
            var newSource = rowEl.find('.source1').val();
            var newDestination = rowEl.find('.destination1').val();
            var newLyftType = rowEl.find('.lyft_type1').val();
            var newPrice = rowEl.find('.price').val();
            var newDistance = rowEl.find('.distance_traveled').val();
    
            $.ajax({
                url: '/add_lyft',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ Source: newSource, Destination: newDestination, LyftType: newLyftType, Price: newPrice, Distance: newDistance}),
                success: function (response) {
                    console.log(response);
                }
            });
        });
    
        //Modify Rides
        $('table').on('click', '.modify_fhv_ride', function () {
            var rowEl = $(this).closest('tr');
            var Identifier = rowEl.find('.identifier').text();
            var newDate = rowEl.find('.date').val();
            var newTime = rowEl.find('.time').val();
            var newAddress = rowEl.find('.address').val();
    
            $.ajax({
                url: '/modify_fhv/' + Identifier,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ Date: newDate, Time: newTime, Address: newAddress }),
                success: function (response) {
                    console.log(response);
                }
            });
        });
    
        $('table').on('click', '.modify_uber_ride', function () {
            var rowEl = $(this).closest('tr');
            var Identifier = rowEl.find('.identifier').text();
            var newDate = rowEl.find('.date').val();
            var newTime = rowEl.find('.time').val();
            var newLongitude = rowEl.find('.longitude').val();
            var newLatitude = rowEl.find('.latitude').val();
            var newBase = rowEl.find('.base').val();
    
            $.ajax({
                url: '/modify_uber/' + Identifier,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ Date: newDate, Time: newTime, Longitude: newLongitude, Latitude: newLatitude, Base: newBase }),
                success: function (response) {
                    console.log(response);
                }
            });
        });

        $('table').on('click', '.modify_lyft_ride', function () {
            var rowEl = $(this).closest('tr');
            var Identifier = rowEl.find('.identifier').text();
            var newSource = rowEl.find('.source1').val();
            var newDestination = rowEl.find('.destination1').val();
            var newLyftType = rowEl.find('.lyft_type1').val();
            var newPrice = rowEl.find('.price').val();
            var newDistance = rowEl.find('.distance_traveled').val();
            console.log(Identifier, newSource, newDestination, newLyftType, newPrice, newDistance)
            $.ajax({
                url: '/modify_lyft/' + Identifier,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ Source: newSource, Destination: newDestination, LyftType: newLyftType, Price: newPrice, Distance: newDistance}),
                success: function (response) {
                    console.log(response);
                }
            });
        });
    
        //Delete Rides
        $('table').on('click', '.delete_fhv_ride', function () {
            var rowEl = $(this).closest('tr');
            var Identifier = rowEl.find('.identifier').text();
            
            $.ajax({
                url: '/delete_fhv/' + Identifier,
                method: 'DELETE',
                contentType: 'application/json',
                success: function (response) {
                    console.log(response);
                    $('#initiate_search').click();
                }
            });
        });
    
        $('table').on('click', '.delete_uber_ride', function () {
            var rowEl = $(this).closest('tr');
            var Identifier = rowEl.find('.identifier').text();
            
            $.ajax({
                url: '/delete_uber/' + Identifier,
                method: 'DELETE',
                contentType: 'application/json',
                success: function (response) {
                    console.log(response);
                    $('#initiate_search').click();
                }
            });
        });

        $('table').on('click', '.delete_lyft_ride', function () {
            var rowEl = $(this).closest('tr');
            var Identifier = rowEl.find('.identifier').text();
            
            $.ajax({
                url: '/delete_lyft/' + Identifier,
                method: 'DELETE',
                contentType: 'application/json',
                success: function (response) {
                    console.log(response);
                    $('#initiate_search').click();
                }
            });
        });


    // CREATE/POST
    $('#compare_parameters').on('submit', function (event) {
        event.preventDefault();
        document.getElementById('container').style.display = "block";
        var ride_service_1 = $('#ride_service_compare_1');
        var ride_service_2 = $('#ride_service_compare_2');
        var date = $('#compare_date');
        var date2 = $('#compare_date2');

        console.log('Scripts', ride_service_1.val(), ride_service_2.val(), date.val(),date2.val());

        $.ajax({
            url: '/compare_results',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ rideService1: ride_service_1.val(), rideService2: ride_service_2.val(), date: date.val(), date2: date2.val()}),
            success: function (response) {
                console.log(response);
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                var data;
                // response.forEach(portion => {
                //     data = {
                //         header: ["Name", "Number of Rides"],
                //         rows: [
                //               [portion.name1, portion.count1],
                //               [portion.name2, portion.count2]
                //               ]
                //     };
                // });
                anychart.onDocumentReady(function() {
 
                    // set the data
                    var data;
                    var Cname1;
                    var Cname2;
                    var Cmonth;
                    var Cmonth2;
                    response.forEach(portion => {
                      
                        
                        if (portion.month[6] == 7) {
                            Cmonth = "July";
                        }
                        else if (portion.month[6] == 8) {
                            Cmonth = "August";
                        }
                        else if (portion.month[6] == 9) {
                            Cmonth = "September";
                        }

                       if (portion.month2[6] == 7) {
                            Cmonth2 = "July";
                        }
                        else if (portion.month2[6] == 8) {
                            Cmonth2 = "August";
                        }
                        else if (portion.month2[6] == 9) {
                            Cmonth2 = "September";
                        }

                       
    
                        Cname1 = portion.name1;
                        Cname2 = portion.name2;
                        
                    data = {
                        header: ["Name", "Number of Rides"],
                        rows: [
                              ["1. " + portion.name1, portion.count1],
                              ["2. " + portion.name2, portion.count2]
                              ]
                    };
                });


                   
                    // create the chart
                    var chart = anychart.bar();
             
                    // add the data
                    chart.data(data);
             
                    // set the chart title
                    chart.title("Comparing " + Cname1 + " for the month of " + Cmonth + " & " + Cname2 + " for the month of " + Cmonth2 );
             
                    // draw
                    chart.container("container");
                    chart.draw();
                 });
            }
        });
    });


});

//--------------------------------------
// Functions below assure that the date
// and time are input properly on the
// website.
//--------------------------------------
//DateChange(document.getElementById('ride_service'))
function DateChange(ride_service) {
    if (ride_service.value == 'Uber') {
        var date_range = document.getElementById('date_begin');
        date_range.min = "2014-04-01";
        date_range.max = "2014-09-30";

        var date_range = document.getElementById('date_end');
        date_range.min = "2014-04-01";
        date_range.max = "2014-09-30";
        document.getElementById('date_begin').required = true;
        document.getElementById('date_end').required = true;
        document.getElementById('time_begin').required = true;
        document.getElementById('time_end').required = true;
        document.getElementById('source').required = false;
        document.getElementById('destination').required = false;
        document.getElementById('lyft_type').required = false;

        document.getElementById('address_search_text').style.display = "none";
        document.getElementById('not_lyft_rides_search').style.display = "block";
        document.getElementById('lyft_rides_search').style.display = "none";
    }
    else if (ride_service.value == 'Lyft') {
        document.getElementById('date_begin').required = false;
        document.getElementById('date_end').required = false;
        document.getElementById('time_begin').required = false;
        document.getElementById('time_end').required = false;
        document.getElementById('source').required = true;
        document.getElementById('destination').required = true;
        document.getElementById('lyft_type').required = true;

        document.getElementById('address_search_text').style.display = "none";
        document.getElementById('not_lyft_rides_search').style.display = "none";
        document.getElementById('lyft_rides_search').style.display = "block";
    }
    else {
        var date_range = document.getElementById('date_begin');
        date_range.min = "2014-07-01";
        date_range.max = "2014-09-30";

        if (date_range.value < date_range.min && date_range.value != 0) {
            date_range.value = date_range.min;
        }
        if (date_range.value > date_range.max && date_range.value != 0) {
            date_range.value = date_range.max;
        }

        var date_range = document.getElementById('date_end');
        date_range.min = "2014-07-01";
        date_range.max = "2014-09-30";
        
        if (date_range.value < date_range.min && date_range.value != 0) {
            date_range.value = date_range.min;
        }
        if (date_range.value > date_range.max && date_range.value != 0) {
            date_range.value = date_range.max;
        }
        document.getElementById('date_begin').required = true;
        document.getElementById('date_end').required = true;
        document.getElementById('time_begin').required = true;
        document.getElementById('time_end').required = true;
        document.getElementById('source').required = false;
        document.getElementById('destination').required = false;
        document.getElementById('lyft_type').required = false;

        document.getElementById('address_search_text').style.display = "block";
        document.getElementById('not_lyft_rides_search').style.display = "block";
        document.getElementById('lyft_rides_search').style.display = "none";
    }
}

function MonthChange(ride_service) {
    
    if (ride_service.value == 'Uber') {
        var date_range = document.getElementById('compare_date');
        date_range.min = "2014-04";
        date_range.max = "2014-09";


        
    }
    else{
        var date_range = document.getElementById('compare_date');
        date_range.min = "2014-07";
        date_range.max = "2014-09";

        if (date_range.value < date_range.min && date_range.value != 0) {
            date_range.value = date_range.min;
        }
        if (date_range.value > date_range.max && date_range.value != 0) {
            date_range.value = date_range.max;
        }
    }

}

function MonthChange2(ride_service) {
    
    if (ride_service.value == 'Uber') {
        var date_range = document.getElementById('compare_date2');
        date_range.min = "2014-04";
        date_range.max = "2014-09";

     

        
    }
    else{
        var date_range = document.getElementById('compare_date2');
        date_range.min = "2014-07";
        date_range.max = "2014-09";

        if (date_range.value < date_range.min && date_range.value != 0) {
            date_range.value = date_range.min;
        }
        if (date_range.value > date_range.max && date_range.value != 0) {
            date_range.value = date_range.max;
        }
    }

}

function BeginDateCheck(date_to_check) {
    var date_end = document.getElementById('date_end').value;
    if (date_to_check.value > date_end && date_end.length != 0) {
        date_to_check.value = date_end;
    }
}

function EndDateCheck(date_to_check) {
    var date_begin = document.getElementById('date_begin').value;
    if (date_to_check.value < date_begin && date_end.length != 0) {
        date_to_check.value = date_begin;
    }
}

function BeginTimeCheck(time_to_check) {
    var time_end = document.getElementById('time_end').value;
    if (time_to_check.value > time_end && time_end.length != 0) {
        time_to_check.value = time_end;
    }
}

function EndTimeCheck(time_to_check) {
    var time_begin = document.getElementById('time_begin').value;
    if (time_to_check.value < time_begin && time_end.length != 0) {
        time_to_check.value = time_begin;
    }
}

function ClearDiv() {
    document.getElementById("container").innerHTML = "";
}

function ShowSearch() {
    document.getElementById('container').style.display = "none";
    document.getElementById('Search').style.display = "block";
    document.getElementById('compare_based_on_month').style.display = "none";
    document.getElementById("container").innerHTML = "";
    var tbodyEl = $('tbody');
    
    tbodyEl.html('');

    tbodyEl.append('\
    <tr>\
        Search Reesults Will be Displayed Here\
    </tr>\
    ');
}

function ShowCompare() {
    document.getElementById('Search').style.display = "none";
    document.getElementById('compare_based_on_month').style.display = "block";
    document.getElementById("container").innerHTML = "";
    var tbodyEl = $('tbody');
    
    tbodyEl.html('');

    tbodyEl.append('\
    <tr>\
        Nothing is Displayed Here\
    </tr>\
    ');
}

function ClearBelowTable() {
    document.getElementById('Search').style.display = "none";
    document.getElementById('compare_based_on_month').style.display = "none";
    document.getElementById("container").innerHTML = "";
}