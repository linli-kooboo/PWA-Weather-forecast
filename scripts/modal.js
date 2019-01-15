// emitter
var emitter = {
  // register event
  on: function(event, fn) {
    var handles = this._handles || (this._handles = {}),
      calls = handles[event] || (handles[event] = []);

    // find stack of corresponding name
    calls.push(fn);

    return this;
  },
  // unbind event
  off: function(event, fn) {
    if(!event || !this._handles) this._handles = {};
    if(!this._handles) return;

    var handles = this._handles , calls;

    if (calls = handles[event]) {
      if (!fn) {
        handles[event] = [];
        return this;
      }
      // find listener of corresponding stack and remove it
      for (var i = 0, len = calls.length; i < len; i++) {
        if (fn === calls[i]) {
          calls.splice(i, 1);
          return this;
        }
      }
    }
    return this;
  },
  // emit event
  emit: function(event){
    var args = [].slice.call(arguments, 1),
      handles = this._handles, calls;

    if (!handles || !(calls = handles[event])) return this;
    // emit all listeners of corresponding name
    for (var i = 0, len = calls.length; i < len; i++) {
      calls[i].apply(this, args)
    }
    return this;
  }
}

!function(){
  // helper function

  // translate html to node
  function html2node(str){
    var container = document.createElement('div');
    container.innerHTML = str;
    return container.children[0];
  }

  // set attribute
  // extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
  function extend(o1, o2){
    for(var i in o2) if(typeof o1[i] === 'undefined'){
      o1[i] = o2[i]
    } 
    return o1
  }

  // Modal

  // create modal template
  var template = `<div class="modal-wrapper">
    <div class="modal">
      <header class="modal__head">title</header>
      <main class="modal__main">content</main>
      <footer class="modal__foot">
        <div class="cancel">取消</div>
        <div class="confirm">确认</div>
      </footer>
    </div>
  </div>`;

  function Modal(options){
    options = options || {};
    this.container = this._layout.cloneNode(true);
    this.title = this.container.querySelector('.modal__head');
    this.content = this.container.querySelector('.modal__main');
    this.wrap = this.container.querySelector('.modal');
    
    // copy options to component instance
    extend(this, options);

    // init
    this._initEvent();
  }

  extend(Modal.prototype, {
    _layout: html2node(template),
    setTitle: function(title){
      if(!title) return;
      // support string and DOM node
      if(title.nodeType === 1){ 
        this.title.innerHTML = 0;
        this.title.appendChild(title);
      }else{
        this.title.innerHTML = title;
      }
    },
    setContent: function(content){
      if(!content) return;
      // support string and DOM node
      if(content.nodeType === 1){ 
        this.content.innerHTML = 0;
        this.content.appendChild(content);
      }else{
        this.content.innerHTML = content;
      }
    },
    // show modal
    show: function({title, content}){
      if(title) this.setTitle(title);
      if(content) this.setContent(content);
      document.body.appendChild(this.container);
    },
    // hide mocal
    hide: function(){
      var container = this.container;
      document.body.removeChild(container);    
    },
    // init event
    _initEvent: function(){
      this.container.querySelector('.confirm').addEventListener(
        'click', this._onConfirm.bind(this)
      )
      this.container.querySelector('.cancel').addEventListener(
        'click', this._onCancel.bind(this)
      )
    },
    _onConfirm: function(){
      this.emit('confirm')
      this.hide();
    },
    _onCancel: function(){
      this.emit('cancel')
      this.hide();
    }
  })

  // minxin emiiter
  extend(Modal.prototype, emitter);

  // Exports
  if (typeof exports === 'object') {
    module.exports = Modal;
    // support amd
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return Modal
    });
  } else {
    // export to golbal
    window.Modal = Modal;
  }

}()