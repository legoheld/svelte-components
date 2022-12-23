export function rootNode( n:Node ) {
    const root = n?.getRootNode();
    if( ( root instanceof Document || root instanceof ShadowRoot) && root['getSelection'] != null ) return root;
    return n?.ownerDocument;
}