
export default function textLoad(input,balls){

    var loader = new THREE.FontLoader();
    loader.load( './helvetiker_regular.typeface.json', function ( font ) {

        var xMid, text;

        var color = 0x006699;

        var matDark = new THREE.LineBasicMaterial( {
            color: color,
            side: THREE.DoubleSide
        } );

        var matLite = new THREE.MeshBasicMaterial( {
            color: color,
            transparent: true,
            opacity: 0.66,
            side: THREE.DoubleSide
        } );

        var message = input;

        var shapes = font.generateShapes( message, 40 );

        var geometry = new THREE.ShapeBufferGeometry( shapes );

        geometry.computeBoundingBox();

        xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

        geometry.translate( xMid, 0, 0 );
        
        // make shape ( N.B. edge view not visible )

        text = new THREE.Mesh( geometry, matLite );
        text.position.z = -50;
        text.position.y = -4;
        text.position.x = -20;
        text.name = "  scott\n   App"
        //scene.add( text );
        testShit.push( text );
        scottFont = text;
       // scene.add(testShit[0]);

        //add font to camera2 to be added to scene2 clearBuffer rendering
        //camera2.add(testShit[0]);
        //return text;
        // make line shape ( N.B. edge view remains visible )

        var holeShapes = [];

        for ( var i = 0; i < shapes.length; i ++ ) {

            var shape = shapes[ i ];

            if ( shape.holes && shape.holes.length > 0 ) {

                for ( var j = 0; j < shape.holes.length; j ++ ) {

                    var hole = shape.holes[ j ];
                    holeShapes.push( hole );

                }

            }

        }

        shapes.push.apply( shapes, holeShapes );

        var lineText = new THREE.Object3D();

        for ( var i = 0; i < shapes.length; i ++ ) {

            var shape = shapes[ i ];

            var points = shape.getPoints();
            var geometry = new THREE.BufferGeometry().setFromPoints( points );

            geometry.translate( xMid, 0, 0 );

            var lineMesh = new THREE.Line( geometry, matDark );
            lineText.add( lineMesh );

        }

        //scene.add( lineText );


    } ); //end load function
}