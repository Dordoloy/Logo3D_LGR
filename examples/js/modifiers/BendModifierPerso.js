THREE.BendModifierPerso = function()
{

};

THREE.BendModifierPerso.prototype = 
{
	set: function ( direction, axis, angle ) {
        this.direction = new THREE.Vector3(); this.direction.copy( direction );
		this.axis = new THREE.Vector3(); this.axis.copy( axis );
        this.angle = angle;
        return this
    },

	_sign: function (a) {
        return 0 > a ? -1 : 0 < a ? 1 : 0
    },

	_cosh: function( x )  {
		return ( Math.exp( x ) + Math.exp( -x ) ) / 2;
	},

	_sinhInverse: function( x )  {
			return  Math.log( Math.abs( x ) + Math.sqrt( x * x + 1 ) );
	},

	modify: function(geometry)
	{
		var thirdAxis = new THREE.Vector3();  thirdAxis.crossVectors( this.direction, this.axis );

		var P = new THREE.Matrix4();
		P.set ( thirdAxis.x, thirdAxis.y, thirdAxis.z, 0, 
			this.direction.x, this.direction.y, this.direction.z, 0, 
			this.axis.x, this.axis.y, this.axis.z, 0, 
			0, 0, 0, 1 ).transpose();

		for (var i =; i < thirdAxis.x.length; i++)
		{
			
		}

	}
}	