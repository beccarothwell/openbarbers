/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
;/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
;/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);
;/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
;/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);
;/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
;/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
;/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
;/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
;/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
;/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);
;/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
;/*
 * blueimp Gallery JS 2.14.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Swipe implementation based on
 * https://github.com/bradbirdsall/Swipe
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document, DocumentTouch */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['./blueimp-helper'], factory);
    } else {
        // Browser globals:
        window.blueimp = window.blueimp || {};
        window.blueimp.Gallery = factory(
            window.blueimp.helper || window.jQuery
        );
    }
}(function ($) {
    'use strict';

    function Gallery(list, options) {
        if (document.body.style.maxHeight === undefined) {
            // document.body.style.maxHeight is undefined on IE6 and lower
            return null;
        }
        if (!this || this.options !== Gallery.prototype.options) {
            // Called as function instead of as constructor,
            // so we simply return a new instance:
            return new Gallery(list, options);
        }
        if (!list || !list.length) {
            this.console.log(
                'blueimp Gallery: No or empty list provided as first argument.',
                list
            );
            return;
        }
        this.list = list;
        this.num = list.length;
        this.initOptions(options);
        this.initialize();
    }

    $.extend(Gallery.prototype, {

        options: {
            // The Id, element or querySelector of the gallery widget:
            container: '#blueimp-gallery',
            // The tag name, Id, element or querySelector of the slides container:
            slidesContainer: 'div',
            // The tag name, Id, element or querySelector of the title element:
            titleElement: 'h3',
            // The class to add when the gallery is visible:
            displayClass: 'blueimp-gallery-display',
            // The class to add when the gallery controls are visible:
            controlsClass: 'blueimp-gallery-controls',
            // The class to add when the gallery only displays one element:
            singleClass: 'blueimp-gallery-single',
            // The class to add when the left edge has been reached:
            leftEdgeClass: 'blueimp-gallery-left',
            // The class to add when the right edge has been reached:
            rightEdgeClass: 'blueimp-gallery-right',
            // The class to add when the automatic slideshow is active:
            playingClass: 'blueimp-gallery-playing',
            // The class for all slides:
            slideClass: 'slide',
            // The slide class for loading elements:
            slideLoadingClass: 'slide-loading',
            // The slide class for elements that failed to load:
            slideErrorClass: 'slide-error',
            // The class for the content element loaded into each slide:
            slideContentClass: 'slide-content',
            // The class for the "toggle" control:
            toggleClass: 'toggle',
            // The class for the "prev" control:
            prevClass: 'prev',
            // The class for the "next" control:
            nextClass: 'next',
            // The class for the "close" control:
            closeClass: 'close',
            // The class for the "play-pause" toggle control:
            playPauseClass: 'play-pause',
            // The list object property (or data attribute) with the object type:
            typeProperty: 'type',
            // The list object property (or data attribute) with the object title:
            titleProperty: 'title',
            // The list object property (or data attribute) with the object URL:
            urlProperty: 'href',
            // The gallery listens for transitionend events before triggering the
            // opened and closed events, unless the following option is set to false:
            displayTransition: true,
            // Defines if the gallery slides are cleared from the gallery modal,
            // or reused for the next gallery initialization:
            clearSlides: true,
            // Defines if images should be stretched to fill the available space,
            // while maintaining their aspect ratio (will only be enabled for browsers
            // supporting background-size="contain", which excludes IE < 9).
            // Set to "cover", to make images cover all available space (requires
            // support for background-size="cover", which excludes IE < 9):
            stretchImages: false,
            // Toggle the controls on pressing the Return key:
            toggleControlsOnReturn: true,
            // Toggle the automatic slideshow interval on pressing the Space key:
            toggleSlideshowOnSpace: true,
            // Navigate the gallery by pressing left and right on the keyboard:
            enableKeyboardNavigation: true,
            // Close the gallery on pressing the Esc key:
            closeOnEscape: true,
            // Close the gallery when clicking on an empty slide area:
            closeOnSlideClick: true,
            // Close the gallery by swiping up or down:
            closeOnSwipeUpOrDown: true,
            // Emulate touch events on mouse-pointer devices such as desktop browsers:
            emulateTouchEvents: true,
            // Stop touch events from bubbling up to ancestor elements of the Gallery:
            stopTouchEventsPropagation: false,
            // Hide the page scrollbars: 
            hidePageScrollbars: true,
            // Stops any touches on the container from scrolling the page:
            disableScroll: true,
            // Carousel mode (shortcut for carousel specific options):
            carousel: false,
            // Allow continuous navigation, moving from last to first
            // and from first to last slide:
            continuous: true,
            // Remove elements outside of the preload range from the DOM:
            unloadElements: true,
            // Start with the automatic slideshow:
            startSlideshow: false,
            // Delay in milliseconds between slides for the automatic slideshow:
            slideshowInterval: 5000,
            // The starting index as integer.
            // Can also be an object of the given list,
            // or an equal object with the same url property:
            index: 0,
            // The number of elements to load around the current index:
            preloadRange: 2,
            // The transition speed between slide changes in milliseconds:
            transitionSpeed: 400,
            // The transition speed for automatic slide changes, set to an integer
            // greater 0 to override the default transition speed:
            slideshowTransitionSpeed: undefined,
            // The event object for which the default action will be canceled
            // on Gallery initialization (e.g. the click event to open the Gallery):
            event: undefined,
            // Callback function executed when the Gallery is initialized.
            // Is called with the gallery instance as "this" object:
            onopen: undefined,
            // Callback function executed when the Gallery has been initialized
            // and the initialization transition has been completed.
            // Is called with the gallery instance as "this" object:
            onopened: undefined,
            // Callback function executed on slide change.
            // Is called with the gallery instance as "this" object and the
            // current index and slide as arguments:
            onslide: undefined,
            // Callback function executed after the slide change transition.
            // Is called with the gallery instance as "this" object and the
            // current index and slide as arguments:
            onslideend: undefined,
            // Callback function executed on slide content load.
            // Is called with the gallery instance as "this" object and the
            // slide index and slide element as arguments:
            onslidecomplete: undefined,
            // Callback function executed when the Gallery is about to be closed.
            // Is called with the gallery instance as "this" object:
            onclose: undefined,
            // Callback function executed when the Gallery has been closed
            // and the closing transition has been completed.
            // Is called with the gallery instance as "this" object:
            onclosed: undefined
        },

        carouselOptions: {
            hidePageScrollbars: false,
            toggleControlsOnReturn: false,
            toggleSlideshowOnSpace: false,
            enableKeyboardNavigation: false,
            closeOnEscape: false,
            closeOnSlideClick: false,
            closeOnSwipeUpOrDown: false,
            disableScroll: false,
            startSlideshow: true
        },

        console: window.console && typeof window.console.log === 'function' ?
            window.console :
            {log: function () {}},

        // Detect touch, transition, transform and background-size support:
        support: (function (element) {
            var support = {
                    touch: window.ontouchstart !== undefined ||
                        (window.DocumentTouch && document instanceof DocumentTouch)
                },
                transitions = {
                    webkitTransition: {
                        end: 'webkitTransitionEnd',
                        prefix: '-webkit-'
                    },
                    MozTransition: {
                        end: 'transitionend',
                        prefix: '-moz-'
                    },
                    OTransition: {
                        end: 'otransitionend',
                        prefix: '-o-'
                    },
                    transition: {
                        end: 'transitionend',
                        prefix: ''
                    }
                },
                elementTests = function () {
                    var transition = support.transition,
                        prop,
                        translateZ;
                    document.body.appendChild(element);
                    if (transition) {
                        prop = transition.name.slice(0, -9) + 'ransform';
                        if (element.style[prop] !== undefined) {
                            element.style[prop] = 'translateZ(0)';
                            translateZ = window.getComputedStyle(element)
                                .getPropertyValue(transition.prefix + 'transform');
                            support.transform = {
                                prefix: transition.prefix,
                                name: prop,
                                translate: true,
                                translateZ: !!translateZ && translateZ !== 'none'
                            };
                        }
                    }
                    if (element.style.backgroundSize !== undefined) {
                        support.backgroundSize = {};
                        element.style.backgroundSize = 'contain';
                        support.backgroundSize.contain = window
                                .getComputedStyle(element)
                                .getPropertyValue('background-size') === 'contain';
                        element.style.backgroundSize = 'cover';
                        support.backgroundSize.cover = window
                                .getComputedStyle(element)
                                .getPropertyValue('background-size') === 'cover';
                    }
                    document.body.removeChild(element);
                };
            (function (support, transitions) {
                var prop;
                for (prop in transitions) {
                    if (transitions.hasOwnProperty(prop) &&
                            element.style[prop] !== undefined) {
                        support.transition = transitions[prop];
                        support.transition.name = prop;
                        break;
                    }
                }
            }(support, transitions));
            if (document.body) {
                elementTests();
            } else {
                $(document).on('DOMContentLoaded', elementTests);
            }
            return support;
            // Test element, has to be standard HTML and must not be hidden
            // for the CSS3 tests using window.getComputedStyle to be applicable:
        }(document.createElement('div'))),

        requestAnimationFrame: window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame,

        initialize: function () {
            this.initStartIndex();
            if (this.initWidget() === false) {
                return false;
            }
            this.initEventListeners();
            // Load the slide at the given index:
            this.onslide(this.index);
            // Manually trigger the slideend event for the initial slide:
            this.ontransitionend();
            // Start the automatic slideshow if applicable:
            if (this.options.startSlideshow) {
                this.play();
            }
        },

        slide: function (to, speed) {
            window.clearTimeout(this.timeout);
            var index = this.index,
                direction,
                naturalDirection,
                diff;
            if (index === to || this.num === 1) {
                return;
            }
            if (!speed) {
                speed = this.options.transitionSpeed;
            }
            if (this.support.transition) {
                if (!this.options.continuous) {
                    to = this.circle(to);
                }
                // 1: backward, -1: forward:
                direction = Math.abs(index - to) / (index - to);
                // Get the actual position of the slide:
                if (this.options.continuous) {
                    naturalDirection = direction;
                    direction = -this.positions[this.circle(to)] / this.slideWidth;
                    // If going forward but to < index, use to = slides.length + to
                    // If going backward but to > index, use to = -slides.length + to
                    if (direction !== naturalDirection) {
                        to = -direction * this.num + to;
                    }
                }
                diff = Math.abs(index - to) - 1;
                // Move all the slides between index and to in the right direction:
                while (diff) {
                    diff -= 1;
                    this.move(
                        this.circle((to > index ? to : index) - diff - 1),
                        this.slideWidth * direction,
                        0
                    );
                }
                to = this.circle(to);
                this.move(index, this.slideWidth * direction, speed);
                this.move(to, 0, speed);
                if (this.options.continuous) {
                    this.move(
                        this.circle(to - direction),
                        -(this.slideWidth * direction),
                        0
                    );
                }
            } else {
                to = this.circle(to);
                this.animate(index * -this.slideWidth, to * -this.slideWidth, speed);
            }
            this.onslide(to);
        },

        getIndex: function () {
            return this.index;
        },

        getNumber: function () {
            return this.num;
        },

        prev: function () {
            if (this.options.continuous || this.index) {
                this.slide(this.index - 1);
            }
        },

        next: function () {
            if (this.options.continuous || this.index < this.num - 1) {
                this.slide(this.index + 1);
            }
        },

        play: function (time) {
            var that = this;
            window.clearTimeout(this.timeout);
            this.interval = time || this.options.slideshowInterval;
            if (this.elements[this.index] > 1) {
                this.timeout = this.setTimeout(
                    (!this.requestAnimationFrame && this.slide) || function (to, speed) {
                        that.animationFrameId = that.requestAnimationFrame.call(
                            window,
                            function () {
                                that.slide(to, speed);
                            }
                        );
                    },
                    [this.index + 1, this.options.slideshowTransitionSpeed],
                    this.interval
                );
            }
            this.container.addClass(this.options.playingClass);
        },

        pause: function () {
            window.clearTimeout(this.timeout);
            this.interval = null;
            this.container.removeClass(this.options.playingClass);
        },

        add: function (list) {
            var i;
            if (!list.concat) {
                // Make a real array out of the list to add:
                list = Array.prototype.slice.call(list);
            }
            if (!this.list.concat) {
                // Make a real array out of the Gallery list:
                this.list = Array.prototype.slice.call(this.list);
            }
            this.list = this.list.concat(list);
            this.num = this.list.length;
            if (this.num > 2 && this.options.continuous === null) {
                this.options.continuous = true;
                this.container.removeClass(this.options.leftEdgeClass);
            }
            this.container
                .removeClass(this.options.rightEdgeClass)
                .removeClass(this.options.singleClass);
            for (i = this.num - list.length; i < this.num; i += 1) {
                this.addSlide(i);
                this.positionSlide(i);
            }
            this.positions.length = this.num;
            this.initSlides(true);
        },

        resetSlides: function () {
            this.slidesContainer.empty();
            this.slides = [];
        },

        handleClose: function () {
            var options = this.options;
            this.destroyEventListeners();
            // Cancel the slideshow:
            this.pause();
            this.container[0].style.display = 'none';
            this.container
                .removeClass(options.displayClass)
                .removeClass(options.singleClass)
                .removeClass(options.leftEdgeClass)
                .removeClass(options.rightEdgeClass);
            if (options.hidePageScrollbars) {
                document.body.style.overflow = this.bodyOverflowStyle;
            }
            if (this.options.clearSlides) {
                this.resetSlides();
            }
            if (this.options.onclosed) {
                this.options.onclosed.call(this);
            }
        },

        close: function () {
            var that = this,
                closeHandler = function (event) {
                    if (event.target === that.container[0]) {
                        that.container.off(
                            that.support.transition.end,
                            closeHandler
                        );
                        that.handleClose();
                    }
                };
            if (this.options.onclose) {
                this.options.onclose.call(this);
            }
            if (this.support.transition && this.options.displayTransition) {
                this.container.on(
                    this.support.transition.end,
                    closeHandler
                );
                this.container.removeClass(this.options.displayClass);
            } else {
                this.handleClose();
            }
        },

        circle: function (index) {
            // Always return a number inside of the slides index range:
            return (this.num + (index % this.num)) % this.num;
        },

        move: function (index, dist, speed) {
            this.translateX(index, dist, speed);
            this.positions[index] = dist;
        },

        translate: function (index, x, y, speed) {
            var style = this.slides[index].style,
                transition = this.support.transition,
                transform = this.support.transform;
            style[transition.name + 'Duration'] = speed + 'ms';
            style[transform.name] = 'translate(' + x + 'px, ' + y + 'px)' +
                (transform.translateZ ? ' translateZ(0)' : '');
        },

        translateX: function (index, x, speed) {
            this.translate(index, x, 0, speed);
        },

        translateY: function (index, y, speed) {
            this.translate(index, 0, y, speed);
        },

        animate: function (from, to, speed) {
            if (!speed) {
                this.slidesContainer[0].style.left = to + 'px';
                return;
            }
            var that = this,
                start = new Date().getTime(),
                timer = window.setInterval(function () {
                    var timeElap = new Date().getTime() - start;
                    if (timeElap > speed) {
                        that.slidesContainer[0].style.left = to + 'px';
                        that.ontransitionend();
                        window.clearInterval(timer);
                        return;
                    }
                    that.slidesContainer[0].style.left = (((to - from) *
                        (Math.floor((timeElap / speed) * 100) / 100)) +
                            from) + 'px';
                }, 4);
        },

        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },

        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },

        onresize: function () {
            this.initSlides(true);
        },

        onmousedown: function (event) {
            // Trigger on clicks of the left mouse button only
            // and exclude video elements:
            if (event.which && event.which === 1 &&
                    event.target.nodeName !== 'VIDEO') {
                // Preventing the default mousedown action is required
                // to make touch emulation work with Firefox:
                event.preventDefault();
                (event.originalEvent || event).touches = [{
                    pageX: event.pageX,
                    pageY: event.pageY
                }];
                this.ontouchstart(event);
            }
        },

        onmousemove: function (event) {
            if (this.touchStart) {
                (event.originalEvent || event).touches = [{
                    pageX: event.pageX,
                    pageY: event.pageY
                }];
                this.ontouchmove(event);
            }
        },

        onmouseup: function (event) {
            if (this.touchStart) {
                this.ontouchend(event);
                delete this.touchStart;
            }
        },

        onmouseout: function (event) {
            if (this.touchStart) {
                var target = event.target,
                    related = event.relatedTarget;
                if (!related || (related !== target &&
                        !$.contains(target, related))) {
                    this.onmouseup(event);
                }
            }
        },

        ontouchstart: function (event) {
            if (this.options.stopTouchEventsPropagation) {
                this.stopPropagation(event);
            }
            // jQuery doesn't copy touch event properties by default,
            // so we have to access the originalEvent object:
            var touches = (event.originalEvent || event).touches[0];
            this.touchStart = {
                // Remember the initial touch coordinates:
                x: touches.pageX,
                y: touches.pageY,
                // Store the time to determine touch duration:
                time: Date.now()
            };
            // Helper variable to detect scroll movement:
            this.isScrolling = undefined;
            // Reset delta values:
            this.touchDelta = {};
        },

        ontouchmove: function (event) {
            if (this.options.stopTouchEventsPropagation) {
                this.stopPropagation(event);
            }
            // jQuery doesn't copy touch event properties by default,
            // so we have to access the originalEvent object:
            var touches = (event.originalEvent || event).touches[0],
                scale = (event.originalEvent || event).scale,
                index = this.index,
                touchDeltaX,
                indices;
            // Ensure this is a one touch swipe and not, e.g. a pinch:
            if (touches.length > 1 || (scale && scale !== 1)) {
                return;
            }
            if (this.options.disableScroll) {
                event.preventDefault();
            }
            // Measure change in x and y coordinates:
            this.touchDelta = {
                x: touches.pageX - this.touchStart.x,
                y: touches.pageY - this.touchStart.y
            };
            touchDeltaX = this.touchDelta.x;
            // Detect if this is a vertical scroll movement (run only once per touch):
            if (this.isScrolling === undefined) {
                this.isScrolling = this.isScrolling ||
                    Math.abs(touchDeltaX) < Math.abs(this.touchDelta.y);
            }
            if (!this.isScrolling) {
                // Always prevent horizontal scroll:
                event.preventDefault();
                // Stop the slideshow:
                window.clearTimeout(this.timeout);
                if (this.options.continuous) {
                    indices = [
                        this.circle(index + 1),
                        index,
                        this.circle(index - 1)
                    ];
                } else {
                    // Increase resistance if first slide and sliding left
                    // or last slide and sliding right:
                    this.touchDelta.x = touchDeltaX =
                        touchDeltaX /
                        (((!index && touchDeltaX > 0) ||
                            (index === this.num - 1 && touchDeltaX < 0)) ?
                                (Math.abs(touchDeltaX) / this.slideWidth + 1) : 1);
                    indices = [index];
                    if (index) {
                        indices.push(index - 1);
                    }
                    if (index < this.num - 1) {
                        indices.unshift(index + 1);
                    }
                }
                while (indices.length) {
                    index = indices.pop();
                    this.translateX(index, touchDeltaX + this.positions[index], 0);
                }
            } else if (this.options.closeOnSwipeUpOrDown) {
                this.translateY(index, this.touchDelta.y + this.positions[index], 0);
            }
        },

        ontouchend: function (event) {
            if (this.options.stopTouchEventsPropagation) {
                this.stopPropagation(event);
            }
            var index = this.index,
                speed = this.options.transitionSpeed,
                slideWidth = this.slideWidth,
                isShortDuration = Number(Date.now() - this.touchStart.time) < 250,
                // Determine if slide attempt triggers next/prev slide:
                isValidSlide = (isShortDuration && Math.abs(this.touchDelta.x) > 20) ||
                    Math.abs(this.touchDelta.x) > slideWidth / 2,
                // Determine if slide attempt is past start or end:
                isPastBounds = (!index && this.touchDelta.x > 0) ||
                        (index === this.num - 1 && this.touchDelta.x < 0),
                isValidClose = !isValidSlide && this.options.closeOnSwipeUpOrDown &&
                    ((isShortDuration && Math.abs(this.touchDelta.y) > 20) ||
                        Math.abs(this.touchDelta.y) > this.slideHeight / 2),
                direction,
                indexForward,
                indexBackward,
                distanceForward,
                distanceBackward;
            if (this.options.continuous) {
                isPastBounds = false;
            }
            // Determine direction of swipe (true: right, false: left):
            direction = this.touchDelta.x < 0 ? -1 : 1;
            if (!this.isScrolling) {
                if (isValidSlide && !isPastBounds) {
                    indexForward = index + direction;
                    indexBackward = index - direction;
                    distanceForward = slideWidth * direction;
                    distanceBackward = -slideWidth * direction;
                    if (this.options.continuous) {
                        this.move(this.circle(indexForward), distanceForward, 0);
                        this.move(this.circle(index - 2 * direction), distanceBackward, 0);
                    } else if (indexForward >= 0 &&
                            indexForward < this.num) {
                        this.move(indexForward, distanceForward, 0);
                    }
                    this.move(index, this.positions[index] + distanceForward, speed);
                    this.move(
                        this.circle(indexBackward),
                        this.positions[this.circle(indexBackward)] + distanceForward,
                        speed
                    );
                    index = this.circle(indexBackward);
                    this.onslide(index);
                } else {
                    // Move back into position
                    if (this.options.continuous) {
                        this.move(this.circle(index - 1), -slideWidth, speed);
                        this.move(index, 0, speed);
                        this.move(this.circle(index + 1), slideWidth, speed);
                    } else {
                        if (index) {
                            this.move(index - 1, -slideWidth, speed);
                        }
                        this.move(index, 0, speed);
                        if (index < this.num - 1) {
                            this.move(index + 1, slideWidth, speed);
                        }
                    }
                }
            } else {
                if (isValidClose) {
                    this.close();
                } else {
                    // Move back into position
                    this.translateY(index, 0, speed);
                }
            }
        },

        ontouchcancel: function (event) {
            if (this.touchStart) {
                this.ontouchend(event);
                delete this.touchStart;
            }
        },

        ontransitionend: function (event) {
            var slide = this.slides[this.index];
            if (!event || slide === event.target) {
                if (this.interval) {
                    this.play();
                }
                this.setTimeout(
                    this.options.onslideend,
                    [this.index, slide]
                );
            }
        },

        oncomplete: function (event) {
            var target = event.target || event.srcElement,
                parent = target && target.parentNode,
                index;
            if (!target || !parent) {
                return;
            }
            index = this.getNodeIndex(parent);
            $(parent).removeClass(this.options.slideLoadingClass);
            if (event.type === 'error') {
                $(parent).addClass(this.options.slideErrorClass);
                this.elements[index] = 3; // Fail
            } else {
                this.elements[index] = 2; // Done
            }
            // Fix for IE7's lack of support for percentage max-height:
            if (target.clientHeight > this.container[0].clientHeight) {
                target.style.maxHeight = this.container[0].clientHeight;
            }
            if (this.interval && this.slides[this.index] === parent) {
                this.play();
            }
            this.setTimeout(
                this.options.onslidecomplete,
                [index, parent]
            );
        },

        onload: function (event) {
            this.oncomplete(event);
        },

        onerror: function (event) {
            this.oncomplete(event);
        },

        onkeydown: function (event) {
            switch (event.which || event.keyCode) {
            case 13: // Return
                if (this.options.toggleControlsOnReturn) {
                    this.preventDefault(event);
                    this.toggleControls();
                }
                break;
            case 27: // Esc
                if (this.options.closeOnEscape) {
                    this.close();
                }
                break;
            case 32: // Space
                if (this.options.toggleSlideshowOnSpace) {
                    this.preventDefault(event);
                    this.toggleSlideshow();
                }
                break;
            case 37: // Left
                if (this.options.enableKeyboardNavigation) {
                    this.preventDefault(event);
                    this.prev();
                }
                break;
            case 39: // Right
                if (this.options.enableKeyboardNavigation) {
                    this.preventDefault(event);
                    this.next();
                }
                break;
            }
        },

        handleClick: function (event) {
            var options = this.options,
                target = event.target || event.srcElement,
                parent = target.parentNode,
                isTarget = function (className) {
                    return $(target).hasClass(className) ||
                        $(parent).hasClass(className);
                };
            if (isTarget(options.toggleClass)) {
                // Click on "toggle" control
                this.preventDefault(event);
                this.toggleControls();
            } else if (isTarget(options.prevClass)) {
                // Click on "prev" control
                this.preventDefault(event);
                this.prev();
            } else if (isTarget(options.nextClass)) {
                // Click on "next" control
                this.preventDefault(event);
                this.next();
            } else if (isTarget(options.closeClass)) {
                // Click on "close" control
                this.preventDefault(event);
                this.close();
            } else if (isTarget(options.playPauseClass)) {
                // Click on "play-pause" control
                this.preventDefault(event);
                this.toggleSlideshow();
            } else if (parent === this.slidesContainer[0]) {
                // Click on slide background
                this.preventDefault(event);
                if (options.closeOnSlideClick) {
                    this.close();
                } else {
                    this.toggleControls();
                }
            } else if (parent.parentNode &&
                    parent.parentNode === this.slidesContainer[0]) {
                // Click on displayed element
                this.preventDefault(event);
                this.toggleControls();
            }
        },

        onclick: function (event) {
            if (this.options.emulateTouchEvents &&
                    this.touchDelta && (Math.abs(this.touchDelta.x) > 20 ||
                        Math.abs(this.touchDelta.y) > 20)) {
                delete this.touchDelta;
                return;
            }
            return this.handleClick(event);
        },

        updateEdgeClasses: function (index) {
            if (!index) {
                this.container.addClass(this.options.leftEdgeClass);
            } else {
                this.container.removeClass(this.options.leftEdgeClass);
            }
            if (index === this.num - 1) {
                this.container.addClass(this.options.rightEdgeClass);
            } else {
                this.container.removeClass(this.options.rightEdgeClass);
            }
        },

        handleSlide: function (index) {
            if (!this.options.continuous) {
                this.updateEdgeClasses(index);
            }
            this.loadElements(index);
            if (this.options.unloadElements) {
                this.unloadElements(index);
            }
            this.setTitle(index);
        },

        onslide: function (index) {
            this.index = index;
            this.handleSlide(index);
            this.setTimeout(this.options.onslide, [index, this.slides[index]]);
        },

        setTitle: function (index) {
            var text = this.slides[index].firstChild.title,
                titleElement = this.titleElement;
            if (titleElement.length) {
                this.titleElement.empty();
                if (text) {
                    titleElement[0].appendChild(document.createTextNode(text));
                }
            }
        },

        setTimeout: function (func, args, wait) {
            var that = this;
            return func && window.setTimeout(function () {
                func.apply(that, args || []);
            }, wait || 0);
        },

        imageFactory: function (obj, callback) {
            var that = this,
                img = this.imagePrototype.cloneNode(false),
                url = obj,
                backgroundSize = this.options.stretchImages,
                called,
                element,
                callbackWrapper = function (event) {
                    if (!called) {
                        event = {
                            type: event.type,
                            target: element
                        };
                        if (!element.parentNode) {
                            // Fix for IE7 firing the load event for
                            // cached images before the element could
                            // be added to the DOM:
                            return that.setTimeout(callbackWrapper, [event]);
                        }
                        called = true;
                        $(img).off('load error', callbackWrapper);
                        if (backgroundSize) {
                            if (event.type === 'load') {
                                element.style.background = 'url("' + url +
                                    '") center no-repeat';
                                element.style.backgroundSize = backgroundSize;
                            }
                        }
                        callback(event);
                    }
                },
                title;
            if (typeof url !== 'string') {
                url = this.getItemProperty(obj, this.options.urlProperty);
                title = this.getItemProperty(obj, this.options.titleProperty);
            }
            if (backgroundSize === true) {
                backgroundSize = 'contain';
            }
            backgroundSize = this.support.backgroundSize &&
                this.support.backgroundSize[backgroundSize] && backgroundSize;
            if (backgroundSize) {
                element = this.elementPrototype.cloneNode(false);
            } else {
                element = img;
                img.draggable = false;
            }
            if (title) {
                element.title = title;
            }
            $(img).on('load error', callbackWrapper);
            img.src = url;
            return element;
        },

        createElement: function (obj, callback) {
            var type = obj && this.getItemProperty(obj, this.options.typeProperty),
                factory = (type && this[type.split('/')[0] + 'Factory']) ||
                    this.imageFactory,
                element = obj && factory.call(this, obj, callback);
            if (!element) {
                element = this.elementPrototype.cloneNode(false);
                this.setTimeout(callback, [{
                    type: 'error',
                    target: element
                }]);
            }
            $(element).addClass(this.options.slideContentClass);
            return element;
        },

        loadElement: function (index) {
            if (!this.elements[index]) {
                if (this.slides[index].firstChild) {
                    this.elements[index] = $(this.slides[index])
                        .hasClass(this.options.slideErrorClass) ? 3 : 2;
                } else {
                    this.elements[index] = 1; // Loading
                    $(this.slides[index]).addClass(this.options.slideLoadingClass);
                    this.slides[index].appendChild(this.createElement(
                        this.list[index],
                        this.proxyListener
                    ));
                }
            }
        },

        loadElements: function (index) {
            var limit = Math.min(this.num, this.options.preloadRange * 2 + 1),
                j = index,
                i;
            for (i = 0; i < limit; i += 1) {
                // First load the current slide element (0),
                // then the next one (+1),
                // then the previous one (-2),
                // then the next after next (+2), etc.:
                j += i * (i % 2 === 0 ? -1 : 1);
                // Connect the ends of the list to load slide elements for
                // continuous navigation:
                j = this.circle(j);
                this.loadElement(j);
            }
        },

        unloadElements: function (index) {
            var i,
                slide,
                diff;
            for (i in this.elements) {
                if (this.elements.hasOwnProperty(i)) {
                    diff = Math.abs(index - i);
                    if (diff > this.options.preloadRange &&
                            diff + this.options.preloadRange < this.num) {
                        slide = this.slides[i];
                        slide.removeChild(slide.firstChild);
                        delete this.elements[i];
                    }
                }
            }
        },

        addSlide: function (index) {
            var slide = this.slidePrototype.cloneNode(false);
            slide.setAttribute('data-index', index);
            this.slidesContainer[0].appendChild(slide);
            this.slides.push(slide);
        },

        positionSlide: function (index) {
            var slide = this.slides[index];
            slide.style.width = this.slideWidth + 'px';
            if (this.support.transition) {
                slide.style.left = (index * -this.slideWidth) + 'px';
                this.move(index, this.index > index ? -this.slideWidth :
                        (this.index < index ? this.slideWidth : 0), 0);
            }
        },

        initSlides: function (reload) {
            var clearSlides,
                i;
            if (!reload) {
                this.positions = [];
                this.positions.length = this.num;
                this.elements = {};
                this.imagePrototype = document.createElement('img');
                this.elementPrototype = document.createElement('div');
                this.slidePrototype = document.createElement('div');
                $(this.slidePrototype).addClass(this.options.slideClass);
                this.slides = this.slidesContainer[0].children;
                clearSlides = this.options.clearSlides ||
                    this.slides.length !== this.num;
            }
            this.slideWidth = this.container[0].offsetWidth;
            this.slideHeight = this.container[0].offsetHeight;
            this.slidesContainer[0].style.width =
                (this.num * this.slideWidth) + 'px';
            if (clearSlides) {
                this.resetSlides();
            }
            for (i = 0; i < this.num; i += 1) {
                if (clearSlides) {
                    this.addSlide(i);
                }
                this.positionSlide(i);
            }
            // Reposition the slides before and after the given index:
            if (this.options.continuous && this.support.transition) {
                this.move(this.circle(this.index - 1), -this.slideWidth, 0);
                this.move(this.circle(this.index + 1), this.slideWidth, 0);
            }
            if (!this.support.transition) {
                this.slidesContainer[0].style.left =
                    (this.index * -this.slideWidth) + 'px';
            }
        },

        toggleControls: function () {
            var controlsClass = this.options.controlsClass;
            if (this.container.hasClass(controlsClass)) {
                this.container.removeClass(controlsClass);
            } else {
                this.container.addClass(controlsClass);
            }
        },

        toggleSlideshow: function () {
            if (!this.interval) {
                this.play();
            } else {
                this.pause();
            }
        },

        getNodeIndex: function (element) {
            return parseInt(element.getAttribute('data-index'), 10);
        },

        getNestedProperty: function (obj, property) {
            property.replace(
                // Matches native JavaScript notation in a String,
                // e.g. '["doubleQuoteProp"].dotProp[2]'
                /\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,
                function (str, singleQuoteProp, doubleQuoteProp, arrayIndex, dotProp) {
                    var prop = dotProp || singleQuoteProp || doubleQuoteProp ||
                            (arrayIndex && parseInt(arrayIndex, 10));
                    if (str && obj) {
                        obj = obj[prop];
                    }
                }
            );
            return obj;
        },

        getDataProperty: function (obj, property) {
            if (obj.getAttribute) {
                var prop = obj.getAttribute('data-' +
                        property.replace(/([A-Z])/g, '-$1').toLowerCase());
                if (typeof prop === 'string') {
                    if (/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/
                            .test(prop)) {
                        try {
                            return $.parseJSON(prop);
                        } catch (ignore) {}
                    }
                    return prop;
                }
            }
        },

        getItemProperty: function (obj, property) {
            var prop = obj[property];
            if (prop === undefined) {
                prop = this.getDataProperty(obj, property);
                if (prop === undefined) {
                    prop = this.getNestedProperty(obj, property);
                }
            }
            return prop;
        },

        initStartIndex: function () {
            var index = this.options.index,
                urlProperty = this.options.urlProperty,
                i;
            // Check if the index is given as a list object:
            if (index && typeof index !== 'number') {
                for (i = 0; i < this.num; i += 1) {
                    if (this.list[i] === index ||
                            this.getItemProperty(this.list[i], urlProperty) ===
                                this.getItemProperty(index, urlProperty)) {
                        index  = i;
                        break;
                    }
                }
            }
            // Make sure the index is in the list range:
            this.index = this.circle(parseInt(index, 10) || 0);
        },

        initEventListeners: function () {
            var that = this,
                slidesContainer = this.slidesContainer,
                proxyListener = function (event) {
                    var type = that.support.transition &&
                            that.support.transition.end === event.type ?
                                    'transitionend' : event.type;
                    that['on' + type](event);
                };
            $(window).on('resize', proxyListener);
            $(document.body).on('keydown', proxyListener);
            this.container.on('click', proxyListener);
            if (this.support.touch) {
                slidesContainer
                    .on('touchstart touchmove touchend touchcancel', proxyListener);
            } else if (this.options.emulateTouchEvents &&
                    this.support.transition) {
                slidesContainer
                    .on('mousedown mousemove mouseup mouseout', proxyListener);
            }
            if (this.support.transition) {
                slidesContainer.on(
                    this.support.transition.end,
                    proxyListener
                );
            }
            this.proxyListener = proxyListener;
        },

        destroyEventListeners: function () {
            var slidesContainer = this.slidesContainer,
                proxyListener = this.proxyListener;
            $(window).off('resize', proxyListener);
            $(document.body).off('keydown', proxyListener);
            this.container.off('click', proxyListener);
            if (this.support.touch) {
                slidesContainer
                    .off('touchstart touchmove touchend touchcancel', proxyListener);
            } else if (this.options.emulateTouchEvents &&
                    this.support.transition) {
                slidesContainer
                    .off('mousedown mousemove mouseup mouseout', proxyListener);
            }
            if (this.support.transition) {
                slidesContainer.off(
                    this.support.transition.end,
                    proxyListener
                );
            }
        },

        handleOpen: function () {
            if (this.options.onopened) {
                this.options.onopened.call(this);
            }
        },

        initWidget: function () {
            var that = this,
                openHandler = function (event) {
                    if (event.target === that.container[0]) {
                        that.container.off(
                            that.support.transition.end,
                            openHandler
                        );
                        that.handleOpen();
                    }
                };
            this.container = $(this.options.container);
            if (!this.container.length) {
                this.console.log(
                    'blueimp Gallery: Widget container not found.',
                    this.options.container
                );
                return false;
            }
            this.slidesContainer = this.container.find(
                this.options.slidesContainer
            ).first();
            if (!this.slidesContainer.length) {
                this.console.log(
                    'blueimp Gallery: Slides container not found.',
                    this.options.slidesContainer
                );
                return false;
            }
            this.titleElement = this.container.find(
                this.options.titleElement
            ).first();
            if (this.num === 1) {
                this.container.addClass(this.options.singleClass);
            }
            if (this.options.onopen) {
                this.options.onopen.call(this);
            }
            if (this.support.transition && this.options.displayTransition) {
                this.container.on(
                    this.support.transition.end,
                    openHandler
                );
            } else {
                this.handleOpen();
            }
            if (this.options.hidePageScrollbars) {
                // Hide the page scrollbars:
                this.bodyOverflowStyle = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            }
            this.container[0].style.display = 'block';
            this.initSlides();
            this.container.addClass(this.options.displayClass);
        },

        initOptions: function (options) {
            // Create a copy of the prototype options:
            this.options = $.extend({}, this.options);
            // Check if carousel mode is enabled:
            if ((options && options.carousel) ||
                    (this.options.carousel && (!options || options.carousel !== false))) {
                $.extend(this.options, this.carouselOptions);
            }
            // Override any given options:
            $.extend(this.options, options);
            if (this.num < 3) {
                // 1 or 2 slides cannot be displayed continuous,
                // remember the original option by setting to null instead of false:
                this.options.continuous = this.options.continuous ? null : false;
            }
            if (!this.support.transition) {
                this.options.emulateTouchEvents = false;
            }
            if (this.options.event) {
                this.preventDefault(this.options.event);
            }
        }

    });

    return Gallery;
}));
;/*
 * blueimp Gallery Fullscreen JS 1.2.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            './blueimp-helper',
            './blueimp-gallery'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.blueimp.helper || window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    $.extend(Gallery.prototype.options, {
        // Defines if the gallery should open in fullscreen mode:
        fullScreen: false
    });

    var initialize = Gallery.prototype.initialize,
        close = Gallery.prototype.close;

    $.extend(Gallery.prototype, {

        getFullScreenElement: function () {
            return document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement;
        },

        requestFullScreen: function (element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        },

        exitFullScreen: function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        },

        initialize: function () {
            initialize.call(this);
            if (this.options.fullScreen && !this.getFullScreenElement()) {
                this.requestFullScreen(this.container[0]);
            }
        },

        close: function () {
            if (this.getFullScreenElement() === this.container[0]) {
                this.exitFullScreen();
            }
            close.call(this);
        }

    });

    return Gallery;
}));
;/*
 * blueimp Gallery Indicator JS 1.1.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            './blueimp-helper',
            './blueimp-gallery'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.blueimp.helper || window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    $.extend(Gallery.prototype.options, {
        // The tag name, Id, element or querySelector of the indicator container:
        indicatorContainer: 'ol',
        // The class for the active indicator:
        activeIndicatorClass: 'active',
        // The list object property (or data attribute) with the thumbnail URL,
        // used as alternative to a thumbnail child element:
        thumbnailProperty: 'thumbnail',
        // Defines if the gallery indicators should display a thumbnail:
        thumbnailIndicators: true
    });

    var initSlides = Gallery.prototype.initSlides,
        addSlide = Gallery.prototype.addSlide,
        resetSlides = Gallery.prototype.resetSlides,
        handleClick = Gallery.prototype.handleClick,
        handleSlide = Gallery.prototype.handleSlide,
        handleClose = Gallery.prototype.handleClose;

    $.extend(Gallery.prototype, {

        createIndicator: function (obj) {
            var indicator = this.indicatorPrototype.cloneNode(false),
                title = this.getItemProperty(obj, this.options.titleProperty),
                thumbnailProperty = this.options.thumbnailProperty,
                thumbnailUrl,
                thumbnail;
            if (this.options.thumbnailIndicators) {
                thumbnail = obj.getElementsByTagName && $(obj).find('img')[0];
                if (thumbnail) {
                    thumbnailUrl = thumbnail.src;
                } else if (thumbnailProperty) {
                    thumbnailUrl = this.getItemProperty(obj, thumbnailProperty);
                }
                if (thumbnailUrl) {
                    indicator.style.backgroundImage = 'url("' + thumbnailUrl + '")';
                }
            }
            if (title) {
                indicator.title = title;
            }
            return indicator;
        },

        addIndicator: function (index) {
            if (this.indicatorContainer.length) {
                var indicator = this.createIndicator(this.list[index]);
                indicator.setAttribute('data-index', index);
                this.indicatorContainer[0].appendChild(indicator);
                this.indicators.push(indicator);
            }
        },

        setActiveIndicator: function (index) {
            if (this.indicators) {
                if (this.activeIndicator) {
                    this.activeIndicator
                        .removeClass(this.options.activeIndicatorClass);
                }
                this.activeIndicator = $(this.indicators[index]);
                this.activeIndicator
                    .addClass(this.options.activeIndicatorClass);
            }
        },

        initSlides: function (reload) {
            if (!reload) {
                this.indicatorContainer = this.container.find(
                    this.options.indicatorContainer
                );
                if (this.indicatorContainer.length) {
                    this.indicatorPrototype = document.createElement('li');
                    this.indicators = this.indicatorContainer[0].children;
                }
            }
            initSlides.call(this, reload);
        },

        addSlide: function (index) {
            addSlide.call(this, index);
            this.addIndicator(index);
        },

        resetSlides: function () {
            resetSlides.call(this);
            this.indicatorContainer.empty();
            this.indicators = [];
        },

        handleClick: function (event) {
            var target = event.target || event.srcElement,
                parent = target.parentNode;
            if (parent === this.indicatorContainer[0]) {
                // Click on indicator element
                this.preventDefault(event);
                this.slide(this.getNodeIndex(target));
            } else if (parent.parentNode === this.indicatorContainer[0]) {
                // Click on indicator child element
                this.preventDefault(event);
                this.slide(this.getNodeIndex(parent));
            } else {
                return handleClick.call(this, event);
            }
        },

        handleSlide: function (index) {
            handleSlide.call(this, index);
            this.setActiveIndicator(index);
        },

        handleClose: function () {
            if (this.activeIndicator) {
                this.activeIndicator
                    .removeClass(this.options.activeIndicatorClass);
            }
            handleClose.call(this);
        }

    });

    return Gallery;
}));
;/*
 * blueimp Gallery Video Factory JS 1.1.1
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            './blueimp-helper',
            './blueimp-gallery'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.blueimp.helper || window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    $.extend(Gallery.prototype.options, {
        // The class for video content elements:
        videoContentClass: 'video-content',
        // The class for video when it is loading:
        videoLoadingClass: 'video-loading',
        // The class for video when it is playing:
        videoPlayingClass: 'video-playing',
        // The list object property (or data attribute) for the video poster URL:
        videoPosterProperty: 'poster',
        // The list object property (or data attribute) for the video sources array:
        videoSourcesProperty: 'sources'
    });

    var handleSlide = Gallery.prototype.handleSlide;

    $.extend(Gallery.prototype, {

        handleSlide: function (index) {
            handleSlide.call(this, index);
            if (this.playingVideo) {
                this.playingVideo.pause();
            }
        },

        videoFactory: function (obj, callback, videoInterface) {
            var that = this,
                options = this.options,
                videoContainerNode = this.elementPrototype.cloneNode(false),
                videoContainer = $(videoContainerNode),
                errorArgs = [{
                    type: 'error',
                    target: videoContainerNode
                }],
                video = videoInterface || document.createElement('video'),
                url = this.getItemProperty(obj, options.urlProperty),
                type = this.getItemProperty(obj, options.typeProperty),
                title = this.getItemProperty(obj, options.titleProperty),
                posterUrl = this.getItemProperty(obj, options.videoPosterProperty),
                posterImage,
                sources = this.getItemProperty(
                    obj,
                    options.videoSourcesProperty
                ),
                source,
                playMediaControl,
                isLoading,
                hasControls;
            videoContainer.addClass(options.videoContentClass);
            if (title) {
                videoContainerNode.title = title;
            }
            if (video.canPlayType) {
                if (url && type && video.canPlayType(type)) {
                    video.src = url;
                } else {
                    while (sources && sources.length) {
                        source = sources.shift();
                        url = this.getItemProperty(source, options.urlProperty);
                        type = this.getItemProperty(source, options.typeProperty);
                        if (url && type && video.canPlayType(type)) {
                            video.src = url;
                            break;
                        }
                    }
                }
            }
            if (posterUrl) {
                video.poster = posterUrl;
                posterImage = this.imagePrototype.cloneNode(false);
                $(posterImage).addClass(options.toggleClass);
                posterImage.src = posterUrl;
                posterImage.draggable = false;
                videoContainerNode.appendChild(posterImage);
            }
            playMediaControl = document.createElement('a');
            playMediaControl.setAttribute('target', '_blank');
            if (!videoInterface) {
                playMediaControl.setAttribute('download', title);
            }
            playMediaControl.href = url;
            if (video.src) {
                video.controls = true;
                (videoInterface || $(video))
                    .on('error', function () {
                        that.setTimeout(callback, errorArgs);
                    })
                    .on('pause', function () {
                        isLoading = false;
                        videoContainer
                            .removeClass(that.options.videoLoadingClass)
                            .removeClass(that.options.videoPlayingClass);
                        if (hasControls) {
                            that.container.addClass(that.options.controlsClass);
                        }
                        delete that.playingVideo;
                        if (that.interval) {
                            that.play();
                        }
                    })
                    .on('playing', function () {
                        isLoading = false;
                        videoContainer
                            .removeClass(that.options.videoLoadingClass)
                            .addClass(that.options.videoPlayingClass);
                        if (that.container.hasClass(that.options.controlsClass)) {
                            hasControls = true;
                            that.container.removeClass(that.options.controlsClass);
                        } else {
                            hasControls = false;
                        }
                    })
                    .on('play', function () {
                        window.clearTimeout(that.timeout);
                        isLoading = true;
                        videoContainer.addClass(that.options.videoLoadingClass);
                        that.playingVideo = video;
                    });
                $(playMediaControl).on('click', function (event) {
                    that.preventDefault(event);
                    if (isLoading) {
                        video.pause();
                    } else {
                        video.play();
                    }
                });
                videoContainerNode.appendChild(
                    (videoInterface && videoInterface.element) || video
                );
            }
            videoContainerNode.appendChild(playMediaControl);
            this.setTimeout(callback, [{
                type: 'load',
                target: videoContainerNode
            }]);
            return videoContainerNode;
        }
    });

    return Gallery;
}));
;/*
 * blueimp Gallery Vimeo Video Factory JS 1.2.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document, location, $f */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            './blueimp-helper',
            './blueimp-gallery-video'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.blueimp.helper || window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    if (!window.postMessage) {
        return Gallery;
    }

    $.extend(Gallery.prototype.options, {
        // The list object property (or data attribute) with the Vimeo video id:
        vimeoVideoIdProperty: 'vimeo',
        // The URL for the Vimeo video player, can be extended with custom parameters:
        // https://developer.vimeo.com/player/embedding
        vimeoPlayerUrl: '//player.vimeo.com/video/VIDEO_ID?api=1&player_id=PLAYER_ID',
        // The prefix for the Vimeo video player ID:
        vimeoPlayerIdPrefix: 'vimeo-player-',
        // Require a click on the native Vimeo player for the initial playback:
        vimeoClickToPlay: true
    });

    var textFactory = Gallery.prototype.textFactory || Gallery.prototype.imageFactory,
        VimeoPlayer = function (url, videoId, playerId, clickToPlay) {
            this.url = url;
            this.videoId = videoId;
            this.playerId = playerId;
            this.clickToPlay = clickToPlay;
            this.element = document.createElement('div');
            this.listeners = {};
        },
        counter = 0;

    $.extend(VimeoPlayer.prototype, {

        canPlayType: function () {
            return true;
        },

        on: function (type, func) {
            this.listeners[type] = func;
            return this;
        },

        loadAPI: function () {
            var that = this,
                apiUrl = '//' + (location.protocol === 'https' ? 'secure-' : '') +
                    'a.vimeocdn.com/js/froogaloop2.min.js',
                scriptTags = document.getElementsByTagName('script'),
                i = scriptTags.length,
                scriptTag,
                called,
                callback = function () {
                    if (!called && that.playOnReady) {
                        that.play();
                    }
                    called = true;
                };
            while (i) {
                i -= 1;
                if (scriptTags[i].src === apiUrl) {
                    scriptTag = scriptTags[i];
                    break;
                }
            }
            if (!scriptTag) {
                scriptTag = document.createElement('script');
                scriptTag.src = apiUrl;
            }
            $(scriptTag).on('load', callback);
            scriptTags[0].parentNode.insertBefore(scriptTag, scriptTags[0]);
            // Fix for cached scripts on IE 8:
            if (/loaded|complete/.test(scriptTag.readyState)) {
                callback();
            }
        },

        onReady: function () {
            var that = this;
            this.ready = true;
            this.player.addEvent('play', function () {
                that.hasPlayed = true;
                that.onPlaying();
            });
            this.player.addEvent('pause', function () {
                that.onPause();
            });
            this.player.addEvent('finish', function () {
                that.onPause();
            });
            if (this.playOnReady) {
                this.play();
            }
        },

        onPlaying: function () {
            if (this.playStatus < 2) {
                this.listeners.playing();
                this.playStatus = 2;
            }
        },

        onPause: function () {
            this.listeners.pause();
            delete this.playStatus;
        },

        insertIframe: function () {
            var iframe = document.createElement('iframe');
            iframe.src = this.url
                .replace('VIDEO_ID', this.videoId)
                .replace('PLAYER_ID', this.playerId);
            iframe.id = this.playerId;
            this.element.parentNode.replaceChild(iframe, this.element);
            this.element = iframe;
        },

        play: function () {
            var that = this;
            if (!this.playStatus) {
                this.listeners.play();
                this.playStatus = 1;
            }
            if (this.ready) {
                if (!this.hasPlayed && (this.clickToPlay || (window.navigator &&
                        /iP(hone|od|ad)/.test(window.navigator.platform)))) {
                    // Manually trigger the playing callback if clickToPlay
                    // is enabled and to workaround a limitation in iOS,
                    // which requires synchronous user interaction to start
                    // the video playback:
                    this.onPlaying();
                } else {
                    this.player.api('play');
                }
            } else {
                this.playOnReady = true;
                if (!window.$f) {
                    this.loadAPI();
                } else if (!this.player) {
                    this.insertIframe();
                    this.player = $f(this.element);
                    this.player.addEvent('ready', function () {
                        that.onReady();
                    });
                }
            }
        },

        pause: function () {
            if (this.ready) {
                this.player.api('pause');
            } else if (this.playStatus) {
                delete this.playOnReady;
                this.listeners.pause();
                delete this.playStatus;
            }
        }

    });

    $.extend(Gallery.prototype, {

        VimeoPlayer: VimeoPlayer,

        textFactory: function (obj, callback) {
            var options = this.options,
                videoId = this.getItemProperty(obj, options.vimeoVideoIdProperty);
            if (videoId) {
                if (this.getItemProperty(obj, options.urlProperty) === undefined) {
                    obj[options.urlProperty] = '//vimeo.com/' + videoId;
                }
                counter += 1;
                return this.videoFactory(
                    obj,
                    callback,
                    new VimeoPlayer(
                        options.vimeoPlayerUrl,
                        videoId,
                        options.vimeoPlayerIdPrefix + counter,
                        options.vimeoClickToPlay
                    )
                );
            }
            return textFactory.call(this, obj, callback);
        }

    });

    return Gallery;
}));
;/*
 * blueimp Gallery YouTube Video Factory JS 1.2.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document, YT */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            './blueimp-helper',
            './blueimp-gallery-video'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.blueimp.helper || window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    if (!window.postMessage) {
        return Gallery;
    }

    $.extend(Gallery.prototype.options, {
        // The list object property (or data attribute) with the YouTube video id:
        youTubeVideoIdProperty: 'youtube',
        // Optional object with parameters passed to the YouTube video player:
        // https://developers.google.com/youtube/player_parameters
        youTubePlayerVars: {
            wmode: 'transparent'
        },
        // Require a click on the native YouTube player for the initial playback:
        youTubeClickToPlay: true
    });

    var textFactory = Gallery.prototype.textFactory || Gallery.prototype.imageFactory,
        YouTubePlayer = function (videoId, playerVars, clickToPlay) {
            this.videoId = videoId;
            this.playerVars = playerVars;
            this.clickToPlay = clickToPlay;
            this.element = document.createElement('div');
            this.listeners = {};
        };

    $.extend(YouTubePlayer.prototype, {

        canPlayType: function () {
            return true;
        },

        on: function (type, func) {
            this.listeners[type] = func;
            return this;
        },

        loadAPI: function () {
            var that = this,
                onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady,
                apiUrl = '//www.youtube.com/iframe_api',
                scriptTags = document.getElementsByTagName('script'),
                i = scriptTags.length,
                scriptTag;
            window.onYouTubeIframeAPIReady = function () {
                if (onYouTubeIframeAPIReady) {
                    onYouTubeIframeAPIReady.apply(this);
                }
                if (that.playOnReady) {
                    that.play();
                }
            };
            while (i) {
                i -= 1;
                if (scriptTags[i].src === apiUrl) {
                    return;
                }
            }
            scriptTag = document.createElement('script');
            scriptTag.src = apiUrl;
            scriptTags[0].parentNode.insertBefore(scriptTag, scriptTags[0]);
        },

        onReady: function () {
            this.ready = true;
            if (this.playOnReady) {
                this.play();
            }
        },

        onPlaying: function () {
            if (this.playStatus < 2) {
                this.listeners.playing();
                this.playStatus = 2;
            }
        },

        onPause: function () {
            Gallery.prototype.setTimeout.call(
                this,
                this.checkSeek,
                null,
                2000
            );
        },

        checkSeek: function () {
            if (this.stateChange === YT.PlayerState.PAUSED ||
                    this.stateChange === YT.PlayerState.ENDED) {
                // check if current state change is actually paused
                this.listeners.pause();
                delete this.playStatus;
            }
        },

        onStateChange: function (event) {
            switch (event.data) {
            case YT.PlayerState.PLAYING:
                this.hasPlayed = true;
                this.onPlaying();
                break;
            case YT.PlayerState.PAUSED:
            case YT.PlayerState.ENDED:
                this.onPause();
                break;
            }
            // Save most recent state change to this.stateChange
            this.stateChange = event.data;
        },

        onError: function (event) {
            this.listeners.error(event);
        },

        play: function () {
            var that = this;
            if (!this.playStatus) {
                this.listeners.play();
                this.playStatus = 1;
            }
            if (this.ready) {
                if (!this.hasPlayed && (this.clickToPlay || (window.navigator &&
                        /iP(hone|od|ad)/.test(window.navigator.platform)))) {
                    // Manually trigger the playing callback if clickToPlay
                    // is enabled and to workaround a limitation in iOS,
                    // which requires synchronous user interaction to start
                    // the video playback:
                    this.onPlaying();
                } else {
                    this.player.playVideo();
                }
            } else {
                this.playOnReady = true;
                if (!(window.YT && YT.Player)) {
                    this.loadAPI();
                } else if (!this.player) {
                    this.player = new YT.Player(this.element, {
                        videoId: this.videoId,
                        playerVars: this.playerVars,
                        events: {
                            onReady: function () {
                                that.onReady();
                            },
                            onStateChange: function (event) {
                                that.onStateChange(event);
                            },
                            onError: function (event) {
                                that.onError(event);
                            }
                        }
                    });
                }
            }
        },

        pause: function () {
            if (this.ready) {
                this.player.pauseVideo();
            } else if (this.playStatus) {
                delete this.playOnReady;
                this.listeners.pause();
                delete this.playStatus;
            }
        }

    });

    $.extend(Gallery.prototype, {

        YouTubePlayer: YouTubePlayer,

        textFactory: function (obj, callback) {
            var options = this.options,
                videoId = this.getItemProperty(obj, options.youTubeVideoIdProperty);
            if (videoId) {
                if (this.getItemProperty(obj, options.urlProperty) === undefined) {
                    obj[options.urlProperty] = '//www.youtube.com/watch?v=' + videoId;
                }
                if (this.getItemProperty(obj, options.videoPosterProperty) === undefined) {
                    obj[options.videoPosterProperty] = '//img.youtube.com/vi/' + videoId +
                        '/maxresdefault.jpg';
                }
                return this.videoFactory(
                    obj,
                    callback,
                    new YouTubePlayer(
                        videoId,
                        options.youTubePlayerVars,
                        options.youTubeClickToPlay
                    )
                );
            }
            return textFactory.call(this, obj, callback);
        }

    });

    return Gallery;
}));
;/*
 * blueimp Gallery jQuery plugin 1.2.2
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([
            'jquery',
            './blueimp-gallery'
        ], factory);
    } else {
        factory(
            window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    // Global click handler to open links with data-gallery attribute
    // in the Gallery lightbox:
    $(document).on('click', '[data-gallery]', function (event) {
        // Get the container id from the data-gallery attribute:
        var id = $(this).data('gallery'),
            widget = $(id),
            container = (widget.length && widget) ||
                $(Gallery.prototype.options.container),
            callbacks = {
                onopen: function () {
                    container
                        .data('gallery', this)
                        .trigger('open');
                },
                onopened: function () {
                    container.trigger('opened');
                },
                onslide: function () {
                    container.trigger('slide', arguments);
                },
                onslideend: function () {
                    container.trigger('slideend', arguments);
                },
                onslidecomplete: function () {
                    container.trigger('slidecomplete', arguments);
                },
                onclose: function () {
                    container.trigger('close');
                },
                onclosed: function () {
                    container
                        .trigger('closed')
                        .removeData('gallery');
                }
            },
            options = $.extend(
                // Retrieve custom options from data-attributes
                // on the Gallery widget:
                container.data(),
                {
                    container: container[0],
                    index: this,
                    event: event
                },
                callbacks
            ),
            // Select all links with the same data-gallery attribute:
            links = $('[data-gallery="' + id + '"]');
        if (options.filter) {
            links = links.filter(options.filter);
        }
        return new Gallery(links, options);
    });

}));
;/*
 * Bootstrap Image Gallery 3.0.1
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global define, window */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([
            'jquery',
            './blueimp-gallery'
        ], factory);
    } else {
        factory(
            window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    $.extend(Gallery.prototype.options, {
        useBootstrapModal: true
    });

    var close = Gallery.prototype.close,
        imageFactory = Gallery.prototype.imageFactory,
        videoFactory = Gallery.prototype.videoFactory,
        textFactory = Gallery.prototype.textFactory;

    $.extend(Gallery.prototype, {

        modalFactory: function (obj, callback, factoryInterface, factory) {
            if (!this.options.useBootstrapModal || factoryInterface) {
                return factory.call(this, obj, callback, factoryInterface);
            }
            var that = this,
                modalTemplate = this.container.children('.modal'),
                modal = modalTemplate.clone().show()
                    .on('click', function (event) {
                        // Close modal if click is outside of modal-content:
                        if (event.target === modal[0] ||
                                event.target === modal.children()[0]) {
                            event.preventDefault();
                            event.stopPropagation();
                            that.close();
                        }
                    }),
                element = factory.call(this, obj, function (event) {
                    callback({
                        type: event.type,
                        target: modal[0]
                    });
                    modal.addClass('in');
                }, factoryInterface);
            modal.find('.modal-title').text(element.title || String.fromCharCode(160));
            modal.find('.modal-body').append(element);
            return modal[0];
        },

        imageFactory: function (obj, callback, factoryInterface) {
            return this.modalFactory(obj, callback, factoryInterface, imageFactory);
        },

        videoFactory: function (obj, callback, factoryInterface) {
            return this.modalFactory(obj, callback, factoryInterface, videoFactory);
        },

        textFactory: function (obj, callback, factoryInterface) {
            return this.modalFactory(obj, callback, factoryInterface, textFactory);
        },

        close: function () {
            this.container.find('.modal').removeClass('in');
            close.call(this);
        }

    });

}));
;//function initialize() {

(function($) {

/*
*  render_map
*
*  This function will render a Google Map onto the selected jQuery element
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$el (jQuery element)
*  @return	n/a
*/

function render_map( $el ) {

	// var
	var $markers = $el.find('.marker');

	// vars
	var args = {
		zoom		: 16,
		center		: new google.maps.LatLng(0, 0),
		mapTypeId	: google.maps.MapTypeId.ROADMAP
	};

	// create map	        	
	var map = new google.maps.Map( $el[0], args);

	// add a markers reference
	map.markers = [];

	// add markers
	$markers.each(function(){

    	add_marker( $(this), map );

	});

	// center map
	center_map( map );

}

/*
*  add_marker
*
*  This function will add a marker to the selected Google Map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$marker (jQuery element)
*  @param	map (Google Map object)
*  @return	n/a
*/

function add_marker( $marker, map ) {

	// var
	var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

	// create marker
	var marker = new google.maps.Marker({
		position	: latlng,
		map			: map
	});

	// add to array
	map.markers.push( marker );

	// if marker contains HTML, add it to an infoWindow
	if( $marker.html() )
	{
		// create info window
		var infowindow = new google.maps.InfoWindow({
			content		: $marker.html()
		});

		// show info window when marker is clicked
		google.maps.event.addListener(marker, 'click', function() {

			infowindow.open( map, marker );

		});
	}

}

/*
*  center_map
*
*  This function will center the map, showing all markers attached to this map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	map (Google Map object)
*  @return	n/a
*/

function center_map( map ) {

	// vars
	var bounds = new google.maps.LatLngBounds();

	// loop through all markers and create bounds
	$.each( map.markers, function( i, marker ){

		var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

		bounds.extend( latlng );

	});

	// only 1 marker?
	if( map.markers.length == 1 )
	{
		// set center of map
	    map.setCenter( bounds.getCenter() );
	    map.setZoom( 16 );
	}
	else
	{
		// fit to bounds
		map.fitBounds( bounds );
	}

}

/*
*  document ready
*
*  This function will render each map when the document is ready (page has loaded)
*
*  @type	function
*  @date	8/11/2013
*  @since	5.0.0
*
*  @param	n/a
*  @return	n/a
*/

$(document).ready(function(){

	$('.acf-map').each(function(){

		render_map( $(this) );

	});

});

})(jQuery);

/*}

function loadScript() {
  
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;*/;/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages	
	/*$(function(){
		$('.navbar').data('size','big');
	});

	$(window).scroll(function(){
		if($(document).scrollTop() > 0) {
			if($('.navbar').data('size') === 'big') {
				$('.navbar').data('size','small');
				$('.navbar').stop().animate({
					height:'50px'
				},600);
			}
		}
		else {
			if($('.navbar').data('size') === 'small') {
				$('.navbar').data('size','big');
				$('.navbar').stop().animate({
					height:'100px'
				},600);
			}
		}
	});*/
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
    }
  },
  // About page
  about: {
    init: function() {
	  // JavaScript to be fired on the about page
    }
  },
  gallery: {
    init: function() {
	  // JavaScript to be fired on the gallery page
	    /*$(document).ready(function(){
	        $('img').on('click',function(){
		        var src = $(this).attr('src');
			    var img = '<img src="' + src + '" class="img-responsive"/>';
			    $('#myModal').modal();
			    $('#myModal').on('shown.bs.modal', function(){
			        $('#myModal .modal-body').html(img);
			    });
		    $('#myModal').on('hidden.bs.modal', function(){
			    $('#myModal .modal-body').html('');
			});
			});
		});*/
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
