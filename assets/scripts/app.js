(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD8Plzj2Fi2bCEtjkgdY6ou5N0mNsik3eo",
        authDomain: "train-schedule-e4f87.firebaseapp.com",
        databaseURL: "https://train-schedule-e4f87.firebaseio.com",
        projectId: "train-schedule-e4f87",
        storageBucket: "train-schedule-e4f87.appspot.com",
        messagingSenderId: "1021633656861"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    
    var trainName = $('#train-name');
    var destination = $('#destination');
    var firstTrain = $('#first-train');
    var freq = $('#frequency');

    var trainTable = $('#train-table')

    
    var trainObject = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: freq
    }

    
    
    var trainsRef = database.ref('trains');
    var trainadd = trainsRef.push();

    //grabs values and adds train to firebase
    function addTrain(){
        $('#add-train').on('click', function(event){
             event.preventDefault();
             trainObject.name = trainName.val().trim();
             trainObject.destination = destination.val().trim();
             trainObject.firstTrain = firstTrain.val().trim();
             trainObject.frequency = freq.val().trim();
             //this adds the values to firebase
             trainadd.set(trainObject) 
             //clears the form after submit
             $('form').each(function(){
                 this.reset();
             });
        })
    }

    database.ref('trains').on('child_added', function(snap){
        var result = snap.val();
            trainTable.append(
                '<tr><td>'+result.name+'</td>'+
                '<td>'+result.destination+'</td>'+
                '<td>'+result.firstTrain+'</td>'+
                '<td>'+result.frequency+'</td></tr>'
            )
    })

    function main(){
        addTrain();
    }

    main();//main program run

    
}())//end of iffy