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

![App Toolbar](/images/application.PNG)

The user can adjust the speed the array sorts, the size of the array created, the hue range random values are picked from, and the saturation and lightness values using the slider inputs at the top of the screen. Once the user has adjusted the sliders to their desired settings, or at the end of a sort, they click "Generate New Array" to create an array with new random values based on the slider settings.

Once the user has created an array they want sorted, they can select bubble sort, merge sort, or quick sort, and the sort will automatically begin. The user can then watch the colored bars gradually reach their sorted location in the array. Each sort will create animations based on how the algorithm works. The colored bars will change heights if they are being compared, the pivot point, or location where a swap is happening.

# How the Application Works
When a new array is generated, it selects N random values in the hue range, where N is the number on the "Adjust Size" slider and the hue range is the range on the "Hue Range" slider. Once those values are selected, the bar colors are changed to correlate with the values in the array.

When a user selects a sort, the algorithm is called and is sorted as it normally would with a sort algorithm. However, while the array is being sorted, the function also pushes "animations" when a pivot point is selected, values are being compared (or no longer being compared), or a value swap happens. These animations allow the user to see a visualization of the sort by increasing the heights and swapping the colors of bars.

The actual sort is performed using the hue value of the color. When you typically think of a color spectrum, it is likely sorted (value-wise) by hue, which is why I chose to use HSL (hue, saturation, lightness) values as opposed to RGB or hex values for my calculations. Below, you can compare a full color spectrum with the one created by sorting the bars in my application by hue.

![Color Spectrum](/images/color-spectrum.PNG)
![Sorted Array](/images/sorted-array.PNG)
