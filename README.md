# Color Sort
Color sort is an interactive visualization of bubble sort, quick sort, and merge sort based on a color's HSL (Hue, Saturation, Lightness) value. The inspiration for this project came from a combination of the "oddly satisfying" trend and [Clement Mihailescu](https://github.com/clementmihailescu).

The "oddly satisfying" trend, as described by the subreddit, is "for those little things that are inexplicably satisying". I figured watching array of random colors sort itself into a spectrum would be a perfect little thing to bring a bit of satisfaction to those using the application!

# Setup
The set up for this React application and running it locally were fairly simple. If you run the following commands in command line (and have the correct version of node), the necessary files are created and the application starts in localhost:3000.
```bash
npx create-react-app my-app
cd my-app
npm start
```

# How to Use the Application
When the application is open, it displays a random array of 100 items. Users can select the sort they want to see or change the settings for the array and generate a new one.

The user can adjust the speed the array sorts, the size of the array created, the hue range random values are picked from, and the saturation and lightness values using the slider inputs at the top of the screen. 
