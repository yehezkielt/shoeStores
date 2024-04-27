const { Op } = require("sequelize");
const { Shoes, Category, User } = require("../models");
const midtransClient = require("midtrans-client");
const ImageKit = require("imagekit");

let imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

class ShoesController {
  // PUBLIC SITE
  static async pub_findAll(req, res, next) {
    try {
      let { q } = req.query;
      let option = {
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        where: {},
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };
      if (q) option.where.title = { [Op.iLike]: `%${q}%` };
      const data_shoes = await Shoes.findAll(option);
      res.status(200).json(data_shoes);
    } catch (error) {
      next(error);
    }
  }
  // NEED AUTHENTICATION FITUR
  static async findAll(req, res, next) {
    try {
      let { q } = req.query;
      let option = {
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        where: {},
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };
      if (q) option.where.title = { [Op.iLike]: `%${q}%` };
      const data_shoes = await Shoes.findAll(option);
      res.status(200).json(data_shoes);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const data_shoes = await Shoes.findByPk(id);
      if (!data_shoes) throw { name: "id_not_found" };

      res.status(200).json(data_shoes);
    } catch (error) {
      next(error);
    }
  }
  static async add(req, res, next) {
    try {
      req.body.UserId = req.user.id;
      let { file } = req;
      if (!file) throw { name: "file_empty" };
      let base64Img = file.buffer.toString("base64"); // format base64
      let imageUrl = `data:${file.mimetype};base64,${base64Img}`; // format Data URL

      const upload = await imagekit.upload({
        file: imageUrl, //required
        fileName: "my_file_name.jpg", //required
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      });
      req.body.image = upload.url;
      await Shoes.create(req.body);
      res
        .status(201)
        .json({ message: `Success added ${req.body.title}'s shoes` });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const dataShoes = await Shoes.findByPk(id);
      if (!dataShoes) throw { name: "id_not_found" };

      let { file } = req;
      if (!file) throw { name: "file_empty" };
      let base64Img = file.buffer.toString("base64"); // format base64
      let imageUrl = `data:${file.mimetype};base64,${base64Img}`; // format Data URL

      const upload = await imagekit.upload({
        file: imageUrl, //required
        fileName: "my_file_name.jpg", //required
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      });
      req.body.image = upload.url;
      await dataShoes.update(req.body, { where: { id } });
      res
        .status(200)
        .json({ message: `Success updated ${req.body.title}'s shoes` });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const dataShoes = await Shoes.findByPk(id);
      if (!dataShoes) throw { name: "id_not_found" };

      await dataShoes.destroy({ where: { id } });
      res.status(200).json({ message: `${dataShoes.title}, has been deleted` });
    } catch (error) {
      next(error);
    }
  }
  static async MidtransToken(req, res, next) {
    try {
        console.log("----");
    //   const user = await User.findByPk(req.user.id);
    //   if (!user) throw { name: "id_not_found" };
    //   console.log(user);

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.SERVER_KEY,
      });
      console.log("---------");

      let parameter = {
        transaction_details: {
          order_id: "YOUR-ORDERID-" + Math.random() * 100,
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      console.log(midtransToken);
      res.status(201).json( midtransToken );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ShoesController;
