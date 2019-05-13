 /** The Bend modifier lets you bend the current selection up to 90 degrees about a single axis,
 * producing a uniform bend in an object's geometry.
 * You can control the angle and direction of the bend on any of three axes.
 * The geometry has to have rather large number of polygons!
 * options:
 * 	 direction - deformation direction (in local coordinates!). 
 * 	 axis - deformation axis (in local coordinates!). Vector of direction and axis are perpendicular.
 * 	 angle - deformation angle.
 * @author Vildanov Almaz / alvild@gmail.com
 * The algorithm of a bend is based on the chain line cosh: y = 1/b * cosh(b*x) - 1/b. It can be used only in three.js.
 */

THREE.BendModifier = function () {

};

THREE.BendModifier.prototype = {

    constructor: THREE.BendModifier,

 //    set: function ( direction, axis, angle ) {
 //        this.direction = new THREE.Vector3(); this.direction.copy( direction );
	// 	this.axis = new THREE.Vector3(); this.axis.copy( axis );
 //        this.angle = angle;
 //        return this
 //    },

	// _sign: function (a) {
 //        return 0 > a ? -1 : 0 < a ? 1 : 0
 //    },

	// _cosh: function( x )  {
	// 	return ( Math.exp( x ) + Math.exp( -x ) ) / 2;
	// },
	
	// _sinhInverse: function( x )  {
	// 		return  Math.log( Math.abs( x ) + Math.sqrt( x * x + 1 ) );
	// },

    modify: function ( TxtGeometry, Txt3D, angle, center ) {

		TxtGeometry.computeBoundingBox();
		var textWidth = TxtGeometry.boundingBox.max.x - TxtGeometry.boundingBox.min.x;

		var centerbb_x = center*(TxtGeometry.boundingBox.max.x - TxtGeometry.boundingBox.min.x);
		var centerbb_y = center*(TxtGeometry.boundingBox.max.y - TxtGeometry.boundingBox.min.y);
		var centerbb_z = center*(TxtGeometry.boundingBox.max.z - TxtGeometry.boundingBox.min.z);

		// Boucle permettant de centrer le texte
		for (var i = 0; i < Txt3D.vertices.length; i++)
		{
			Txt3D.vertices[i].x = Txt3D.vertices[i].x - centerbb_x;
			Txt3D.vertices[i].y = Txt3D.vertices[i].y - centerbb_y;
			Txt3D.vertices[i].z = Txt3D.vertices[i].z - centerbb_z;
		}


		// Boucle pour courber le texte
		for (var i = 0; i < Txt3D.vertices.length; i++)
		{
			var xcurrent = Math.abs(Txt3D.vertices[i].x);

			var deplacement = -2.0*(xcurrent*xcurrent)/Txt3D.boundingBox.max.x;
			var derive = (-4.0*xcurrent)/Txt3D.boundingBox.max.x;

			Txt3D.vertices[i].y = Txt3D.vertices[i].y + angle/10*deplacement;
			// Txt3D.vertices[i].x = Txt3D.vertices[i].x - 10.0* derive;
			Txt3D.__dirtyVertices = true;
		}


		return this			
    }	
}