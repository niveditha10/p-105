Webcam.set({
    width:350,
    height:350,
    image_format:'png',
    png_quality:100
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="image_captured" style="width:350px;height:250px;" src="'+data_uri+'">';    });
}

console.log("ml5.version",ml5.version);
classifier =ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6KhMB2mQa/model.json',modelLoaded);
function modelLoaded(){
    console.log("model is loaded");
}
function identify(){
    img=document.getElementById('image_captured');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("span_object").innerHTML=results[0].label;
        document.getElementById("span_accuracy").innerHTML=results[0].confidence.toFixed(4); 
    }
}