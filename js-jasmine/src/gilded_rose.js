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
      if (this.items[i].name != AGED_BRIE && this.items[i].name != BACKSTAGE_PASSES) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != SULFURAS) {
            this.decreaseItemQuality(i);
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.increaseItemQuality(i);
          this.increaseQualityForBackStagePasses(i);
        }
      }
      if (this.items[i].name != SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != AGED_BRIE) {
          if (this.items[i].name != BACKSTAGE_PASSES) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != SULFURAS) {
                this.decreaseItemQuality(i);
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.increaseItemQuality(i);
          }
        }
      }
    }
    return this.items;
  }

  increaseQualityForBackStagePasses(i) {
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