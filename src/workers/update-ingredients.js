const dotenv            = require('dotenv');
const puppeteer = require('puppeteer');

const configureMongoose = require('../../build/config/mongoose');
const mongoose          = require('mongoose');
const async             = require('async');

const descriptionSeletor = '#ctl00_ContentPlaceHolder1_HeadingContainer';
const sizeSelector = '#ctl00_ContentPlaceHolder1_liSize';
const imageLinkSelector = '#product > div.owl-wrapper-outer > div > div > div > div > div > a > img'
const altImageLinkSelector = '#product > div.owl-wrapper-outer > div > div:nth-child(1) > div > div > div > a > img';
const priceSelector = '#ctl00_ContentPlaceHolder1_pPrice';

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const db = configureMongoose();
const Ingredient = mongoose.model('Ingredient');

function run() {
  let args = {};

  let seq = async.seq(
    initPage,
    getIngredients,
    processIngredients,
    finish
  )

  seq(args, (err) => {
    if (err) console.error(err);
    console.log("done");
    process.exit();  
  })
};

async function initPage(args, done) {
  console.log("init");
  args.browser = await puppeteer.launch({headless: true});
  args.page = await args.browser.newPage();
  return done(null, args);
}

function getIngredients(args, done) {
  Ingredient.find({external: false}, (err, ingredients) => {
    if (err) return done(err);
    args.ingredients = ingredients;
    return done(null, args);
  });
}

function processIngredients(args, done) {
  let {ingredients} = args;
  console.log("finding");
  async.each(ingredients, (ingredient, next) => {
    console.log("updating: ", ingredient);
    args.ingredient = ingredient
    update(args, next);
  }, done(err, args));
}

async function update(args, done) {
    console.log("up");
    let {page, ingredient} = args;
    await page.goto(ingredient.productLink)
    await page.waitForSelector(descriptionSeletor)

    let description = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, descriptionSeletor);
    description = description.trim();

    let itemSize = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, sizeSelector);
    itemSize = itemSize.trim();

    let imageURL = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('src').replace('/', '');
    }, imageLinkSelector);
    if (!imageURL) {
      imageURL = await page.evaluate((sel) => {
        return document.querySelector(sel).getAttribute('src').replace('/', '');
      }, altImageLinkSelector);  
    }
    imageURL = imageURL.trim();

    // external ID
    let itemId = ingredient.productLink.split("/")[4];

    let itemPrice = await this.page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, priceSelector);
    itemPrice = itemPrice.trim();

    ingredient.externalId = itemId;
    ingredient.description = description;
    ingredient.imageLink = imageURL;
    ingredient.size = itemSize;
    ingredient.price = itemPrice;

    console.log("saving: ", ingredient);
    Ingredient.findOneAndUpdate({ _id: ingredient._id }, ingredient, (err) => {
      return done(err, args);
    });
}

async function finish(args, done) {
  args.browser.close();
  return done(null, args);
}

run();