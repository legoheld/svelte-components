<script context="module" lang="ts">

    import { Element as SlateElement, Text as SlateText } from "slate";

    export interface Types {
        [key:string]:ConstructorOfATypedSvelteComponent;
    }

    export interface HtmlContext {
        types:Types,
        register: ( path:number[], n:Node ) => void,
    }

    export function resolveType( element:SlateText|SlateElement ) {
        let html = getContext<HtmlContext>( 'html' );
        return html.types[ ( SlateText.isText( element ) ) ? 'text' : element.type ];
    }

    export function getRegister() {
        return getContext<HtmlContext>( 'html' ).register;
    }

</script>


<script lang="ts">
    import { getContext, setContext } from "svelte";
    import { types as defaultTypes } from "./defaults";
    import Children from "./types/Children.svelte";

    export let types:Types = defaultTypes;

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

<Children element={{children:content}} path={[]}></Children>
