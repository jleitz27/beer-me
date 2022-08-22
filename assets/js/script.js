var requestUrl = "https://api.openbrewerydb.org/breweries?by_city=";

// console.log(apiURL);

var cities = [];
var breweryContainer = document.getElementById('brewery');
var fetchButton = document.getElementById('fetch-button');
var userFormEl = document.querySelector("#zipcode-form");
var cityInputEl = document.querySelector("#city");
var modalContainer = document.getElementById("modal");
var modalContent = document.getElementById("modal-content");
var breweryMain = document.getElementById("brewery-main");
var mapContainer = document.getElementById("map");


var getBrewery = function(city) {
  // format the github api url
  var apiUrl = requestUrl + city;

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          getApi(data, city);
        });
      } else {
        modalContainer.classList = ("modal is-active");
    //createModal();//("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      modalContainer.classList = ("modal is-active");
    //createModal();//("Unable to connect");
    });
};


var getApi =function(data) {
  
  if (data.length === 0) {
    
    $("#launchModal").click(function() {
 
      $(".modal").addClass("is-active"); 
    });

    $(".modal-close").click(function() {
      $(".modal").removeClass("is-active");
    });
    return;
  }
      
      for (var i=0; i< data.length; i++){
        //image for div
        var brewImage = document.createElement("img");
        
        //brewery name div
        var breweryName = document.createElement("div");
        breweryName.classList = "flex2 card-content is-align-content-space-around m-2"

        //brewery address
        // var breweryAddress = document.createElement("a");
        // breweryAddress.classList = "card-content";

        var breweryAddress = document.createElement("p");
        var street = data[i].street || "";
        var city = data[i].city || "";
        var state = data[i].state || "";
        var zip = data[i].postal_code || "";
        breweryAddress.innerHTML = `${street}<br/>${city}, ${state} ${zip}`;
        breweryAddress.classList=("m-2");

        //brewery url
        if(data[i].website_url !=null){
        var breweryUrl = document.createElement("a");
        breweryUrl.setAttribute("href", data[i].website_url);
        breweryUrl.setAttribute("class", "card-link m-2");
        breweryUrl.setAttribute("target", "_blank");
        breweryUrl.setAttribute("rel", "noopener noreferrer");
        breweryUrl.textContent = "Website";
       // breweryUrl.classList = "card-content card-shadow link"
        }

        brewImage.classList =("card-header");
        brewImage.setAttribute("src", "./assets/Images/BeerMe.png")

        var long = document.createElement("p");
        long.textContent = data[i].longitude;
        long.classList = ("is-hidden");

        var lat = document.createElement("p");
        lat.textContent=data[i].latitude;
        lat.classList = ("is-hidden");
        
        //breweryAddress.textContent = data[i].street;
        breweryName.textContent= data[i].name;
        //breweryUrl.textContent = data[i].website_url;

        breweryContainer.append(brewImage);
        breweryContainer.append(breweryName);
        breweryName.append(breweryAddress);
        breweryName.append(breweryUrl);
        //breweryAddress.append(lat, lon);
        //console.log(lat, long);
        


        // get map to show up
        //if(data[i].longitude !=null) {
        var map = `https://www.google.com/maps/search/?api=1&query=${
          data[i].name
        } ${data[i].state}`;  
        var encoded = encodeURI(map);
        var mapLink = document.createElement("a");
        mapLink.setAttribute("href", encoded);
        mapLink.setAttribute("class", "card-link m-2");
        mapLink.setAttribute("target", "_blank");
        mapLink.setAttribute("rel", "noopener noreferrer");
        mapLink.textContent = "Map";
        breweryName.appendChild(mapLink);
        
      //}
      }

      $('#brewery').ready(function(){
        // Get each div
        $('.link').each(function(){
            // Get the content
            var str = $(this).html();
            // Set the regex string
            var regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig
            // Replace plain text links by hyperlinks
            var replaced_text = str.replace(regex, "<a href='$1' target='_blank'>$1</a>");
            // Echo link
            $(this).html(replaced_text);
        });
      });
  
};

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityName = cityInputEl.value.trim();

  if (!isNaN(cityName)) {

    modalContainer.classList = ("modal is-active");
    return;
    
  } else {
    getBrewery(cityName);
    //getApi(zipcode);
    cities.unshift({cityName});

    // clear old content
    cityInputEl.value = "";
    breweryContainer.textContent = "";
    //createModal();
  }
}

// var createModal =function(){
//   var modalOpen = document.createElement("div");
//   modalOpen.classList = ("has-background-white modal-content box");
//   modalContainer.append(modalOpen);
//   modalOpen.textContent = test;
// };


$(".modal-close").click(function() {
  $("html").removeClass("is-clipped");
  $(this).parent().removeClass("is-active");
});

userFormEl.addEventListener("submit", formSubmitHandler);
//fetchButton.addEventListener('click', getApi);
//test
