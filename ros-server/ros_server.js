function establish_connection(ip, callback, nb_try_reconnection){

    var ros = new ROSLIB.Ros({
        url : 'ws://'.concat(ip,':9090')
    });

    ros.on('connection', function() {
        console.log('Connected to websocket server.');
        // Subscribing to a Topic
        // ----------------------
        var listener = new ROSLIB.Topic({
            ros : ros,
            name : '/map_objects',
            messageType : 'map_manager/ListMapObjects'
        });

        listener.subscribe(function(message) {
            for(var obj in message.list_objects){
                callback(message.list_objects[obj]);
            }
        });
    });

    ros.on('error', function(error) {
        console.log('Error connecting to websocket server: ', error);
        //attempt_new_connection(ip, callback, nb_try_reconnection)
    });

    ros.on('close', function() {
        console.log('Connection to websocket server closed.');
        attempt_new_connection(ip, callback, nb_try_reconnection)
    });
}


function attempt_new_connection(ip, callback, nb_try_reconnection){
    if(nb_try_reconnection > 0) {
        console.log("Attempting to reconnect to server");
        var id_time_out = setTimeout(function() {
            establish_connection(ip, callback, nb_try_reconnection - 1);
        }, 5 * Math.pow(10, 3));

    } else {
        console.log("Failed to connect to server, stop trying");
    }
}