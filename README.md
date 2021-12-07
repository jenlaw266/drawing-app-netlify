![Draw](https://github.com/jenlaw266/drawing-app-netlify/blob/master/src/components/Nav/draw-logo.png)

## About

[**Draw**](https://draw-hackathon.netlify.app/)
is a simple drawing app built using the HTML canvas element.

**Features:**

- **Free-draw lines, straight lines, and rectangles:** essential tools to draw!

- **Colour picker and brush width:** adjust according to your needs!

- **Select, move, and fill:** essential tools to make changes!

- **Delete and clear:** delete a selected stroke, or clear the page!

- **Post and browse:** post and browse your art to the Gallery!

- **View, edit and delete:** view, edit, or delete your art indiviually!

_Note: Draw was built as a fulfillment to mintbean's hackathon requirement._

\_Created by: Jennifer Law ([**@jenlaw266**](https://github.com/jenlaw266))

## Final Product

#### Landing Page

![Home](https://github.com/jenlaw266/drawing-app-netlify/blob/master/Home1.png)
![Home](https://github.com/jenlaw266/drawing-app-netlify/blob/master/Home2.png)

#### Canvas

https://user-images.githubusercontent.com/86625518/143553595-d39358af-e312-453c-a92f-06bcb2b8d91d.mov

#### Gallery

https://user-images.githubusercontent.com/86625518/143553617-5e1d6f3a-accc-4fcc-a374-bec343d9e8ed.mov

## Getting Started

1. Clone these
   repository.

```
git clone https://github.com/jenlaw266/drawing-app-netlify.git
git clone https://github.com/jenlaw266/drawing-app-heroku.git
```

2. Navigate to the directory and install the dependencies.

```
cd drawing-app-netlify
npm install
cd drawing-app-heroku
npm install
```

3. Navigate to the drawing-app-heroku directory, set up a psql database, change the reset command accordingly in package.json and run the command

```
cd drawing-app-netlify
npm run reset
```

4. Open two terminal windows to launch the front-end and back-end

```
cd drawing-app-netlify
npm start
cd drawing-app-heroku
npm run go

```

5. Visit `http:localhost:3000/` to view the application.

## Dependencies

### Backend

- body-parser
- cors
- dotenv
- express
- nodemon
- pg

### Frontend

- axios
- bulma
- react
- react-router-dom
- font-awesome
- react-icons
