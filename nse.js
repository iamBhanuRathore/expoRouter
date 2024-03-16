const { DataTypes } = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "mysql",
  host: "localhost",
});

const Records = sequelize.define("Records", {
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  underlyingValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  strikePrices: {
    type: DataTypes.ARRAY(DataTypes.FLOAT), // Assuming strike prices can be an array of floats
    allowNull: false,
  },
});

const Options = sequelize.define("Options", {
  strikePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("CE", "PE"), // Call or Put option
    allowNull: false,
  },
  underlying: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identifier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  openInterest: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  changeinOpenInterest: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pchangeinOpenInterest: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalTradedVolume: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  impliedVolatility: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lastPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  change: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pChange: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalBuyQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalSellQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bidQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bidprice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  askQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  askPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  underlyingValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Records.hasMany(Options); // Assuming one-to-many relationship between Records and Options
Options.belongsTo(Records);

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

module.exports = { Records, Options };

const data = {
  records: {
    expiryDates: [
      "19-Mar-2024",
      "26-Mar-2024",
      "02-Apr-2024",
      "09-Apr-2024",
      "16-Apr-2024",
      "30-Apr-2024",
      "28-May-2024",
    ],
    data: [
      {
        strikePrice: 17000,
        expiryDate: "26-Mar-2024",
        CE: {
          strikePrice: 17000,
          expiryDate: "26-Mar-2024",
          underlying: "FINNIFTY",
          identifier: "OPTIDXFINNIFTY26-03-2024CE17000.00",
          openInterest: 2,
          changeinOpenInterest: 0,
          pchangeinOpenInterest: 0,
          totalTradedVolume: 0,
          impliedVolatility: 0,
          lastPrice: 3650,
          change: 0,
          pChange: 0,
          totalBuyQuantity: 2000,
          totalSellQuantity: 2000,
          bidQty: 400,
          bidprice: 3362.25,
          askQty: 400,
          askPrice: 3899.4,
          underlyingValue: 20644.3,
        },
      },
      {
        strikePrice: 17000,
        expiryDate: "30-Apr-2024",
        PE: {
          strikePrice: 17000,
          expiryDate: "30-Apr-2024",
          underlying: "FINNIFTY",
          identifier: "OPTIDXFINNIFTY30-04-2024PE17000.00",
          openInterest: 0,
          changeinOpenInterest: 0,
          pchangeinOpenInterest: 0,
          totalTradedVolume: 0,
          impliedVolatility: 0,
          lastPrice: 0,
          change: 0,
          pChange: 0,
          totalBuyQuantity: 12600,
          totalSellQuantity: 0,
          bidQty: 12600,
          bidprice: 0.05,
          askQty: 0,
          askPrice: 0,
          underlyingValue: 20644.3,
        },
      },
      {
        strikePrice: 17500,
        expiryDate: "26-Mar-2024",
        CE: {
          strikePrice: 17500,
          expiryDate: "26-Mar-2024",
          underlying: "FINNIFTY",
          identifier: "OPTIDXFINNIFTY26-03-2024CE17500.00",
          openInterest: 0,
          changeinOpenInterest: 0,
          pchangeinOpenInterest: 0,
          totalTradedVolume: 0,
          impliedVolatility: 0,
          lastPrice: 0,
          change: 0,
          pChange: 0,
          totalBuyQuantity: 2000,
          totalSellQuantity: 2000,
          bidQty: 400,
          bidprice: 2876,
          askQty: 400,
          askPrice: 3346.8,
          underlyingValue: 20644.3,
        },
      },
      {
        strikePrice: 17500,
        expiryDate: "30-Apr-2024",
        PE: {
          strikePrice: 17500,
          expiryDate: "30-Apr-2024",
          underlying: "FINNIFTY",
          identifier: "OPTIDXFINNIFTY30-04-2024PE17500.00",
          openInterest: 0,
          changeinOpenInterest: 0,
          pchangeinOpenInterest: 0,
          totalTradedVolume: 0,
          impliedVolatility: 0,
          lastPrice: 0,
          change: 0,
          pChange: 0,
          totalBuyQuantity: 440,
          totalSellQuantity: 0,
          bidQty: 440,
          bidprice: 0.2,
          askQty: 0,
          askPrice: 0,
          underlyingValue: 20644.3,
        },
      },
    ],
    timestamp: "15-Mar-2024 15:30:00",
    underlyingValue: 20644.3,
    strikePrices: [17000, 17500],
  },
};
