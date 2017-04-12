/*
 * values: 2,3,4,5,6,7,8,9,T,J,Q,K,A
 * spades: S,H,D,C
 * royal flush: 
            values : AKQJT
            spades: SSSSS | HHHHH | DDDDD | CCCCC
 * straight flush:
 *          values : KQJT9 | QJT98 | JT987 | T9876 | 98765 | 87654 | 76543 | 65432
 *          spades: SSSSS | HHHHH | DDDDD | CCCCC
 * poker(four of a kind):
 *          values: AAAA? | KKKK? | QQQQ? | JJJJ? | TTTT? | 9999? | 8888? | 7777? | 6666? | 5555? | 4444? | 3333? | 2222?
 *          spades: S{4}? | H{4}? | D{4}? | C{4}?
 * full(full house):
 *          values: AAAKK | AAAQQ | AAAJJ | AAATT | ....      33322
 *          spades: S{3}H{2} | ....
 * flush:
 *          spades: S{5} | H{5} | D{5} | C{5}
 * straight:
 *          values : KQJT9 | QJT98 | JT987 | T9876 | 98765 | 87654 | 76543 | 65432
 * drill(three of a kind):
 *          values: AAA?? | KKK?? | QQQ?? | JJJ?? | TTT?? | 999?? | 888?? | 777?? | 666?? | 555?? | 444?? | 333?? | 222??
 * two pair:
 *          values: KKQQ? | KKTT? | AAKK? | ... 4422?
 * pair:
 *          values: KK??? | ... 33???
 * high card:
 *          
 * 
 * 
 * 
 */

var Result = { "win": 1, "loss": 2, "tie": 3 }

function PokerCard(x) {
    this.spade = x[1];
    this.value = x[0];
    this.valueRank = "23456789TJQKA";
}

PokerCard.prototype.compareWith = function(card) {
    return this.valueRank.indexOf(this.value) > this.valueRank.indexOf(card.value);
}

PokerCard.prototype.toString = function() {
    return this.value + this.spade;
}

function PokerHand(hand) {
    this.cards = [];
    var list = hand.split(' ');
    for(var i=0;i<list.length;i++) {
        this.cards.push(new PokerCard(list[i]));
    }    
    this.cards.sort();
}

PokerHand.prototype.compareWith = function(hand) {
    return Result.tie;
}

PokerHand.prototype.spades = function() {
    var spades = '';
    for(var i=0;i<this.cards.length;i++) {
        spades += this.cards[i].spade;
    }
}
PokerHand.prototype.values = function() {
    var values = '';
    for(var i=0;i<this.cards.length;i++) {
        values += this.cards[i].values;
    }
}

PokerHand.prototype.toString = function() {
    return this.cards.map(String).join(' ');
}

var hands = [
    "2H 3H 4H 5H 6H",
    "AS AH 2H AD AC",
    "2S 3H 4H 5S 6C",
];
for(var i=0;i<hands.length;i++) {
    var hand = new PokerHand(hands[i]);
    console.log(hands[i] + " vs. " + hand.toString());
}

/*
describe("If a poker hand is compared to another poker hand then:", function () {
    it("Highest straight flush wins", function() { assert(Result.loss, "2H 3H 4H 5H 6H", "KS AS TS QS JS");});
    it("Straight flush wins of 4 of a kind", function() { assert(Result.win, "2H 3H 4H 5H 6H", "AS AD AC AH JD");});
    it("Highest 4 of a kind wins", function() { assert(Result.win, "AS AH 2H AD AC", "JS JD JC JH 3D");});
    it("4 Of a kind wins of full house", function() { assert(Result.loss, "2S AH 2H AS AC", "JS JD JC JH AD");});
    it("Full house wins of flush", function() { assert(Result.win,  "2S AH 2H AS AC", "2H 3H 5H 6H 7H");});
    it("Highest flush wins", function() { assert(Result.win, "AS 3S 4S 8S 2S", "2H 3H 5H 6H 7H");});
    it("Flush wins of straight", function() { assert(Result.win, "2H 3H 5H 6H 7H", "2S 3H 4H 5S 6C");});
    it("Equal straight is tie", function() { assert(Result.tie, "2S 3H 4H 5S 6C", "3D 4C 5H 6H 2S");});
    it("Straight wins of three of a kind", function() { assert(Result.win, "2S 3H 4H 5S 6C", "AH AC 5H 6H AS");});
    it("3 Of a kind wins of two pair", function() { assert(Result.loss, "2S 2H 4H 5S 4C", "AH AC 5H 6H AS");});
    it("2 Pair wins of pair", function() { assert(Result.win, "2S 2H 4H 5S 4C", "AH AC 5H 6H 7S");});
    it("Highest pair wins", function() { assert(Result.loss, "6S AD 7H 4S AS", "AH AC 5H 6H 7S");});
    it("Pair wins of nothing", function() { assert(Result.loss, "2S AH 4H 5S KC", "AH AC 5H 6H 7S");});
    it("Highest card loses", function() { assert(Result.loss, "2S 3H 6H 7S 9C", "7H 3C TH 6H 9S");});
    it("Highest card wins", function() { assert(Result.win, "4S 5H 6H TS AC", "3S 5H 6H TS AC");});
    it("Equal cards is tie", function() { assert(Result.tie, "2S AH 4H 5S 6C", "AD 4C 5H 6H 2C");});
});
function assert(expected, player, opponent){
  	var p = new PokerHand(player);
  	var o = new PokerHand(opponent);
  	Test.assertEquals(p.compareWith(o), expected);
}
*/
