Bloody_Mary_song="";
Harry_potter_theme_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
song_name = "";

function setup()
{
    canvas = createCanvas(600, 530);
    canvas.center();
    canvas.position(300, 225);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Intialized and Loaded!!");
}

function preload()
{
    Bloody_Mary_song = loadSound("Bloody_Mary_Song.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw()
{
    image(video,0,0,600,530);

    fill("#FF8A65");
    stroke("#BF360C");

    song_name = Bloody_Mary_song.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Harry_potter_theme_song.stop();
        if(song_name == false){
           Bloody_Mary_song.play();
        }
        else{
            console.log("Song Name: Bloody Mary Song");
            document.getElementById("song_id").innerHTML = "Song Name: Bloody Mary Song";
        }
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}