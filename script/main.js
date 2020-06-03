var app = new Vue({
	el: "#app",
	data: {
		items: ['./resource/blackstore.png', null, null],
		W: 1890,
		H: 1417,
		preset: [[0, 0, 1890*0.8, 1417*0.8], [155*0.8, 527*0.8, 689*0.8, 836*0.8], [1087*0.8, 527*0.8, 689*0.8, 836*0.8]]
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
			for (let i = 0; i < self.items.length; i++) {
				if (self.items[i] != null) {
					ctx.drawImage(imgs[i], self.preset[i][0], self.preset[i][1], self.preset[i][2], self.preset[i][3]);
				}
			}
		},
		rmImg: function (id) {
			let self = this;
			self.items[id] = null;
			self.draw();
		},
		draw: function () {
			let self = this;
			var counter = 0;
			var imgs = [];
			for (var i = 0; i < self.items.length; i++) {
				console.log("i: "+i);
				let img = new Image();
				imgs.push(img);
				if (self.items[i] != null) {
					img.src = self.items[i];
					img.onload = function () {
						counter++;
						if (counter >= self.items.length) {
							self.emit(imgs);
						}
					}
				} else {
					counter++;
					if (counter >= self.items.length) {
						self.emit(imgs);
					}
				}
			}
		},
		save: function () {
			let image = this.$el.querySelector("#canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
			window.location.href = image;
		}
	}
})
