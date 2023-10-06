Packeta = window.Packeta || {};
Packeta.Viewport = {
	element: null,
	originalValue: null,
	set: function() {
		if(!Packeta.Viewport.element) {
			Packeta.Viewport.element = document.querySelector("meta[name=viewport]");
			if(Packeta.Viewport.element) {
				Packeta.Viewport.originalValue = Packeta.Viewport.element.getAttribute("content");
			}
			else {
				Packeta.Viewport.originalValue = 'user-scalable=yes';
				Packeta.Viewport.element = document.createElement('meta');
				Packeta.Viewport.element.setAttribute("name", "viewport");
				(document.head || document.getElementsByTagName('head')[0]).appendChild(Packeta.Viewport.element);
			}
		}
		Packeta.Viewport.element.setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes');
	},
	restore: function() {
		if(Packeta.Viewport.originalValue !== null) {
			Packeta.Viewport.element.setAttribute('content', Packeta.Viewport.originalValue);
		}
	}
};
Packeta.Widget = {
	baseUrl: 'https://widget.packeta.com/',
	close: function() {},
	pick: function(apiKey, callback, opts, inElement) {
		Packeta.Widget.close();
	
		if(opts === undefined) {
			opts = {};
		}
		if(!('version' in opts)) {
			opts.version = 3;
		}
		opts.apiKey = apiKey;

		var url = Packeta.Widget.baseUrl + '#/?';
		for(i in opts) {
			url += "&" + i + "=" + encodeURIComponent(opts[i]);
		}

		var inline = (typeof(inElement) != "undefined" && inElement !== null);
		var wrapper;
		if(inline) {
			wrapper = inElement;
		}
		else {
			Packeta.Viewport.set();
			wrapper = document.createElement("div");
			wrapper.setAttribute("style", "z-index: 999999; position: fixed; -webkit-backface-visibility: hidden; left: 0; top: 0; width: 100%; height: 100%; background: " + (opts.overlayColor || "rgba(0, 0, 0, 0.3)") + "; ");
			wrapper.addEventListener("click", function() {
				Packeta.Widget.close();
			});

			// fix for some older browsers which fail to do 100% width of position:absolute inside position:fixed element
			setTimeout(
				function() {
					var rect = iframe.getBoundingClientRect();
					var width = ('width' in rect ? rect.width : rect.right - rect.left);
					if(Math.round(width) < window.innerWidth - 10) { // 10px = side padding sum, just as a safety measure
						iframe.style.width = window.innerWidth + "px";
						iframe.style.height = window.innerHeight + "px";
					}
				},
				0
			);
		}
		
		// always support Escape key immediatelly after the widget is displayed, even for inline
		wrapper.addEventListener("keyup", function(e) {
			if(e.keyCode == 27) {
				Packeta.Widget.close();
			}
		});

		var iframe = document.createElement("iframe");
		if(inline) {
			iframe.setAttribute("style", "border: hidden; width: 100%; height: 100%; ");
		}
		else {
			iframe.setAttribute("style", "border: hidden; position: absolute; left: 0; top: 0; width: 100%; height: 100%; padding: 10px 5px; box-sizing: border-box; ");
		}
		iframe.setAttribute('id', "packeta-widget");
		iframe.setAttribute('sandbox', "allow-scripts allow-same-origin");
		iframe.setAttribute('allow', "geolocation");
		iframe.setAttribute('src', url);
		
		wrapper.appendChild(iframe);
		if(!inline) {
			document.body.appendChild(wrapper);
		}

		if(wrapper.getAttribute("tabindex") === null) {
			wrapper.setAttribute("tabindex", "-1"); // make it focusable
		}
		wrapper.focus();

		var receiver = function(e) {
			// check if this is message from the Packeta Widget
			try {
				var message = JSON.parse(e.data);
				if(!message.packetaWidgetMessage) return;
			}
			catch(err) {
				return;
			}

			Packeta.Widget.close(message.packetaPoint);
		};
		window.addEventListener('message', receiver);

		Packeta.Widget.close = function(point) {
			window.removeEventListener('message', receiver);
			if(inline) {
				try {
					iframe.parentNode.removeChild(iframe);
				}
				catch(err) {
					// ignore
				}
			}
			else {
				document.body.removeChild(wrapper);
				Packeta.Viewport.restore();
			}
			callback(point || null);
			Packeta.Widget.close = function() {};
		};
	}
};
