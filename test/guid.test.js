var should = require( "should" ),
  guid = require( "../index" );

describe( "guid", function () {

  var invalidValues = [ null,
    undefined, {},
    /^/,
    1,
    true
  ];

  it( "should generate a guid", function () {

    var aGuid = guid.generate();

    aGuid.should.be.a.type( "string" );
    aGuid.should.have.a.lengthOf( 36 );

  } );

  it( "should get no guids from a string", function () {
    var aString = "Tristique Parturient Lorem Elit Ullamcorper",
      guidMatches = guid.match( aString );

    guidMatches.should.have.a.lengthOf( 0 );

  } );

  it( "should get one guid from a string", function () {

    var aGuid = guid.generate(),
      aString = "Lorem ipsum dolor " + guid.generate() + "Ligula Vulputate Fusce Malesuada",
      guidMatches = guid.match( aString );

    guidMatches.should.have.a.lengthOf( 1 );

  } );

  it( "should get multiple guids from a string", function () {

    var aGuid = guid.generate(),
      aString = "Lorem ipsum dolor " + guid.generate() + "Ligula Vulputate " + guid.generate() + " Fusce Malesuada",
      guidMatches = guid.match( aString );

    guidMatches.should.have.a.lengthOf( 2 );

  } );

  it( "should be able to handle invalid data", function () {

    guid.match().should.be.an.instanceOf( Array ).and.have.a.lengthOf( 0 );

    invalidValues.forEach( function ( invalidValue ) {
      guid.match( invalidValue ).should.be.an.instanceOf( Array ).and.have.a.lengthOf( 0 );
    } );

  } );

  it( "should validate a guid from a string", function () {

    guid.isValid( "49d1ee2c-85f0-4f5e-bd09-38d75eb65b39" ).should.be.true;
    guid.isValid( "3F230A1E-11AC-44D1-B19A-80333AE3588F" ).should.be.true;
    guid.isValid( "7bdee615-7a34-4695-9f63-2da45bfd3980" ).should.be.true;
    guid.isValid( "0a971bb9-b3ab-49ca-a027-feac3ddab2a3" ).should.be.true;

    invalidValues.forEach( function ( invalidValue ) {
      guid.isValid( invalidValue ).should.be.false
    } );

  } );

} );