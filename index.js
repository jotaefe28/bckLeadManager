const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const sliderRoutes = require("./routes/SliderRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const agendaRoutes = require("./routes/AgendaRoutes");
const serviceRoutes = require("./routes/ServiceRoutes");
const areaRoutes = require("./routes/AreaRoutes");
const postRoutes = require("./routes/PostRoutes");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// Middleware de seguridad
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // Configura cookie-parser

// Configuración de CORS
const allowedOrigins = ["http://localhost:5173"]; // Lista de orígenes permitidos
app.set('trust proxy', true);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Permitir envío de cookies en las solicitudes
  })
);

// Middleware para OPTIONS preflight requests
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Credentials", "true",
    "Access-Control-Allow-Origin", "*",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, csrf-token"
  );
  
  next();
});

// Rutas
app.use("/auth", authRoutes);
app.use("/slider",sliderRoutes)
app.use("/post",postRoutes)
app.use("/category",categoryRoutes)
app.use("/area",areaRoutes)
app.use("/service",serviceRoutes)
app.use("/agenda",agendaRoutes)
app.get("/", (req, res) => res.send("Express on Vercel!"));

// Inicia el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server ready on port 3001."));

module.exports = app;
