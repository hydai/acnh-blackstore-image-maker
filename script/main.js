var app = new Vue({
	el: "#app",
	data: {
		items: ['./resource/blackstore2.png', null, null],
		W: 1890,
		H: 1417,
		mode: 2,
		preset: {
			1: [
				[0, 0, 1890*0.8, 1417*0.8],
				[608*0.8, 527*0.8, 689*0.8, 842*0.8]],
			2: [
				[0, 0, 1890*0.8, 1417*0.8],
				[155*0.8, 527*0.8, 689*0.8, 836*0.8],
				[1087*0.8, 527*0.8, 689*0.8, 836*0.8]]
		}
	},
	updated: function () {
		this.draw();
	},
	created:function () {
		this.$nextTick(function () {
			this.draw();
		})
	},
	methods: {
		filesChange: function (id, file) {
			let self = this;
			let fileReader = new FileReader();
			fileReader.onload = function () {
				self.items[id] = this.result;
				self.draw();
			}
			fileReader.readAsDataURL(file[0]);
		},
		emit: function (imgs) {
			let self = this;
			let ctx = this.$el.querySelector("#canvas").getContext("2d");
			for (let i = 0; i <= self.mode; i++) {
				if (self.items[i] != null) {
					ctx.drawImage(
						imgs[i],
						self.preset[self.mode][i][0],
						self.preset[self.mode][i][1],
						self.preset[self.mode][i][2],
						self.preset[self.mode][i][3]);
				}
			}
		},
		rmImg: function (id) {
			let self = this;
			self.items[id] = null;
			self.draw();
		},
		flipMode: function () {
			let self = this;
			if (self.mode == 1) {
				self.mode = 2;
			} else {
				self.mode = 1;
			}
			self.draw();
		},
		draw: function () {
			let self = this;
			var counter = 0;
			var imgs = [];
			if (self.mode == 1) {
				self.items[0] = './resource/blackstore1.png';
			} else {
				self.items[0] = './resource/blackstore2.png';
			}
			for (var i = 0; i <= self.mode; i++) {
				let img = new Image();
				imgs.push(img);
				if (self.items[i] != null) {
					img.src = self.items[i];
					img.onload = function () {
						counter++;
						if (counter > self.mode) {
							self.emit(imgs);
						}
					}
				} else {
					counter++;
					if (counter > self.mode) {
						self.emit(imgs);
					}
				}
			}
		}
	}
})
