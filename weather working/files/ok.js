const wrapper = document.querySelector(".wrapper"),
inputpart = document.querySelector(".input-part"),
infotxt = inputpart.querySelector(".info-txt"),
inputfield = inputpart.querySelector("input") ,
locationbtn=inputpart.querySelector("button"),
arrow=wrapper.querySelector("header i") ,
we = wrapper.querySelector(".weather-part"),
weatherpart = wrapper.querySelector(".weather-part"),
icon = weatherpart.querySelector("img");
///
let api;
inputfield.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputfield.value != "")
    {
      requestapi(inputfield.value);
    }
});


arrow.addEventListener("click"  , ()=>{
  wrapper.classList.remove("active");
});



let hide='91b9e5b3c162c346a73a1578823665e2';
//

function onError(error)
{
  infotxt.innerText ="LOCATION DENIED";
    infotxt.classList.add("error");
}
locationbtn.addEventListener("click" , ()=>
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(onSuccess , onError);
  }
  else {
    alert("does not support");
  }
});




function onSuccess(position)
{
  const { latitude , longitude}=position.coords;
  api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${hide}`;
  fetchdata();
}

function requestapi(city)
{
   api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${hide}`;
//  fetch(api).then(response=>response.json()).then(result=>weatherdetails(result));
  fetchdata();
}
//


function fetchdata()
{
  infotxt.innerText="FETCHING DATA";
  for (let i = 1; i <=10000 ; i++ ){
  setTimeout(1000000);
  }
  infotxt.classList.add("pending");
  fetch(api).then(response=>response.json()).then(result=>weatherdetails(result)).catch(() =>{
    infotxt.innertext = "Something went wrong";
       infotxt.classList.replace("pending", "error");
    });
}




//
function weatherdetails(info)
{
  //infotxt.classList.replace("pending" , "error");
  if(info.cod=="404")
  {

    infotxt.classList.replace("pending", "error");
    infotxt.innerText=`${inputfield.value} is not a city name`;
  //  info-txt.innerText =`ok`;
//  console.log(`${inputfield.value} is not a city name`);
  }
  else
  {
    const city=info.name;
    const country=info.sys.country;
    const {description , id}=info.weather[0];
    const {feels_like , humidity , temp}=info.main;
    //console.log(city);

    if(id == 800){
       icon.src = "files/clear.svg";
   }else if(id >= 200 && id <= 232){
       icon.src = "files/storm.svg";
   }else if(id >= 600 && id <= 622){
       icon.src = "files/snow.svg";
   }else if(id >= 701 && id <= 781){
       icon.src = "files/haze.svg";
   }else if(id >= 801 && id <= 804){
       icon.src = "files/cloud.svg";
   }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
       icon.src = "files/rain.svg";
   }



    wrapper.querySelector(".temp .numb").innerText=Math.floor(temp);
    wrapper.querySelector(".weather").innerText=description;
    wrapper.querySelector(".location span").innerText=`${city} , ${country}`;
    wrapper.querySelector(".temp .numb-2").innerText=Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText=`${humidity}%`;




    infotxt.classList.remove("pending" , "error");
    infotxt.innerText = "";
    inputfield.value = "";
    wrapper.classList.add("active");
//    console.log(info);

  }
}




(function() {
           $('input').keyup(function() {
               this.value = this.value.toLocaleUpperCase();
           });
       });
