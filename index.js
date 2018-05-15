const ractive = new Ractive({
  target: '#target',
  template: '#template',
  data: {
  	visible: 1
  }
});

ractive.on( 'show', ( ctx, which ) => {
	this.set( 'visible', which );
});

const myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials': true
});
const myInit = { mode: 'no-cors',
               header: {
                 'Access-Control-Allow-Origin':'*',
               }};

fetch('https://www.npr.org/rss/rss.php?id=1001', myInit)
  .then(res => {
    console.log(res.ok);
    console.log(res.status);
    console.log(res.statusText);
    console.log(res.headers.get('content-type'));
    return res.text()
  })
  .then(body => console.log(body));
