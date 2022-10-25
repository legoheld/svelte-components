import { expect, test } from '@playwright/test';
import { depthFirst, interpolate } from '../common';


test.describe('Test interpolation', () => {
    let template = 'My {name}';

    test('variable substitution', ({}) => {
        expect( interpolate( template, { name:"Demo" } ) ).toEqual( "My Demo" );
    });

    test('empty variable substitution', ({}) => {
        expect( interpolate( template, { } ) ).toEqual( "My " );
    });

    test('wrong variable substitution', ({}) => {
        expect( interpolate( template, { name2:"Demo" } ) ).toEqual( "My " );
    });

    test('variable substitution with whitespaces', ({}) => {
        expect( interpolate( 'My {  name    }', { name:"Demo" } ) ).toEqual( "My Demo" );
    });
});


test.describe('Test traverse', () => {

    let demoData = {
        string: "string",
        boolean: true,
        number: 1,
        array: [
            "arrayKey",
            { nested:"nested" }
        ],
        object: {
            objKey:"objKey"
        }
    };


    test('depthFirst', ({}) => {

        let result:Array<any> = [];

        depthFirst( demoData, ( item ) => {
            result.push( item );
            return item;
        });

        expect( result ).toEqual( [
            "string",
            true,
            1,
            "arrayKey",
            "nested",
            { nested:"nested" },
            demoData.array,
            "objKey",
            demoData.object,
            demoData
        ] );
    });
});