

This is a small React application that has only two components. It has a map and an input field representing geocodes. The map and the geocode are very closely connected and the user can search for new addresses using the external api of react-mapbox-gl.

Possible ways to search for an address:
1. The user can use the drag and drop method to drag a pin on the map to a certain place, where the address field will automatically change and be filled.
2. The user can search for addresses by entering a string in the *Address* field. For each iteration (each new string entered), the user will be suggested 5 addresses that most closely match the currently entered string. For the selected address, the map will move to that address


- npm clean install; // package-lock.json contain all required libraries;
- npm start;


![gggg](https://user-images.githubusercontent.com/57072437/178556525-974bf8e2-0a6e-416e-b514-c2db1c2a7ce0.png)
![gggg2](https://user-images.githubusercontent.com/57072437/178556530-6c653871-8089-41de-b2d6-1454f14cc9c8.png)
