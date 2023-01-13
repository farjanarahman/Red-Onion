const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const ObjectID = require("mongodb").ObjectId;
const res = require("express/lib/response");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zvmk2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.get("/", (req, res) => {
  res.send("hello form red onion server");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const orders = client.db(process.env.DB_NAME).collection("orders");
  const admins = client.db(process.env.DB_NAME).collection("admins");

  app.post("/placeOrder", (req, res) => {
    const order = req.body;

    orders
      .insertOne({ ...order })
      .then((result) => {
        if (result) {
          res.status(200).send(result.acknowledged);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });


  app.get("/userOrders/:email", (req, res) => {
        
        const email = req.params.email;
  
        orders.find({email})

        .toArray((err, documents) => {
            if(documents){
                res.status(200).send(documents)
            }
        })
  })

   // admin's operations

   app.get("/checkAdmin/:email", (req, res) => {
    const email = req.params.email;

   

    admins.find({ role: "admin", email }).toArray((err, documents) => {
      res.status(200).send(documents.length > 0);
    });
  });

  app.get("/orders", (req, res) => {
    orders.find({}).toArray((err, documents) => {
      if (documents) {
        res.status(200).send(documents);
      }else{
          console.log(err)
      }
    });
  });

  app.patch("/updatePaymentStatus/:id", (req, res) => {
    const { paid } = req.body;
    const id = req.params.id;

    orders
      .updateOne(
        { _id: ObjectID(id) },
        {
          $set: { paid },
        }
      )
      .then((result) => {
        res.status(200).send(result.modifiedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  app.patch("/updateDeliveryStatus/:id", (req, res) => {
    const { delivered } = req.body;
    const id = req.params.id;

    orders
      .updateOne(
        { _id: ObjectID(id) },
        {
          $set: { delivered },
        }
      )
      .then((result) => {
        res.status(200).send(result.modifiedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  app.patch("/updateClosedStatus/:id", (req, res) => {
    const { closed } = req.body;
    const id = req.params.id;

    orders
      .updateOne(
        { _id: ObjectID(id) },
        {
          $set: { closed },
        }
      )
      .then((result) => {
        res.status(200).send(result.modifiedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  app.delete("/deleteOrder/:id", (req, res) => {
    const id = req.params.id;

    orders.deleteOne({_id: ObjectID(id)})
    .then( result => {
      if(result){
        res.status(200).send(result.deletedCount > 0)
      }
    })
    .catch((err) => console.log(err));
  })

  console.log("Connected to mongo instance...");
});

app.listen(process.env.PORT || port, () => {
  console.log("Server connected successfully...");
});
