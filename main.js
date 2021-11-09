Webcam.set({
    width: 350,
    height:300,
    image_format:'png',
    png_quality:90,

});

prediction_1='';
prediction_2='';

camera = document.getElementById('camera');

Webcam.attach('#camera')

function take_snapshot(){

    Webcam.snap(function(data_uri){

        document.getElementById('result').innerHTML= '<img id="capture_image" src='+data_uri+'/>';

    });
}

console.log('ml5 version',ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/01yS9tUYK/model.json',modelLoaded);

function modelLoaded(){

    console.log('Model Loaded');

}

function speak(){

    var synth= window.speechSynthesis;
    speak_data_1= 'My first prediction is'+prediction_1;
    speak_data_2= 'My second prediction is'+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(prediction_1+prediciton_2);
    synth.speak(utterThis);
}

function check(){

    img =  document.getElementById('capture_image');
    classifier.classify(img,gotResult);

}

function gotResult(error,results){

if(error){
    console.error(error);
}
else {

    console.log(results);
   document.getElementById('result_emotion_name1').innerHTML= results[0].label;
   document.getElementById('result_emotion_name2').innerHTML= results[1].label;
   prediction_1=results[0];
   prediction_2=results[1];

   if(results[0].label == 'Best'){

    document.getElementById('update_emoji1').innerHTML='&#128077;';

   }

   if(results[0].label == 'Victory'){

    document.getElementById('update_emoji1').innerHTML='&#9996;';

   }

   if(results[0].label == 'Amazing'){

    document.getElementById('update_emoji1').innerHTML='&#128076;';

   }

   if(results[1].label == 'Best'){

    document.getElementById('update_emoji2').innerHTML='&#9994;';

   }

   if(results[1].label == 'Victory'){

    document.getElementById('update_emoji2').innerHTML="&#129304;";

   }

   if(results[1].label == 'Amazing'){

    document.getElementById('update_emoji2').innerHTML='&#128079;';

   }
}
}