
window = window? or self? or @

SOME-COLORS = <[
    #E44424
    #67BCDB
    #A2AB58
    #2B2B2B
    #DE1B1B
    #FFFFFF
    #404040
    #6DBDD6
    #B71427
    #FFE658
    #585858
    #118C4E
    #C1E1A6
    #FF9009
]>

settings =
    backgrounds: [] 
    colors: [] 
    stringify-objects: null
    use-table: null
    styles: 
        time: "
            background: black;
            color: white;
        "
        mark: "
            font-size:50px;
            color: red;
        "
        json: "
            font-size:15px;
            color: blue;
            background-color: white;
        "
        default: "
            font-size:30px; color:red;
        "


exec-logs = (args)->
    args.forEach (arg)->
        
        if typeof arg is 'object' && not (arg instanceof Array)
            print-object transform-object arg
        else if arg instanceof Array
            print-array transform-array arg
        else if typeof arg is 'string'
            print-string transform-string arg
        else console.info arg

print-object = -> 
    if settings.stringify-objects
        console.info.apply null, it
    else console.table it
        
print-array = -> 
    console.table it 

print-string = -> console.info.apply null, it


transform-object = -> 
    if settings.stringify-objects
        transform-string do
            JSON.stringify it, null, 4
            settings.styles.json
    else if settings.use-table 
        [ it ]
    else it
        
transform-array = -> 
    found = false
    foundIndex = null
    tmp = []
    it.forEach (child, index)->

        if child instanceof Array and not found
            found = true
            foundIndex = index
        else tmp.push child

    if found
        exec-logs it.slice foundIndex+1
    return tmp


transform-string = (it, style = settings.styles.default)-> [ "%c #it",  style] 

default-console = ~> console.info.apply @, it

print = (it, style, console = console.info)-> console transform-string it, style
 
class MoonLog
    ({backgrounds = ['#fff'], colors = ['#000'], stringify-objects, db} = {})->
        @db = db
        settings.backgrounds = backgrounds
        settings.colors = colors
        settings.stringify-objects = stringify-objects
    run: !-> 
        if @db
            @db.put new Date!, it
        exec-logs it
    info:(...args)!-> @run args
    chart: (arr, opts = {})-> 
        str = ""
        styles = []
        arr.forEach (value, i)->
            str += " %c #{value}"
            styles.push "bottom: 200px; line-height: 400px; position: absolute; border-top: #{value}px solid #{SOME-COLORS[i]}; margin-left:20px;"
        styles.unshift str
        
        console.info.apply null, styles
    mark: (string)-> 
    print: print
    print-history:->
        if @db
            @db.createReadStream!
                .on('data', (data) !~>  
                    console.log typeof data.value

                    @info.apply @, data.value
                ).on('error', (err) !->
                    console.log 'Oh my!', err
                ).on('close', !->
                    console.log 'Stream closed'
                ).on 'end', !->
                    console.log 'Stream closed'



module.exports = MoonLog
   

    