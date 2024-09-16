export default class WordSearch {

  constructor(letterGrid) {
    this.letterGrid = letterGrid;
  }

  getReverse(word) {
    return word.split('').reverse().join('');
  }

  searchWorld(parola, row, col) {
    //console.log("searchWorld("+parola+","+row+","+col+") char is "+this.letterGrid[row].charAt(col));
    let wordH = "";
    let wordV = "";
    let wstart = [row+1, col+1];
    let wend = [row+1, col+parola.length];
    //Ricerca orizzontale
    if((this.letterGrid[row].length-col)>=parola.length)
    {
      wordH = this.letterGrid[row].substring(col,col+parola.length);
      //console.log("searchWorld: wordH="+wordH);
      if( wordH === parola ) {
        return {
          "start": wstart,
          "end": wend
        };
      } else if( this.getReverse(wordH) === parola ) {
        //console.log("searchWorld: trovata reverse "+this.getReverse(wordH));
        return {
          "start": wend,
          "end": wstart
        };
      }
    }
    //Ricerca verticale
    for(let i=row ; i<this.letterGrid.length ; i++) {
      wordV = wordV + this.letterGrid[i].charAt(col);
      //console.log("searchWorld: wordV="+wordV);
      wend = [i+1, col+1];
      if( wordV === parola ) {
        //console.log("searchWorld: trovata V "+wordV);
        return {
          "start": wstart,
          "end": wend
        };
      } else if( this.getReverse(wordV) === parola ) {
        //console.log("searchWorld: trovata V reverse "+this.getReverse(wordV));
        return {
          "start": wend,
          "end": wstart
        };
      }
      if(wordH.length>parola.length || wordV.length>parola.length) {
        return null;
      }
    }
    return null;
  }

  find(words) {
    // TO-DO: Implement searching for specific words in the this.letterGrid
    //console.log("find("+words+")");
    let foundWords = {};
    if (words && words.length>0 && this.letterGrid && this.letterGrid.length>0) {
      for(let i=0 ; i<this.letterGrid.length ; i++) {
        for(let j=0 ; j<this.letterGrid[0].length ; j++) {
          words.forEach(parola => {
              let esito = this.searchWorld(parola, i, j);
              //console.log("esito is "+JSON.stringify(esito,null,0));
              if( esito ) {
                foundWords = { ...foundWords, [parola] : esito};
                words.splice(words.indexOf(parola),1);
              }
          });
          if( words.length == 0 ) {
            i = this.letterGrid.length;
            j = this.letterGrid[0].length;
          }
        }
      }
      words.forEach(parola => {
        foundWords = {...foundWords, [parola]: undefined};
      });
    }
    //console.log("find return "+JSON.stringify(foundWords,null,0))
    return foundWords;
  }
}
