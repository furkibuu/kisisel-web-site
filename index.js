const exp = require("express");
const app = new exp()
const bodyParser = require("body-parser")
const path = require("path")

//Port Kısmı fu-w
var port = "3000"

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(exp.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index'); 
  });

  app.get("/iletisim", (req, res) => {

res.render("iletisim")

  })

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { errorCode: 500 });
});

app.use((req, res, next) => {
  res.status(404).render('error', { errorCode: 404 });
});

  app.get('/discord', (req, res) => {
    res.render('discord');
  });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
  