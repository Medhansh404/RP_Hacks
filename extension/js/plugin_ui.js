var colors = {
    "-1":"#58bc8a",
    "0":"#ffeb3c",
    "1":"#fd524f"
};
var featureList = document.getElementById("features");


chrome.tabs.query({ currentWindow: true, active: true }, function(tabs){
    chrome.storage.local.get(['results', 'legitimatePercents', 'isPhish'], function(items) {
        var result = items.results[tabs[0].id];
        var isPhish = items.isPhish[tabs[0].id];
        var legitimatePercent = items.legitimatePercents[tabs[0].id];
    
        for(var key in result){
            var newFeature = document.createElement("li");
            //console.log(key);
            newFeature.textContent = key;
            //newFeature.className = "rounded";
            newFeature.style.backgroundColor=colors[result[key]];
            featureList.appendChild(newFeature);
        }
        console.log(typeof legitimatePercent);
        if (legitimatePercent === undefined) {
            $("#site_score").text("Reload \u27f2").css({
                "font-size": "35px",
                "color" : "black"
            });
            $(".rounded-circle").css({"background":"yellow"});
        }        
        else
        {
            $("#site_score").text(parseInt(legitimatePercent)+"%");
        }
        
        if (isPhish) {
            const warningButton = document.createElement('button');
warningButton.id = 'warningButton';
warningButton.textContent = 'Report!';

// Add click event listener to the button
warningButton.addEventListener('click', function() {
    // Change the button text when clicked
    warningButton.textContent = "Successfully Reported!";
    // You can also add additional actions or styling changes here if needed
});

// Find the h2 element with id "site_msg"
const siteMsgElement = document.getElementById('site_msg');

// Insert the button right after the h2 element
siteMsgElement.insertAdjacentElement('afterend', warningButton);

// Apply CSS to center the button
warningButton.style.display = 'block';
warningButton.style.margin = 'auto';
warningButton.style.background = 'red';

            $("#res-circle").css("background", "red");
            $("#site_msg").text("Warning!! This website may be a Fraud");
            $("#site_score").text(parseInt(legitimatePercent) - 20 + "%");
        }
        
    });
    
});

