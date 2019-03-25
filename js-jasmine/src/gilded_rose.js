const BACKSTAGE_PASSES = 'Backstage passes';
const AGED_BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras';
const CONJURED = 'Conjured';
const MAX_VALUE = 50;
const MIN_VALUE = 0;
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQualityAndSellIn() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.isSulfuras(i)) return this.items;
      this.decreaseSellIn(i);
      if (this.isQualityBelowMaxValue(i)) {
        if (this.isBackStagePasses(i)) 
          this.increaseBackStagePassesQuality(i);
        if (this.isAgedBrie(i)) 
          this.increaseQuality(i);
      }
      if (this.isNormalItem(i) && this.isQualityAboveMinValue(i))
        this.decreaseQuality(i);
    }
    return this.items;
  }

  isQualityAboveMinValue(i) {
    return this.items[i].quality > MIN_VALUE;
  }

  isQualityBelowMaxValue(i) {
    return this.items[i].quality < MAX_VALUE;
  }

  isAgedBrie(i) {
    return this.items[i].name === AGED_BRIE;
  }

  isBackStagePasses(i) {
    return this.items[i].name === BACKSTAGE_PASSES;
  }

  isNormalItem(i) {
    return this.items[i].name != AGED_BRIE && this.items[i].name != BACKSTAGE_PASSES && this.items[i].name !== CONJURED;
  }

  isSellInExpired(i) {
    return this.items[i].sellIn < MIN_VALUE;
  }

  isSulfuras(i) {
    return this.items[i].name === SULFURAS;
  }

  decreaseSellIn(i) {
    this.items[i].sellIn--;
  }

  decreaseQuality(i) {
    if (this.isSellInExpired(i)) this.items[i].quality -= 2;
    else this.items[i].quality--;
  }

  increaseQuality(i) {
    this.items[i].quality++;
  }

  decreaseQualityToZero(i) {
    this.items[i].quality = MIN_VALUE;
  }

  increaseBackStagePassesQuality(i) {
    this.increaseQuality(i);
    if (this.items[i].sellIn < 11) this.increaseQuality(i);
    if (this.items[i].sellIn < 6) this.increaseQuality(i);
    if (this.items[i].sellIn < MIN_VALUE) this.decreaseQualityToZero(i);
  }
}

module.exports = {
  Item,
  Shop
}