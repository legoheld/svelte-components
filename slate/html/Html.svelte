<script context="module" lang="ts">

    import { Element as SlateElement, Text as SlateText } from "slate";

    export interface Nodes {
        [key:string]:ConstructorOfATypedSvelteComponent;
    }

    export function resolveNode( element:SlateText|SlateElement ) {
        let html = getContext<HtmlContext>( 'html' );
        return html.nodes[ ( SlateText.isText( element ) ) ? 'text' : element.type ];
    }

    export interface HtmlContext {
        nodes:Nodes,
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
    import { nodes as defaultNodes } from "./defaults";

    export let nodes:Nodes = defaultNodes;

    export let content:Array<SlateElement>;
    let domPath:Map<Node,number[]> = new Map();
    let pathDom:Map<string,Node> = new Map();


    setContext( 'html', {
        nodes,
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
    <svelte:component this={resolveNode( element )} element={element} path={ [ index ] }></svelte:component>
{/each}
