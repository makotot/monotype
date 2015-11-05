class Monotype {

  constructor (el) {
    this.el = document.querySelector(el)
    this.text = this.el.innerText
    this.cachedText = this.text
    this.caret = '_'
    this.runner = null
    this.speed = 100
    this.adjustedValue = 60
    this.flashSpeed = 600
    this.count = 0
  }

  init () {
    this.run()
  }

  createInterval () {
    return Math.floor(Math.random() * this.adjustedValue) + this.speed
  }

  type (caret = this.caret) {
    return this.text.substr(0, this.count) + caret
  }

  flicker (status) {
    this.render(this.type(status ? this.caret : ''))
  }

  wait (isCaretShown = false) {

    this.runner = setTimeout(() => {
      this.wait(!isCaretShown)
      this.flicker(isCaretShown)
    }, this.flashSpeed)
  }

  render (text = '') {
    this.el.innerText = text
  }

  pause () {
    this.runner = null
  }

  run () {
    this.runner = setTimeout(() => {
      if (this.text.length >= this.count) {
        this.run()
        this.render(this.type())
        this.count++;
      } else {
        this.pause()
        this.wait()
      }
    }, this.createInterval())
  }

}

window.Monotype = module.exports = Monotype

