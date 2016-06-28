test = require \tape
MoonLog = require \../lib/moon-log
level = require 'level-browserify'

db = level \./log-db , valueEncoding: 'json'


test 'create some logs', (t) !->
    t.plan 1
    log = new MoonLog do
        db: db
        colors: <[ #00ff6a ]> 
        backgrounds: <[ grey ]>
        stringify-objects: true
        use-tables: true
    window.log = log
    log.info do
        'first test'
        <[ asd kahsd ahgsd asd asd kahsd ahgsd asd  ]>
        [ 1 2 3 ]
        [ 
          * name: \peter
            foo: \bar
            jooo: 123
            asd: new Date
          * name: \john 
        ]
        foo: \pte
        {
            "glossary": {
                "title": "example glossary",
                "GlossDiv": {
                    "title": "S",
                    "GlossList": {
                        "GlossEntry": {
                            "ID": "SGML",
                            "SortAs": "SGML",
                            "GlossTerm": "Standard Generalized Markup Language",
                            "Acronym": "SGML",
                            "Abbrev": "ISO 8879:1986",
                            "GlossDef": {
                                "para": "A meta-markup language, used to create markup languages such as DocBook.",
                                "GlossSeeAlso": ["GML", "XML"]
                            },
                            "GlossSee": "markup"
                        }
                    }
                }
            }
        }
    log.chart <[
        123
        333
        22
        1
        23
        231
        123
        2
        13
        2
    ]>

    t.equal typeof log, 'object'


        



