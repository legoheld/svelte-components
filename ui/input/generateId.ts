let count = 0;

export function generateId( prefix:string = 'label' ) {
    return prefix + '-' + (++count);
}