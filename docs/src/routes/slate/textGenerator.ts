import { LoremIpsum } from "lorem-ipsum";

export function generate( config:{type:string, mode:'word'|'sentence'|'paragraph', num:number} ) {
    let generator = new LoremIpsum();
    let map = {
        word: generator.generateWords.bind( generator ),
        sentence: generator.generateSentences.bind( generator ),
        paragraph: generator.generateParagraphs.bind( generator ),
    }
    return [ ...Array(config.num)].map( () => ({ type:config.type, children: [
        { text: map[ config.mode ]( config.num ) }
    ]}))
}