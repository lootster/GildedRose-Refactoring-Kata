var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should return foo", function() {
    const item01 = new Item("foo", 0, 0);
    const item02 = new Item("bar", 0, 0);
    const gildedRose = new Shop([ item01, item02 ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
    expect(items[1].name).toEqual("bar");
  });

  it("Once the sell by date has passed, Quality degrades by 1", function() {
    const gildedRose = new Shop([ new Item("foo", 1, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("The Quality of an item is never negative", function() {
    const gildedRose = new Shop([ new Item("foo", 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("'Aged Brie' actually increases in Quality the older it gets", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });

  it("The Quality of an item is never more than 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", function() {
    const gildedRose = new Shop([ new Item("Sulfuras", 2, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(2);
    expect(items[0].quality).toEqual(10);
  });

  it("'Backstage passes', Quality increases by 2 when there are 10 days or less", function() {
    const gildedRose = new Shop([ new Item("Backstage passes", 10, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(12);
  });

  it("'Backstage passes', Quality increases by 3 when there are 5 days or less", function() {
    const gildedRose = new Shop([ new Item("Backstage passes", 5, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(13);
  });

  it("'Backstage passes', Quality drops to 0 after the concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });


});
