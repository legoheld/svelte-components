import { expect, test } from '@playwright/test';
import { get } from 'svelte/store';
import { locale, set, t } from '../translate';



test.describe('Test translate', () => {


    test("Default language",() => {
        set('de', { lang:"DE" } );
        expect( get( t )('lang') ).toEqual( 'DE' );
    });


    test('Translation set as object',() => {
        set( {
            'de': {
                lang:"DE",
            },
            'en': {
                lang:"EN",
            }
        });

        locale.set('de');
        expect( get( t )('lang') ).toEqual( 'DE' );
        locale.set('en');
        expect( get( t )('lang') ).toEqual( 'EN' );

    });


    test('Translation set as lang:object',() => {
        set( 'de', {
            lang:"DE",
        });
        set( 'en', {
            lang:"EN",
        });

        locale.set('de');
        expect( get( t )('lang') ).toEqual( 'DE' );
        locale.set('en');
        expect( get( t )('lang') ).toEqual( 'EN' );
    });
    

    test("Variable substitution", () => {
        set('de', { lang:"Mein {name}" } );
        set('en', { lang:"My {name}" } );
        locale.set('de');
        expect( get( t )('lang', { values:{ name:"Name" } } ) ).toEqual( 'Mein Name' );
        locale.set('en');
        expect( get( t )('lang', { values:{ name:"name" } } ) ).toEqual( 'My name' );
    });


    test("Plurals", () => {
        set('de', { lang: {
            "-30...-1": "Fehlende Äpfel",
            "0": "Kein Apfel",
            "1": "Ein Apfel",
            "2...5": "Einige Äpfel",
            "6+": "Viele Äpfel",
        } } );
        locale.set('de');
        expect( get( t )('lang', { count:-30 } ) ).toEqual( 'Fehlende Äpfel' );
        expect( get( t )('lang', { count:-10 } ) ).toEqual( 'Fehlende Äpfel' );
        expect( get( t )('lang', { count:-1 } ) ).toEqual( 'Fehlende Äpfel' );
        expect( get( t )('lang', { count:0 } ) ).toEqual( 'Kein Apfel' );
        expect( get( t )('lang', { count:1 } ) ).toEqual( 'Ein Apfel' );
        expect( get( t )('lang', { count:2 } ) ).toEqual( 'Einige Äpfel' );
        expect( get( t )('lang', { count:4 } ) ).toEqual( 'Einige Äpfel' );
        expect( get( t )('lang', { count:5 } ) ).toEqual( 'Einige Äpfel' );
        expect( get( t )('lang', { count:6 } ) ).toEqual( 'Viele Äpfel' );
        expect( get( t )('lang', { count:100 } ) ).toEqual( 'Viele Äpfel' );
    });


    test("Missing translation", () => {
        set('de', { 
            plural: {
                "0": "Kein Apfel",
            },
        } );
        locale.set('de');
        expect( get( t )('plural', { count:-30 } ) ).toEqual( 'plural' );
        expect( get( t )('demo' ) ).toEqual( 'demo' );
    });
});

