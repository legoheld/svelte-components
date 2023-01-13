type ActionDestroy = {
    destroy:() => void;
}
export function unify( destroies:Array<ActionDestroy|void> ) {

    const destroys = destroies.filter( ( d ): d is ActionDestroy => ( d != undefined ) ).map( d => d.destroy );
    return {
        destroy() {
            destroys.forEach( destroy => destroy() );
        }
    }
}