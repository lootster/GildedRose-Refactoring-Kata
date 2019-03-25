const BACKSTAGE_PASSES = 'Backstage passes';
const AGED_BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras';
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
  
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.isSulfuras(i)) return this.items;

      this.decreaseSellIn(i);

      if (this.isQualityBelowOrEqual50(i)) {
        if (this.isBackStagePasses(i)) this.increaseBackStagePassesQuality(i);
        if (this.isAgedBrie(i)) this.increaseItemQuality(i);
        if (this.isNormalItem(i)) {
          if (this.isQualityAboveZero(i)) {
            this.decreaseItemQuality(i);
            // Decrease Quality another time if SellIn has expired
            if (this.isSellInExpired(i)) this.decreaseItemQuality(i);
          }
        }
      }
    }
    return this.items;
  }

  isQualityAboveZero(i) {
    return this.items[i].quality > 0;
  }

  isAgedBrie(i) {
    return this.items[i].name === AGED_BRIE;
  }

  isBackStagePasses(i) {
    return this.items[i].name === BACKSTAGE_PASSES;
  }

  isQualityBelowOrEqual50(i) {
    return this.items[i].quality < 50;
  }

  isNormalItem(i) {
    return this.items[i].name != AGED_BRIE && this.items[i].name != BACKSTAGE_PASSES;
  }

  isSellInExpired(i) {
    return this.items[i].sellIn < 0;
  }

  decreaseQualityToZero(i) {
    this.items[i].quality = 0;
  }

  isSulfuras(i) {
    return this.items[i].name === SULFURAS;
  }

  decreaseSellIn(i) {
    this.items[i].sellIn = this.items[i].sellIn - 1;
  }

  increaseBackStagePassesQuality(i) {
    this.increaseItemQuality(i);
    if (this.items[i].sellIn < 11) this.increaseItemQuality(i);
    if (this.items[i].sellIn < 6) this.increaseItemQuality(i);
    if (this.items[i].sellIn < 0) this.decreaseQualityToZero(i);
  }

  decreaseItemQuality(i) {
    this.items[i].quality -= 1;
  }

  increaseItemQuality(i) {
    this.items[i].quality += 1;
  }
}
module.exports = {
  Item,
  Shop
}