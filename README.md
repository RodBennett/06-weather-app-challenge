# Challenge 6: Weather App Challenge

[Deployment Link](https://rodbennett.github.io/06-weather-app-challenge/)


In this assignment, I created a weather app to search for 5-days forecasts.

When the user loads the page, they come to an input field to search for the weather in any city.
<img width="1044" alt="Screen Shot 2022-08-02 at 10 16 01 PM" src="https://user-images.githubusercontent.com/106923428/182525552-f25c7a71-2b29-4001-b920-c50b8faef860.png">

The top part of the page shows the current weather conditions of the searched cities, while the bottom part of the page shows the 5-day forecasts in different cards.   
<img width="1279" alt="Screen Shot 2022-08-02 at 10 41 52 PM" src="https://user-images.githubusercontent.com/106923428/182525744-1589570c-a2b8-41af-ac37-9439747246f1.png">

A button appears in the column "Searched Cities."  The buttons are saved and accumulate as new cities are searched.  When the user clicks on those buttons, they can return to the weather forecasts of those cities.

<img width="231" alt="Screen Shot 2022-08-02 at 10 17 07 PM" src="https://user-images.githubusercontent.com/106923428/182524992-e1a2fdff-d98b-4fc5-b523-023a3d1dbe48.png">

At the bottom of the page is a "Clear Search Items" button that deletes all previous searches from local storage.
<img width="1277" alt="Screen Shot 2022-08-02 at 10 16 43 PM" src="https://user-images.githubusercontent.com/106923428/182524961-aaae47d0-574b-4e8d-b389-b4d6d8119ec4.png">


## What I Learned

This was definitely a challenging assignment, especially getting the local storage set for each new button as it was generated through javascript, but my understanding of the language has been greatly enhanced as a result of doing it. There were many new things we learned in class that were employed in this assignment, but the big takewaway for me was how powerful and easy it is to create elements and manipulate HTML documents through JS. 

## Challenges

After my first submission, it was brought to my attention that one of the API links in the JS code was lacking as 's' - in other words, it was being deployed through 'http' and not https.  However, after I fixed it and pushed it back to GitHub, the deployment continued to function as though it was http.  Even though the JS code on GitHub refelcted the changes, the same error about http kept showing up in the console log.  I consulted a few people about this and nobody could figure out why this was the case.  At the end of the day I had to create a whole new repo on GitHub for the https change to work, and now the app works in its full functionality.

## Future Development

There is still one acceptance criteria that is not finished, which is that the UV Index does not change colors with high or low UV indeces. This is something I plan to return to later in the course.
