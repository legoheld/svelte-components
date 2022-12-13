<script context="module" lang="ts">

    import { Element as SlateElement, Range, Text as SlateText } from "slate";

    export interface Types {
        [key:string]:ConstructorOfATypedSvelteComponent;
    }

    export function resolveType( element:SlateText|SlateElement ) {
        let html = getContext<HtmlContext>( 'html' );
        return html.types[ ( SlateText.isText( element ) ) ? 'text' : element.type ];
    }

    export interface HtmlContext {
        types:Types,
        register: ( path:number[], n:Node ) => void,
    }

    export function registerElement( node:Node, args:{ path:number[], html:HtmlContext } ) {
        args.html.register( args.path, node );
    }
    export function registerText( node:Node, args:{ path:number[], html:HtmlContext } ) {
        // extract text node
        args.html.register( args.path, node.childNodes[0] );
    }

</script>


<script lang="ts">
    import { getContext, setContext } from "svelte";
    import Link from "./types/Link.svelte";
    import Text from "./types/Text.svelte";
    import TypeElement from "./types/TypeElement.svelte";

    export let types:Types = {
        'p':TypeElement,
        'ul':TypeElement,
        'ol':TypeElement,
        'li':TypeElement,
        'h1':TypeElement,
        'h2':TypeElement,
        'h3':TypeElement,
        'a':Link,
        'text':Text
    };


    export let content:Array<SlateElement>;
    let domPath:Map<Node,number[]> = new Map();
    let pathDom:Map<string,Node> = new Map();


    setContext( 'html', {
        types,
        register: ( path:number[], n:Node ) => {
            pathDom.set( path.join( ',' ), n );
            domPath.set( n, path );
        }
    } );


    export function nodeOf( path:number[] ):Node {
        return pathDom.get( path.join( ',' ) );
    }
    export function pathOf( node:Node ):number[] {
        return domPath.get( node );
    }

</script>

{#each content as element, index}
    <svelte:component this={resolveType( element )} element={element} path={ [ index ] }></svelte:component>
{/each}
