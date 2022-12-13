import { BaseEditor } from "slate";

export type CustomElement = { type: string; children: Array<CustomElement | CustomText>; };
export type CustomLink = { type: string, url: string; target: string, children: Array<CustomElement | CustomText>; };
export type CustomText = { text: string; bold?: true, italic?: boolean; };


declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor;
        Element: CustomElement | CustomLink;
        Text: CustomText;
    }
}

