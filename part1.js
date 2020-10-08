let token = []
let lookout = 0
let storage = []
let check = true

let lexer = function(input)
{
    let i = 0
    for(i; i < input.length; i++)
    {
        token[i] = input.charAt(i)
    }
    return token
}

let program = function()
{
    stmtList()
} 

let stmtList = function()
{
    stmt();
    nextStmt();
}

let nextStmt = function()
{
    if(token[lookout] == ';')
    {
        match(';')
        stmtList()
    }
    else
        return;
}

let stmt = function()
{
    if(token[lookout] == '!')
    {
        print()
    }
    else
    {
        assign()
    }
}

let assign = function()
{
    if(token[lookout] == 'a' || token[lookout] == 'b' || token[lookout] == 'c')
    {
        let i = id() // this holds the address in the storage 
        match('=')
        let ex = expr()
        if(ex > 99)
        {
            storage[i-100] = storage[ex-100]
        }
        else 
        {
            storage[i-100] = ex
        }
    }
}

let print = function()
{
    if(token[lookout] == '!')
    {
        match('!')
        let temp = id()
        console.log("Result: "+storage[temp-100])
    }
}

let id = function()
{
    if(token[lookout] == 'a')
    {
        match('a')
        return 100
    }
    else if(token[lookout] == 'b')
    {
        match('b')
        return 101
    }
    else if(token[lookout] == 'c')
    {
        match('c')
        return 102
    }
    else
    {
        console.log('Syntax Error')
        check = false
        return;
    }
}

let expr = function()
{
    if(token[lookout] == '+') // no ex
    {
        match('+')
        let x = expr()
        let y = expr()
        
        if(x > 99 && y > 99)
        {
            if(storage[x-100] == undefined || storage[y-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (storage[x-100] + storage[y-100])
            }
        }
        else if(x > 99 && y < 99)
        {
            if(storage[x-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (storage[x-100] + y) 
            }
        }
        else if(x < 99 && y > 99)
        {
            if(storage[y-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (x + storage[y-100]) 
            }
        }
        else
            return (x+y)
    } 
    else if(token[lookout] == '-')
    {
        match('-')
        let x = expr()
        let y = expr()

        if(x > 99 && y > 99)
        {
            if(storage[x-100] == undefined || storage[y-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (storage[x-100] - storage[y-100])
            }
        }
        else if(x > 99 && y < 99)
        {
            if(storage[x-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (storage[x-100] - y) 
            }
        }
        else if(x < 99 && y > 99)
        {
            if(storage[y-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (x - storage[y-100]) 
            }
        }
        else
            return (x-y)
    }
    else if(token[lookout] == '*')
    {
        match('*')
        let x = expr()
        let y = expr()

        if(x > 99 && y > 99)
        {
            if(storage[x-100] == undefined || storage[y-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (storage[x-100] * storage[y-100])
            }
        }
        else if(x > 99 && y < 99)
        {
            if(storage[x-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (storage[x-100] * y) 
            }
        }
        else if(x < 99 && y > 99)
        {
            if(storage[y-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (x * storage[y-100]) 
            }
        }
        else
            return (x*y)
    }
    else if(token[lookout] == '/') // have ex
    {
        match('/')
        let x = expr()
        let y = expr()
        
        if(storage[y] == 0)
        {
            console.log("Error: Divided by Zero")
            check = false
            return;
        }
        if(x > 99 && y > 99)
        {
            if(storage[x-100] == undefined || storage[y-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (storage[x-100] / storage[y-100])>>0
            }
        }
        else if(x > 99 && y < 99)
        {
            if(storage[x-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (storage[x-100] / y)>>0
            }
        }
        else if(x < 99 && y > 99)
        {
            if(storage[y-100] == undefined)
            {
                console.log("Error")
                check = false
                return;
            }
            else
            {
                return (x / storage[y-100])>>0
            }
        }
        else
            return (x/y)>>0
    }
    else if(token[lookout] == 'a' || token[lookout] == 'b' || token[lookout] == 'c')
    {
        return id()
    }
    else if(token[lookout] > -1 && token[lookout] < 10)
    {
        return pConst()
    }
    else{
        console.log("Syntax Error")
        check = false
        return;
    }
}

let pConst = function()
{
    if(token[lookout] == '0')
    {
        match('0')
        return 0 
    }
    else if(token[lookout] == '1')
    {
        match('1')
        return 1 
        
    }
    else if(token[lookout] == '2')
    {
        match('2')
        return 2 

    }
    else if(token[lookout] == '3')
    {
        match('3')
        return 3 
        
    }
    else if(token[lookout] == '4')
    {
        match('4')
        return 4 
        
    }
    else if(token[lookout] == '5')
    {
        match('5')
        return 5 
        
    }
    else if(token[lookout] == '6')
    {
        match('6')
        return 6 
        
    }
    else if(token[lookout] == '7')
    {
        match('7')
        return 7 
       
    }
    else if(token[lookout] == '8')
    {
        match('8')
        return 8 
        
    }
    else if(token[lookout] == '9')
    {
        match('9')
        return 9 
       
    }
    else
    {
        console.log("syntax Error")
        check = false
        return;
    }
}

let match = function(t)
{
    if(token[lookout] == t)
    {
        lookout++
    }
    else
    {
        console.log("Error Reading at: "+lookout)
        check = false
    }
}

var readline = require('readline')
var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('Input>> ')
rl.prompt()
rl.on('line', function(input) {
    lexer(input)
    program()
    if(token[lookout] == '.' && check == true && token[lookout+1] == undefined)
    {
        console.log("Parsing Sucessfull")
    }
    else if(token[lookout+1] != undefined)
    {
        console.log("Syntax Error")

        console.log("Parsing Unsucessfull")
    }
    else 
    {
        console.log("Parsing Unsucessfull")
    }
    process.exit(0)
}).on('close',function(){
    process.exit(0)
});




