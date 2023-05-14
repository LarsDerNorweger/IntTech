const http = require( "http" );
const fs = require( "fs" );
const path = require( "path" );

function Server( hostname, port )
{
  let listener = http.createServer( serve );
  let started = false;
  let root = "";
  function start( r )
  {
    stop();
    listener.listen( port, hostname );
    console.log("StartUpServer on:",hostname,':',port)
    started = true;
    root = r;
  };

  function stop()
  {
    if( started )
      listener.close();
    started = false;
  }

  function serve( req, res )
  {
    let url = req.url + '';
    if( url === "/" )
      sendFile( "index.htm", res );
    else if( url.includes( "../" ) )
      sendFile( "error.htm", res, 501 );
    else sendFile( url, res, 200 );
  }

  function sendFile( file, res, status )
  {
    status = status || 200;
    let p = path.join( root, file );
    console.log( status, p, mime( p ) );
    if( fs.existsSync( p ) )
    {
      res.writeHead( status, { 'Content-Type': mime( p ) } );
      fs.readFile( p, { encoding: "utf-8" }, ( err, data ) => { res.end( data ); } );
    }
    else
      sendFile( "error.htm", res, 404 );
  }

  return { start, stop };
}

function mime( p )
{
  let e = path.extname( p );
  e = e.replace( '.', '' );
  switch( e )
  {
    case "html":
    case "htm": return "text/html";
    case "js": return "text/javascript";
    default: return "text/plain";
  }
}


let server = Server( "localhost", 8080 );
server.start( "../App" );
