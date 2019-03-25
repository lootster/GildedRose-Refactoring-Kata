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

      if (this.items[i].quality < 50) {
        if (this.items[i].name === BACKSTAGE_PASSES) {
          this.increaseBackStagePassesQuality(i);
        }
        if (this.items[i].name != AGED_BRIE && this.items[i].name != BACKSTAGE_PASSES) {
          if (this.items[i].quality > 0) this.decreaseItemQuality(i);
        } 
        else {
          this.increaseItemQuality(i);
        }
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != AGED_BRIE) {
          if (this.items[i].name != BACKSTAGE_PASSES) {
            if (this.items[i].quality > 0) {
              this.decreaseItemQuality(i);
            }
          } else {
            this.decreaseQualityToZero(i);
          }
        } else {
            this.increaseItemQuality(i);
        }
      }
    }
    return this.items;
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
    if (this.items[i].name == BACKSTAGE_PASSES) {
      if (this.items[i].sellIn < 11) {
        this.increaseItemQuality(i);
      }
      if (this.items[i].sellIn < 6) {
        this.increaseItemQuality(i);
      }
    }
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