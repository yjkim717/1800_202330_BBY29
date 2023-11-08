
//Hard Code restaurant database for now
function loadRestaurants() {
    var res = db.collection("restaurants");
    
    res.add({
        code: 1112,
        name: "Bona Fide BBQ",
        cluster: "Burnaby",
        address: {
            long: -123.000774189556,
            lat: 49.26762838254427
        },
        waitlist: []
    });
    res.add({
        code: 1113,
        name: "JINYA Ramen Bar",
        cluster: "Burnaby",
        address: {
            long:-123.00452172855591,
            lat: 49.27602736978521
        },
        waitlist: []
    });
    res.add({
        code: 1114,
        name: "Ajishou Brentwood Japanese Restaurant",
        cluster: "Burnaby",
        address: {
            long: -123.00104147842774,
            lat: 49.26707408924106
        },
        waitlist: []
    });
    res.add({
        code: 1115,
        name: "Neptune Palace Seafood Restaurant",
        cluster: "Burnaby",
        address: {
            long: -123.11651717235901,
            lat: 49.21021618753179
        },
        waitlist: []
    });
    res.add({
        code: 1116,
        name: "Steve's Poke Bar",
        cluster: "Burnaby",
        address: {
            long: -123.0005630872287,
            lat: 49.230655901247076
        },
        waitlist: []
    });
}