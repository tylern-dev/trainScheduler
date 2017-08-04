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
    var frequency = $('#frequency');

    var trainTable = $('#train-table')

    
    var trainObject = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
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
             trainObject.frequency = frequency.val().trim();
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
        var timeCalcObj = { 
            nextArrival: nextTrainTime(result.frequency, result.firstTrain),
            minAway: trainFreq(result.frequency,result.firstTrain)
         }   
            trainTable.append(
                '<tr>'+
                '<td>'+result.name+'</td>'+
                '<td>'+result.destination+'</td>'+
                '<td>'+result.frequency+'</td>'+
                '<td>'+timeCalcObj.nextArrival+'</td>'+
                '<td>'+timeCalcObj.minAway+'</td>'+
                '</tr>'
            )
    })

    function trainFreq(freq, fTime){
        var frequency = freq;
        var firstTime = fTime;
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1,"years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % freq;
        var tMinutesTillTrain = frequency-tRemainder;
        return tMinutesTillTrain;

    }

    function nextTrainTime(freq, fTime){
        var frequency = freq;
        var firstTime = fTime;
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1,"years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % freq;
        var tMinutesTillTrain = frequency-tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
        return nextTrain
    }

    function main(){
        addTrain();
    }

    main();//main program run

    
}())//end of iffy