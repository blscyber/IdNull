var $$ = {
	ltIE9: false,
	trim: function(s) {
		return s.replace(/(^\s*)|(\s*$)/g, "");
	},
	format: function() {
		var s = arguments[0];
		for (var i = 0; i < arguments.length - 1; i++) {
			var reg = new RegExp("\\{" + i + "\\}", "gm");
			s = s.replace(reg, arguments[i + 1]);
		}
		return s;
	},

	initDetails: function() {
		$('.popsafe-open').magnificPopup({
			mainClass: 'mfp-zoom-out-small',
			removalDelay: 300,
			type: 'iframe',
			alignTop: true,
			iframe: {
				markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe mfp-with-anim" frameborder="0"></iframe>' + '</div>'
			},
			callbacks: {
				open: function() {
					$('.mfp-content').css('height', '771px');
				}
			},
			overflowY: 'auto',
			autoFocusLast: false
		});
		$("img.lazy").lazyload({
			threshold: 200
		});
		var des_height = $('.description').height();
		if (des_height > 200) {
			$('.showmore_trigger').click(function() {
				var $span = $(this).find('span');
				var $end = $(this).find('.show-more-end');
				$end.toggle();
				$span.toggleClass(function(i, c) {
					$("#describe").animate({
						height: c ? '200px' : $('.description').height() + 'px'
					}, 300);
					$span.text(c ? $$lang['SHOW_MORE'] : $$lang['SHOW_LESS']);
					return 'active';
				});
			});
			$('.showmore_trigger').show();
		}
		$('.translate-btn').click(function() {
			var o = $('#describe .content');
			var s = o.html();
			o.html(description_translation);
			description_translation = s;
		});
		ppScroll('.det-pic-out', '#prev', '#next', 'go');
		$$.initMagnificPopup($('.amagnificpopup'), 'a');
		$('#faq_box dt').click(function() {
			var elem = $(this);
			elem.children('span').toggleClass('open');
			elem.next('dd').slideToggle(250);
		});
		if (m_url) {
			if ($$.ltIE9) {
				$('#qrcode').qrcode({
					render: "table",
					width: 150,
					height: 150,
					text: m_url
				});
			} else {
				$('#qrcode').qrcode({
					width: 150,
					height: 150,
					text: m_url
				});
			}
			$('.qrcode').click(function() {
				if ($(this).hasClass('hover')) {
					$(this).attr('ga', '');
				}
				$('.qrcode').toggleClass("hover");
				$('.qrcode .zoom').toggleClass("out");
				return false;
			});
		}
		$('.version-more').click(function() {
			var p = $(this).attr('data-p');
			var vid = $(this).attr('data-vid');
			var lang = $(this).attr('data-lang');
			$('#v' + vid).html($$lang['LOADING']).show();
			$('#s' + vid).remove();
			$.ajax({
				url: '/api/www/command-version_more',
				data: {
					package: p,
					vid: vid,
					lang: lang
				},
				type: 'post',
				success: function(data) {
					if (data.error == 0) {
						$('#v' + vid).html(data.doc)
					}
				}
			});
		});
		$('.show-more-version').click(function() {
			$('.more-version').slideToggle(300);
			var $span = $(this).find('span');
			$span.toggleClass(function(i, c) {
				$span.text(c ? $$lang['SHOW_MORE'] : $$lang['SHOW_LESS']);
				return 'active';
			});
		});
		$('.pushbullet').click(function() {
			var $a = $(this);
			var tag = $a.attr('data-tag');
			var n = $a.attr('data-name');
			var p = $a.attr('data-package');
			if (tag) {
				$$.popup('https://www.pushbullet.com/channel-popup?tag=' + tag, n + ' updates', 700, 460);
			} else {
				$$.popup('/pushbullet?package=' + p, n + ' updates', 700, 460);
			}
			ga('send', 'event', 'pushbullet', 'click', p);
		});
		$('.tube .play').click(function() {
			$('.tube').html('<iframe width="100%" height="370" src="' + $(this).attr('data-src') + '" frameborder="0" allowtransparency="true" allowfullscreen></iframe>');
		});
	},
	initADAegon: function() {
		if (ad_aegon_status == 'close') {
			setTimeout(function() {
				$('#ad-aegon-side').addClass('ad-aegon-bottom-banner-animated slideInRight').show();
			}, 1000);
		} else {
			setTimeout(function() {
				$('#ad-aegon-bottom-banner').addClass('ad-aegon-bottom-banner-animated slideInUp').show();
			}, 1000);
		}
		var ad_close = function(fn) {
			$('#ad-aegon-bottom-banner').animate({
				left: $(window).width()
			}, 500, function() {
				$('#ad-aegon-bottom-banner').hide();
				$('#ad-aegon-side').addClass('ad-aegon-bottom-banner-animated slideInRight').show();
				fn();
			});
		}
		if ($('#ad-aegon-bottom-banner').length > 0) {
			if (ad_aegon_status == 'close') {} else {
				$('#ad-aegon-bottom-banner .down a').click(function() {
					$$.setCookie('ad_aegon', 'close', 7);
					$$.gaEvent($(this).attr('ga'));
					$$.gaEvent($(this).attr('ga1'));
					var href = $(this).attr('href');
					ad_close(function() {
						location.href = href;
					});
					return false;
				});
				$('#ad-aegon-bottom-banner .close a').click(function() {
					$$.setCookie('ad_aegon', 'close', 7);
					ad_close(function() {});
					return false;
				});
				$('#ad-aegon-bottom-banner .link').click(function() {
					$$.setCookie('ad_aegon', 'close', 7);
					ad_close(function() {});
					return true;
				});
			}
		}
	}
};
(function(defaults, $, window, undefined) {
	var type = ['input:not([type]),input[type="color"],input[type="date"],input[type="datetime"],input[type="datetime-local"],input[type="email"],input[type="file"],input[type="hidden"],input[type="month"],input[type="number"],input[type="password"],input[type="range"],input[type="search"],input[type="tel"],input[type="text"],input[type="time"],input[type="url"],input[type="week"],textarea', "select", 'input[type="checkbox"],input[type="radio"]'],
		allTypes = type.join(","),
		extend = {},
		validateField = function(event, options) {
			var status = {
					pattern: true,
					conditional: true,
					required: true
				},
				field = $(this),
				fieldValue = field.val() || "",
				fieldValidate = field.data("validate"),
				validation = fieldValidate !== undefined ? extend[fieldValidate] : {},
				fieldPrepare = field.data("prepare") || validation.prepare,
				fieldPattern = field.data("pattern") || ($.type(validation.pattern) == "regexp" ? validation.pattern : /(?:)/),
				fieldIgnoreCase = field.attr("data-ignore-case") || field.data("ignoreCase") || validation.ignoreCase,
				fieldMask = field.data("mask") || validation.mask,
				fieldConditional = field.data("conditional") || validation.conditional,
				fieldRequired = field.data("required"),
				fieldDescribedby = field.data("describedby") || validation.describedby,
				fieldDescription = field.data("description") || validation.description,
				fieldTrim = field.data("trim"),
				reTrue = /^(true|)$/i,
				reFalse = /^false$/i,
				fieldDescription = $.isPlainObject(fieldDescription) ? fieldDescription : options.description[fieldDescription] || {},
				name = "validate";
			fieldRequired = fieldRequired != "" ? fieldRequired || !!validation.required : true;
			fieldTrim = fieldTrim != "" ? fieldTrim || !!validation.trim : true;
			if (reTrue.test(fieldTrim)) {
				fieldValue = $.trim(fieldValue);
			}
			if ($.isFunction(fieldPrepare)) {
				fieldValue = String(fieldPrepare.call(field, fieldValue));
			} else {
				if ($.isFunction(options.prepare[fieldPrepare])) {
					fieldValue = String(options.prepare[fieldPrepare].call(field, fieldValue));
				}
			}
			if ($.type(fieldPattern) != "regexp") {
				fieldIgnoreCase = !reFalse.test(fieldIgnoreCase);
				fieldPattern = fieldIgnoreCase ? RegExp(fieldPattern, "i") : RegExp(fieldPattern);
			}
			if (fieldConditional != undefined) {
				if ($.isFunction(fieldConditional)) {
					status.conditional = !!fieldConditional.call(field, fieldValue, options);
				} else {
					var conditionals = fieldConditional.split(/[\s\t]+/);
					for (var counter = 0, len = conditionals.length; counter < len; counter++) {
						if (options.conditional.hasOwnProperty(conditionals[counter]) && !options.conditional[conditionals[counter]].call(field, fieldValue, options)) {
							status.conditional = false;
						}
					}
				}
			}
			fieldRequired = reTrue.test(fieldRequired);
			if (fieldRequired) {
				if (field.is(type[0] + "," + type[1])) {
					if (!fieldValue.length > 0) {
						status.required = false;
					}
				} else if (field.is(type[2])) {
					if (field.is("[name]")) {
						if ($('[name="' + field.prop("name") + '"]:checked').length == 0) {
							status.required = false;
						}
					} else {
						status.required = field.is(":checked");
					}
				}
			}
			if (field.is(type[0])) {
				if (fieldPattern.test(fieldValue)) {
					if (event.type != "keyup" && fieldMask !== undefined) {
						var matches = fieldValue.match(fieldPattern);
						for (var i = 0, len = matches.length; i < len; i++) {
							fieldMask = fieldMask.replace(RegExp("\\$\\{" + i + "(?::`([^`]*)`)?\\}", "g"), matches[i] !== undefined ? matches[i] : "$1");
						}
						fieldMask = fieldMask.replace(/\$\{\d+(?::`([^`]*)`)?\}/g, "$1");
						if (fieldPattern.test(fieldMask)) {
							field.val(fieldMask);
						}
					}
				} else {
					if (fieldRequired) {
						status.pattern = false;
					} else {
						if (fieldValue.length > 0) {
							status.pattern = false;
						}
					}
				}
			}
			var describedby = $('[id="' + fieldDescribedby + '"]'),
				log = fieldDescription.valid;
			if (describedby.length > 0 && event.type != "keyup") {
				if (!status.required) {
					log = fieldDescription.required;
				} else if (!status.pattern) {
					log = fieldDescription.pattern;
				} else if (!status.conditional) {
					log = fieldDescription.conditional;
				}
				describedby.html(log || "");
			}
			if (typeof validation.each == "function") {
				validation.each.call(field, event, status, options);
			}
			options.eachField.call(field, event, status, options);
			if (status.required && status.pattern && status.conditional) {
				if (!!options.waiAria) {
					field.prop("aria-invalid", false);
				}
				if (typeof validation.valid == "function") {
					validation.valid.call(field, event, status, options);
				}
				options.eachValidField.call(field, event, status, options);
			} else {
				if (!!options.waiAria) {
					field.prop("aria-invalid", true);
				}
				if (typeof validation.invalid == "function") {
					validation.invalid.call(field, event, status, options);
				}
				options.eachInvalidField.call(field, event, status, options);
			}
			return status;
		};
	$.extend({
		validateExtend: function(options) {
			return $.extend(extend, options);
		},
		validateSetup: function(options) {
			return $.extend(defaults, options);
		}
	}).fn.extend({
		validate: function(options) {
			options = $.extend({}, defaults, options);
			return $(this).validateDestroy().each(function() {
				var form = $(this);
				if (form.is("form")) {
					form.data(name, {
						options: options
					});
					var fields = form.find(allTypes),
						namespace = options.namespace;
					if (form.is("[id]")) {
						fields = fields.add('[form="' + form.prop("id") + '"]').filter(allTypes);
					}
					fields = fields.filter(options.filter);
					if (!!options.onKeyup) {
						fields.filter(type[0]).on("keyup." + namespace, function(event) {
							validateField.call(this, event, options);
						});
					}
					if (!!options.onBlur) {
						fields.on("blur." + namespace, function(event) {
							validateField.call(this, event, options);
						});
					}
					if (!!options.onChange) {
						fields.on("change." + namespace, function(event) {
							validateField.call(this, event, options);
						});
					}
					if (!!options.onSubmit) {
						form.on("submit." + namespace, function(event) {
							var formValid = true;
							fields.each(function() {
								var status = validateField.call(this, event, options);
								if (!status.pattern || !status.conditional || !status.required) {
									formValid = false;
								}
							});
							if (formValid) {
								if (!options.sendForm) {
									event.preventDefault();
								}
								if ($.isFunction(options.valid)) {
									options.valid.call(form, event, options);
								}
							} else {
								event.preventDefault();
								event.stopImmediatePropagation();
								if ($.isFunction(options.invalid)) {
									options.invalid.call(form, event, options);
								}
							}
						});
					}
				}
			});
		},
		validateDestroy: function() {
			var form = $(this),
				dataValidate = form.data(name);
			if (form.is("form") && $.isPlainObject(dataValidate) && typeof dataValidate.options.nameSpace == "string") {
				var fields = form.removeData(name).find(allTypes).add(form);
				if (form.is("[id]")) {
					fields = fields.add($('[form="' + form.prop("id") + '"]').filter(allTypes));
				}
				fields.off("." + dataValidate.options.nameSpace);
			}
			return form;
		}
	});
})({
	sendForm: true,
	waiAria: true,
	onSubmit: true,
	onKeyup: false,
	onBlur: false,
	onChange: false,
	nameSpace: "validate",
	conditional: {},
	prepare: {},
	description: {},
	eachField: $.noop,
	eachInvalidField: $.noop,
	eachValidField: $.noop,
	invalid: $.noop,
	valid: $.noop,
	filter: "*"
}, jQuery, window);

function ppScroll(o, p, n, g) {
	o = $(o);
	p = $(p);
	n = $(n);
	var ul = o.find('ul');
	var isLast = false;
	p.click(function() {
		if (!o.queue("fx").length) {
			var left = o.scrollLeft() - o.width();
			if (left <= 0) {
				p.removeClass(g).fadeTo("fast", 0);
			}
			o.animate({
				scrollLeft: left + 'px'
			});
		}
	});
	n.click(function() {
		if (!p.hasClass(g)) {
			p.addClass(g).fadeTo("fast", 1);
		}
		if (!o.queue("fx").length) {
			var left = o.scrollLeft() + o.width();
			if (isLast) {
				o.animate({
					scrollLeft: '0px'
				});
				p.removeClass(g).fadeTo("fast", 0);
				isLast = false;
			} else {
				o.animate({
					scrollLeft: left + 'px'
				});
				isLast = (left >= ul.width() - o.width());
			}
		}
	})
}
