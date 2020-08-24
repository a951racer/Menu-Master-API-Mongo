const dotenv            = require('dotenv');
const configureMongoose = require('../../build/config/mongoose');
const mongoose          = require('mongoose');
const async             = require('async');

const puppeteer = require('puppeteer');

const baseURL = 'https://www.hy-vee.com';
const frequentListURL = baseURL + '/grocery/my-account/lists/frequent-purchases.aspx?pages=';
const usernameInput = '#username';
const passwordInput = '#password';
const loginButtonSelector = '#__next > main > section > section > form > button';
const itemsDisplayedSelector = "#ctl00_ContentPlaceHolder1_itemsDisplayed";
const totalItemsSelector = "#ctl00_ContentPlaceHolder1_totalItems";

const itemSelectorPre = '#ctl00_ContentPlaceHolder1_uclProductList_rptProducts_ctl';
const itemURLSelectorPost = '_liText > p.li-head > a';
const itemImageSelectorPost = '_liProduct > div.li-img.bonds > div > div.content > a > img';
const itemSizeSelectorPost = '_pProductSize';
const itemPriceSelectorPost = '_pPrice';

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const db = configureMongoose();
const Ingredient = mongoose.model('Ingredient');

(async () => {

  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  //await page.goto(startPage);
  await page.goto(frequentListURL + "1");
  await page.waitForSelector(loginButtonSelector);
  const login = await page.$(loginButtonSelector);

  if (login) {
    console.log("need to log in");
    await page.click(usernameInput);
    await page.keyboard.type(process.env.EXTERNAL_USERNAME);
    await page.click(passwordInput);
    await page.keyboard.type(process.env.EXTERNAL_PASSWORD);
    await page.click(loginButtonSelector);
  } else {
    console.log("already logged in");
  }

  await page.waitFor(6000);
  let totalItems = await page.evaluate((sel) => {
    let element = document.querySelector(sel);
    return element ? element.innerHTML : null;
  }, totalItemsSelector);

  while (!totalItems) {
    await page.goto(frequentListURL + "1");
    await page.waitFor(6000);
    totalItems = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, totalItemsSelector);
  }

  totalItems = parseInt(totalItems);

  let itemsDisplayed = await page.evaluate((sel) => {
    let element = document.querySelector(sel);
    return element ? element.innerHTML : null;
  }, itemsDisplayedSelector);
  itemsDisplayed = parseInt(itemsDisplayed);

  
  let pages = parseInt((totalItems / itemsDisplayed) + 1);
  await page.goto(frequentListURL + pages);
  await page.waitFor(10000);

  let items = []
  for (let x = 0; x < (totalItems - 1); x++) {
    let counter = x;
    if (x < 10) {
      counter = ('0' + x).toString();
    } else {
      counter = x.toString();
    }

    // description
    let description = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, itemSelectorPre + counter + itemURLSelectorPost);
    
    // URL
    let url = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('href').replace('/', '');
    }, itemSelectorPre + counter + itemURLSelectorPost);
    url = baseURL + "/" + url;

    // ID
    let itemId = url.split("/")[4];

    // Image URL
    let imageURL = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('src').replace('/', '');
    }, itemSelectorPre + counter + itemImageSelectorPost);
    imageURL = imageURL.replace("thumb", "large");

    // Size
    let itemSize = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, itemSelectorPre + counter + itemSizeSelectorPost);
    itemSize = itemSize.trim();

    // Price
    let itemPrice = await page.evaluate((sel) => {
      let element = document.querySelector(sel);
      return element ? element.innerHTML : null;
    }, itemSelectorPre + counter + itemPriceSelectorPost);
    itemPrice = itemPrice.trim();

    items.push({
      externalId: itemId,
      description: description,
      productLink: url,
      imageLink: imageURL,
      size: itemSize,
      price: itemPrice
    });
  }

  async.each(items, (item, next) => {
    let {externalId, description, productLink, imageLink, size, price, } = item;
    Ingredient.findOne({externalId: externalId}, (err, ingredient) => {
      if (err) {
          console.log(err);
          next(err);
      }
      if (ingredient) {
        ingredient.productLink = productLink;
        ingredient.description = description;
        ingredient.imageLink = imageLink;
        ingredient.size = size;
        ingredient.price = price;
        ingredient.external = true;
        Ingredient.findByIdAndUpdate(ingredient._id, ingredient, (err, ingredient) => {
          if (err) console.log(err);
          next(err);
        });
      } else {
        newIngredient = new Ingredient({
          name: description,
          description: description,
          productLink: productLink,
          imageLink: imageLink,
          size: size,
          price: price,
          new: true,
          external: true,
          externalId: externalId
        })
        newIngredient.save((err, ingredient) => {
          if (err) console.log(err);
          next(err);
        });
      }
    });
  }
  , (err) => {
    browser.close();
    process.exit();
  });
})()