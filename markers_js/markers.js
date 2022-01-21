
var car_marker = L.icon({
    iconUrl: 'img/markers/vehicle_bmw.png',
    iconSize:   [30, 30],
    iconAnchor: [15, 15],
});

var EgoCarIcon = L.icon({
    iconUrl: 'img/markers/Pointer-Blue.svg',
    shadowUrl: 'img/markers/Ego-Car-Middle-Opaque-White.svg',
    iconSize:     [40, 40], // size of the icon
    shadowSize:   [40, 40],
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [20, 20],
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

var EgoMotorcycleIcon = L.icon({
    iconUrl: 'img/markers/Pointer-Blue.svg',
    shadowUrl: 'img/markers/Ego-Motorcycle-Middle-Opaque-White.png',
    iconSize:     [40, 40], // size of the icon
    shadowSize:   [40, 40],
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [20, 20],
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

var PedestrianIcon = L.icon({
    iconUrl: 'img/markers/Ring-Pedestrian-Opaque-White.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

var BicycleIcon = L.icon({
    iconUrl: 'img/markers/Bicycle-Icon.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

var CarIcon = L.icon({
    iconUrl: 'img/markers/Car-Icon.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

var TruckIcon = L.icon({
    iconUrl: 'img/markers/Truck-Icon.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

var MotorcycleIcon = L.icon({
    iconUrl: 'img/markers/Motorcycle-Icon.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});


function create_timeout(object_dict, object, marker){

    var id_time_out = setTimeout(function() {
        marker.remove();
        delete object_dict[object.id]
    }, object.expiration_time * Math.pow(10, 3));

    return id_time_out;
}


function get_marker_design(object){

    switch (object.type) {
        case "PEDESTRIAN": //"VEHICLE", "TRUCK", "MOTORCYCLE", "PEDESTRIAN", "CYCLIST", "UNKNOWN"
            return {icon: PedestrianIcon};
        case "VEHICLE":
            if(need_heading(object)){
                return {icon: EgoCarIcon, rotationOrigin: '20px 13.3px', rotationAngle: 180.0 + object.heading.value / 10.0};
            }
            return CarIcon;
        case "TRUCK":
            if(need_heading(object)){
                return {icon: EgoCarIcon, rotationOrigin: '20px 13.3px', rotationAngle: 180.0 + object.heading.value / 10.0};
            }
            return {icon: TruckIcon};
        case "MOTORCYCLE":
            if(need_heading(object)){
                return {icon: EgoMotorcycleIcon, rotationOrigin: '20px 13.3px', rotationAngle: 180.0 + object.heading.value / 10.0};
            }
            return {icon: MotorcycleIcon};
        case "CYCLIST":
            return {icon: BicycleIcon};
        case "UNKNOWN":
            return {icon: CarIcon};
        default:
            return {icon: CarIcon};
    }
}

function need_heading(object){
    return (object.source === "GPS" || object.source === "CAM" || object.source === "CPM-S"); //Change to CAM when marker is appropriated
}

function create_popup(object){
    var string = 'Type: ' + object.type;
    string = string + '<br>Source: ' + object.source;
    string = string + '<br>Source Id: ' + object.source_id;
    string = string + '<br>Expiration time: ' + object.expiration_time + 's';
    //string = string + '<img src="img/HMI/AEVW5_320_180.png" alt="Test">';

    return string;
}