// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import postRoutes from "./routes/posts.js";
import express from "express";
import cors from "cors";
import mysql from "mysql";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscrbe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);
//////////////
// const commentsRouter = require("./routes/Comments");
// app.use("/comments", commentsRouter);
/////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/", express.static(path.join(__dirname, "/")));
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "pharmacy1",
});
const DIR = "./public/";
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, DIR);
  },
  filename: (req, file, callBack) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());
    callBack(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//////////////////////////// P R O D U C T S  //////////////////////////////////
app.get("/fetchProductsWithImages", (req, res) => {
  let sql =
    "SELECT products.id , products.title, products.price, products.summary , products.discount , products.categoryid , products.subcategoryid, Images.file_src FROM products   INNER JOIN Images ON products.id=Images.product_id";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      // db.findOne({
      //   where:{
      //     id:2,
      //     off:true
      //   }
      // })

      res.send({
        msg: err,
      });
    }
    if (result) {
      res.send(result);
    }
  });
});
app.get("/fetchProductsWithImages", (req, res) => {
  let sql =
    "SELECT products.id , products.title, products.price, products.summary , products.discount , products.categoryid , products.subcategoryid, Images.file_src FROM products   INNER JOIN Images ON products.id=Images.product_id";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      res.send({
        msg: err,
      });
    }
    if (result) {
      res.send(result);
    }
  });
});
app.post("/createProducts", (req, res) => {
  const subcategoryid = req.body.subcategoryid;
  const title = req.body.title;
  const summary = req.body.summary;
  const categoryid = req.body.categoryid;
  const discount = req.body.discount;
  const content = req.body.content;
  const shop = req.body.shop;
  const quantity = req.body.quantity;
  const startsAt = req.body.startsAt;
  const endsAt = req.body.endsAt;
  const price = req.body.price;
  const metaTitle = req.body.metaTitle;
  const createdAt = req.body.createdAt;
  db.query(
    "INSERT INTO products(title , price , summary , categoryid , discount , content , shop , quantity , startsAt , endsAt , metaTitle , createdAt , subcategoryid) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?  )",
    [
      title,
      price,
      summary,
      categoryid,
      discount,
      content,
      shop,
      quantity,
      startsAt,
      endsAt,
      metaTitle,
      createdAt,
      subcategoryid,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.put("/UpdateProduct/:id", (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  const summary = req.body.summary;
  const categoryid = req.body.categoryid;
  const discount = req.body.discount;
  const content = req.body.content;
  const quantity = req.body.quantity;
  const startsAt = req.body.startsAt;
  const endsAt = req.body.endsAt;
  const price = req.body.price;
  const metaTitle = req.body.meta;
  db.query(
    `UPDATE products SET title="${title}" , metaTitle="${metaTitle}" , content="${content}" , discount="${discount}" , categoryid="${categoryid}" , summary="${summary}" , quantity="${quantity}" , startsAt="${startsAt}" , endsAt="${endsAt}" , price="${price}" WHERE id=${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/DeleteProduct/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  // db.query("SELECT * FROM images WHERE product_id=?", id, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.send({
  //       msg: err,
  //     });
  //   }
  //   if (result) {
  //     console.log("this is the result from selecting the file src");
  //     console.log(result);
  //   }
  // });
});
app.get("/getProducts", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/getProductItem/:id", (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM products WHERE id=${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//////////////////////////// C A T E G O R I E S  //////////////////////////////////

app.post("/CreateNewCategory", (req, res) => {
  const title = req.body.title;
  const meta = req.body.metaTitle;
  const content = req.body.content;

  db.query(
    "INSERT INTO product_category(title , metaTitle , content  ) VALUES (? , ? , ? )",
    [title, meta, content],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values inserted");
      }
    }
  );
});

app.get("/getCategories", (req, res) => {
  db.query("SELECT * FROM product_category", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/DeleteCategory/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM product_category WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/UpdateCategory/:id", (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  const meta = req.body.metaTitle;
  const content = req.body.content;
  db.query(
    `UPDATE product_category SET title="${title}" , metaTitle="${meta}" , content="${content}" WHERE id=${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//////////////////////////// N E W S  //////////////////////////////////
app.post("/createNews", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const createdAt = req.body.createdAt;

  db.query(
    "INSERT INTO News(title  , description , created_at ) VALUES (? , ? , ? )",
    [title, description, createdAt],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/fetchNews", (req, res) => {
  db.query("SELECT * FROM News", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/uploadNewsImage", upload.single("file"), (req, res, next) => {
  const file = req.file.filename;
  const id = req.body.newsId;
  let sql = `UPDATE News SET image='${file}' WHERE NewsId=${id}`;
  db.query(sql, [file], function (err, result) {
    if (err) {
      console.log(err);
      res.send({
        msg: err,
      });
    }
    if (result) {
      res.send({
        data: result,
        msg: "your image has been put",
      });
      console.log("image was put in");
    }
  });
});
app.delete("/deleteNews/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM News WHERE NewsId=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/updateNews/:id", (req, res) => {
  const { id } = req.params;
  const title = req.body.title;
  const description = req.body.description;
  console.log(title);
  console.log(description);

  db.query(
    `UPDATE News SET title="${title}" ,  description="${description}"  WHERE NewsId=${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//////////////////////////// S U B C A T E G O R I E S  //////////////////////////////////
app.post("/createNewSubCategory", (req, res) => {
  const name = req.body.name;
  const category_id = req.body.category_id;

  db.query(
    "INSERT INTO sub_product_category(name , category_id   ) VALUES (? , ?  )",
    [name, category_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values inserted");
      }
    }
  );
});
app.get("/GetSubCategories", (req, res) => {
  db.query("SELECT * FROM sub_product_category", (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        msg: err,
      });
    }
    if (result) {
      res.send(result);
    }
  });
});

//////////////////////////// O F F E R S //////////////////////////////////
app.post("/createOffer", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const summary = req.body.summary;

  db.query(
    "INSERT INTO Offers(title  , description , summary ) VALUES (? , ? , ? )",
    [title, description, summary],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post(
  "/uploadOffersimage",
  upload.single("offers-image"),
  (req, res, next) => {
    const file = req.file.filename;
    const id = req.body.offersId;
    let sql = `UPDATE Offers SET image_src='${file}' WHERE id=${id}`;
    db.query(sql, [file], function (err, result) {
      if (err) {
        console.log(err);
        res.send({
          msg: err,
        });
      }
      if (result) {
        res.send({
          data: result,
          msg: "your image has been put",
        });
        console.log("image was put in");
      }
    });
  }
);
app.get("/getOffers", (req, res) => {
  db.query("SELECT * FROM Offers", (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        msg: err,
      });
    }
    if (result) {
      res.send(result);
    }
  });
});
app.post("/newOffersProducts", (req, res) => {
  const productIds = req.body.productIds;
  const offersId = req.body.offersId;

  for (var i = 0; i < productIds.length; i++) {
    db.query(
      "INSERT INTO Offers_Products(offers_id  , products_id) VALUES (? , ?)",
      [offersId, productIds[i]],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // res.send(result);
          console.log(result);
        }
      }
    );
  }
});
app.put(
  "/updateOffers/:id",
  upload.single("offers-image"),
  (req, res, next) => {
    const { id } = req.params;
    const file = req.file.filename;
    const prev_image = req.body.offers_prev_image;
    const title = req.body.offersTitle;
    const summary = req.body.offersSummary;
    const description = req.body.offersDescription;
    var filePath = `./public/${prev_image}`;
    fs.unlink(filePath, (err) => {
      if (err) console.log(err);
      else {
        console.log("Deleted");
      }
    });
    let sql = `UPDATE Offers SET image_src='${file}',title='${title}',description='${description}',summary='${summary}' WHERE id=${id}`;
    db.query(sql, [file], function (err, result) {
      if (err) {
        console.log(err);
        res.send({
          msg: err,
        });
      }
      if (result) {
        res.send({
          data: result,
          msg: "your image has been put",
        });
        console.log("image was put in");
      }
    });
  }
);
//////////////////////////// C O M M E N T S  //////////////////////////////////
app.get("/getComments/:id", (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM Comments WHERE product_id=${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        msg: err,
      });
    }
    if (result) {
      res.send(result);
    }
  });
});
app.post("/addComment", (req, res) => {
  const text = req.body.commentBody;
  const userId = req.body.userId;
  const productId = req.body.productId;
  const rating = req.body.rating;
  console.log(rating, "this is the ratng");
  db.query(
    "INSERT INTO Comments(text , user_id , product_id , rating) VALUES (? , ? , ? , ?)",
    [text, userId, productId, rating],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//////////////////////////// B R A N D S  //////////////////////////////////

app.get("/getBrands", (req, res) => {
  db.query("SELECT * FROM Brands", (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        msg: err,
      });
    }
    if (result) {
      res.send(result);
    }
  });
});
app.post("/CreateNewBrand", (req, res) => {
  const name = req.body.name;

  db.query("INSERT INTO Brands(name) VALUES (?)", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/updateBrand/:id", (req, res) => {
  const { id } = req.params;
  const name = req.body.name;
  db.query(
    `UPDATE Brands SET name="${name}"  WHERE id=${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//////////////////////////// C A R T  //////////////////////////////////

app.post("/createcart", (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const status = req.body.status;
  const quantity = req.body.quantity;

  db.query(
    "INSERT INTO News(userId  , productId , status , quantity ) VALUES (? , ? , ? , ? )",
    [userId, productId, status, quantity],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values inserted");
      }
    }
  );
});

//////////////////////////// U S E R S   //////////////////////////////////
app.post("/CreateNewUser", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "INSERT INTO users(firstname  , lastname , email , mobile , password , address ) VALUES (? , ? , ? , ? , ? , ?  )",
        [firstName, lastName, email, mobile, hash, address],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("values inserted");
          }
        }
      );
    }
  });
});
app.post("/loginCheck", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      res.send({ error: "No Users found" });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result;
          res.send(result);
        } else {
          res.send({ message: "wrong user and pass combination" });
        }
      });
    }
  });
});
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedin: true, user: req.session.user });
  } else {
    res.send({ loggedin: false });
  }
});

//////////////////////////// I M A G E S  //////////////////////////////////
app.post("/uploadImages", upload.array("imgCollection"), (req, res, next) => {
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");
  let sql = "INSERT INTO  Images (file_src , product_id) VALUES (? , ? )";
  const productItemId = req.body.productItemId;
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + "/public/" + req.files[i].filename);
    console.log("this is the request");
    console.log(req.body.productItemId);

    db.query(sql, [reqFiles[i], productItemId], (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          msg: err,
        });
      }
      if (result) {
        res.send({
          data: result,
          msg: "your image has been updated",
        });
      }
    });
  }
});
app.get("/getImage", (req, res) => {
  db.query("SELECT * FROM images", (err, result) => {
    if (err) {
      console.log(err);

      res.send({
        msg: err,
      });
    }
    if (result) {
      res.send(result);
    }
  });
});
app.get("/getImages", (req, res) => {
  db.query("SELECT * FROM images", (err, result) => {
    if (err) {
      console.log(err);

      res.send({
        msg: err,
      });
    }
    if (result) {
      res.send(result);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server running on port : ${PORT}`));
// app.post("/upload", upload.single("file"), (req, res, next) => {
//   let sql = "INSERT INTO  images (file_src) VALUES (?)";

//   db.query(sql, [req.file.filename], function (err, result) {
//     if (err) {
//       console.log(err);
//       res.send({
//         msg: err,
//       });
//     }
//     if (result) {
//       res.send({
//         data: result,
//         msg: "your image has been updated",
//       });
//     }
//   });
//   console.log("this is request files");
//   console.log(req.file.filename);
// });

///////////////////////////// SUB CATEGORY ////////////////////////////

// app.use("/posts", postRoutes);
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// const CONNECTION_URL =
//   "mongodb+srv://kasra993:kasranakisa2013@cluster1.ka6sn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// mongoose
//   .connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() =>
