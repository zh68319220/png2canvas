(function() {
	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
			  window.setTimeout(callback, 1000 / 60);
			};
	})();

	function Particles(x, y, c, i){
		this.x = x,
		this.y = y,
		this.cvs = document.getElementById(c),
		this.img = i,
		this.w = this.img.width,
		this.h = this.img.height,
		this.pars = [],
		this.ctx = cvs.getContext("2d");
		this.ctx.drawImage(this.img, x, y);
		this.calculate(this.ctx.getImageData(x, y, this.w, this.h));
	};
	Particles.prototype.calculate = function(imgData){
		var _data = imgData.data,
		w = this.w,
		h = this.h,
		pars = [];
		for (var i = w - 1; i >= 0; i--) {
			for (var j = h - 1; j >= 0; j--) {
				for (var k = 0; k <= 3; k++){
					if( k == 3 && _data[w*i*4 + j*4 + k]>0 ){
						if( Math.random() > 0.1 ){
							pars.push({
								fillStyle: "rgba(" + _data[w*i*4 + j*4 + 0]
											+ "," + _data[w*i*4 + j*4 + 1]
											+ "," + _data[w*i*4 + j*4 + 2] + ","
											+ _data[w*i*4 + j*4 + k] +")",
								x: i + this.x,
								y: j + this.y,
								mx: 200,
								my: 0
							});
						}
					}
				}
			}
		}
		this.pars = pars;
	};
	Particles.prototype.draw = function(){
		var pars = this.pars,
		_reach = true,
		ctx = this.ctx,
		cvs = this.cvs;

		ctx.clearRect(0, 0, cvs.width, cvs.height);
		for (var i = pars.length - 1; i >= 0; i--) {
			if( (pars[i].mx - pars[i].x)*(pars[i].mx - pars[i].x) > 1 || (pars[i].my - pars[i].y)*(pars[i].my - pars[i].y) > 1 ){
				var _move = parseInt( Math.random() * 100 ) + 1;
				pars[i].mx += (pars[i].x - pars[i].mx)/_move;
				pars[i].my += (pars[i].y - pars[i].my)/_move;
				_reach = false;
			}
			else{}
			ctx.fillStyle = pars[i].fillStyle;
			ctx.fillRect(pars[i].mx, pars[i].my, 1, 1);
		}
		if(!_reach){
			requestAnimFrame(function(){
				this.draw();
			}.bind(this));
		}
	};
	Particles.prototype.render = function(){
		requestAnimFrame(function(){
			this.draw();
		}.bind(this));
	};

	window.Particles = Particles;
})();