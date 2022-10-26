# @lernetz/routes

A module that helps to compose requests with url variables, relative path, method, headers, queries and hash.

Here are some examples how to use the routes module.

* Create a relative path from a base route:
```ts
export const base = new Route( { url:'http://demo.ch/api' } );

base.relative( 'subfolder' ).fetch();
```

* Use url variables:
```ts
export const base = new Route( { url:'http://google.com/?q={query}' } );

base.vars( { query:"Kitties" } ).fetch();
```

* Combine everything together:
```ts
export const base = new Route( { url:'http://base.ch/{path}' } );
base.relative('{section}') // http://base.ch/{path}/{section}
    .query( { lang:'{lang}' } ) // http://base.ch/{path}/{section}?lang={lang}
    .hash( '{anchor}' ) // http://base.ch/{path}/{section}?lang={lang}#{anchor}
    .vars( { path:'backend', section:'admin', lang:'de', anchor:'title' } ) // http://base.ch/backend/admin?lang=de#title
    .method('POST') // set request method
    .headers( { 'Accept':'application/json'} ) // set request headers
    .body( 'Some content' ) // set request body
    .fetch() // invoke the request
```


# Route mapping

If you have an object with multiple route definitions you can use the `mapRoutes` helper function to recursive map objects into route instances.

```ts
// external data
let data = {
    image: { url: 'http://img.src/{name}.{ext}' },
    api: { url: 'api', headers: { CSRF_TOKEN:'sdgfhgjsd' } },
    service: { 
        get: { 'http://my.other.service/api/{id}', method:'GET' },
        delete: { 'http://my.other.service/api/{id}', method:'DELETE' },
    }
}

// as these route definitions most often com from the outside
// we can type these in the generic
const routes = mapRoutes<{ image:Route, api:Route, service: { get:Route, delete:Route } } >( data );


// now you have access on the Route instances
routes.image.vars( { name: 'cat', ext:'png' } ).url // http://img.src/cat.png
routes.api.relative( 'delete' ).fetch() // will fetch ./api/delete
routes.service.get.vars( { id:12 } ).body( JSON.stringify( { data:'more' } ) ).fetch() // will fetch http://my.other.service/api/12 with GET method and { data:'more' } body.

