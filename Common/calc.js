// default state of calculator object
var initialState = {
    currentExpression: "0",
    endsInSymbol: false,
    inDecimal: false,
    expressionIsAns: true,
    memValue: 0
};

//keep the old state if we're reloading this file.
if(typeof calculator != 'undefined') {
    initialState = calculator;
}

// define the calculator object
calculator = {
    currentExpression: initialState.currentExpression,
    endsInSymbol: initialState.endsInSymbol,
    inDecimal: initialState.inDecimal,
    expressionIsAns: initialState.expressionIsAns,
    memValue: initialState.memValue,
    
    buttonPress: function (operation) {
        var isSymbol = isNaN(operation);
        
        if(operation === "=") {
            if (this.endsInSymbol) return;

            this.currentExpression = eval(this.currentExpression).toString();
            this.expressionIsAns = true;
        } else if (operation === '.') {
            if(this.expressionIsAns) {
                this.clear();
            }

            if (this.inDecimal) return;

            this.inDecimal = true;
            this.currentExpression += operation;
            this.endsInSymbol = true;
        } else if (isSymbol) {
            if (this.endsInSymbol && (operation === '*' || this.inDecimal)) return;

            this.currentExpression = this.currentExpression + " " + operation + " ";
            this.expressionIsAns = false;
            this.endsInSymbol = true;
            this.inDecimal = false;
        } else { //number
            if(this.expressionIsAns) {
                this.clear();
            }
            
            this.currentExpression = this.currentExpression + operation;
            this.endsInSymbol = false;
        }
        
        display.setText(this.currentExpression);
        
    },
    clear: function(){
        this.currentExpression = "";
        this.expressionIsAns = false;
        this.inDecimal = false;
        this.endsInSymbol = false;
    },
    clearToZero: function() {
        this.currentExpression = "0";
        this.expressionIsAns = true;
        this.inDecimal = false;
        this.endsInSymbol = false;
        display.setText(this.currentExpression);
    },
    memStore: function() {
        if (!isNaN(this.currentExpression)) {
            this.memValue = this.currentExpression;
            console.log("mem set to: "+this.memValue);
            //TODO feedback would be nice...
        }
    },
    memRecall: function() {
        this.buttonPress(this.memValue);
    }
};

//intentional global-this to check existence safely
if (this.clearButton) {
    //not using bind here because rhino's magic "pass a function where an interface is expected" thing does not work with bind.
    clearButton.setOnClickListener(function(){calculator.clearToZero();});
}
if (this.memStoreButton && this.memRecallButton) {
    memStoreButton.setOnClickListener(function(){calculator.memStore();});
    memRecallButton.setOnClickListener(function(){calculator.memRecall();});
}

display.setText(calculator.currentExpression);

console.log("Loaded calc.js");
