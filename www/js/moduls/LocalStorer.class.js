//localStorage är ett inbyggt globalt objekt i JavaScript, med speciella egenskaper. Det överlever nämligen sidomladdningar 
//och även att du stänger din webbläsare.
//Vi kan därmed använda det för att lagra data som är användarspecifik och som vi vill ska överlevea mellan 
//besök på en webbplats. (Datan finns kvar så länge användaren inte tömmer sin webbläsarcache.)
//Nackdelar? localStorage kan bara lagra värden av typen String.
//Hur kommer vi runt detta? Jo, med lite smart användning av JSON.stringify och JSON.parse. Tillsammans med Proxy-objektet 
//blir det då ganska enkelt att bygga en wrapper runt localStorage som avsevärt utökar dess funktionalitet, 
//så att vi kan lagra olika datastrukturer (object, arrayer etc.).
//Fördelen är också att vår applikation bara behöver “skräpa ner” en nyckel i localStorage-objektet.

//USAGE
//let storage = new LocalStorer('myAppName');
//// Some initial settings
//storage.hiScoreTable = storage.hiScoreTable || [];
//storage.difficulty = storage.difficulty || "Easy";
//// Later in your program
//storage.hiScoreTable.push({name:"Eva",score:10000});


class LocalStorer {

    constructor(key = "app") {
        // key is what key to use in the raw localStorage object
        this.key = key;

        // We we instantiate a new LocalStorer instance
        // read from the correct in localStorage
        Object.assign(this, JSON.parse(localStorage[this.key] || '{}'));

        // Everytime we change a property for this instance
        // of LocalStorer write it to localStorage
        let handler = {
            get: function (obj, propname) {
                // Return a new proxy for each "sub-object"
                // so that changes in arrays and subobjects are registrered
                let val = Reflect.get(obj, propname);
                if (typeof val == 'object') {
                    val = new Proxy(val, handler);
                }
                return val;
            },
            set: (obj, propName, val) => {
                Reflect.set(obj, propName, val);
                localStorage[this.key] = JSON.stringify(this);
                return true;
            }
        };

        return new Proxy(this, handler);

    }

}