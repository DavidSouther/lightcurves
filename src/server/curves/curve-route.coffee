Path = require 'path'
AssetWatcher = require('rupert').Stassets.constructors.Builder;

class DataWatcher extends AssetWatcher
  constructor: (@config)->
    @config = JSON.parse JSON.stringify @config
    @config.source or= Path.normalize Path.join __dirname, '../../data'
    unless @config.source instanceof Array
        @config.source = [ @config.source ]
    @config.root = @config.source
    @meta = yes

    super()

    @log @config

  pattern: ->
    super [
      "**/*.json"
    ]

  matches: (path)-> path in ['/data.json']
  type: -> "application/json"

  render: (_, filename)->
    matches = filename.match(/KOI_(Q[0-9]+)\/(kplr[0-9]+)/) || []

    {
      quarter: matches[1],
      kid: matches[2]
    }

  concat: (_)->
    library = {}

    _.forEach (listing)->
      if listing? and listing.kid? and listing.quarter?
        library[listing.kid] or= {}
        library[listing.kid][listing.quarter] = 1

    JSON.stringify library

module.exports = (app, config)->
  watcher = new DataWatcher(config.stassets)
  app.use (q, s, n)->
    if watcher.matches q.path
      return watcher.handle(q, s, n)
    else
      n()
