class MonoType {

  constructor (el) {
    this.el = document.querySelector(el)
    this.text = this.el.innerText
    this.index = 0
    this.duration = 50
    this.className = 'monotype__el'
  }

  init () {
    this.render(this.createTemplate())
    this.play()
  }

  createTemplate () {
    let textList = this.text.split('')

    return textList.map((text, index) => {
      return `<span class="${this.className} ${this.className}--${index}" style="visibility:hidden;">${text}</span>`
    })
  }

  render (list) {
    let innerText = ''

    list.forEach((item) => {
      innerText += item
    })

    this.el.innerHTML = innerText
  }

  play () {
    const items = this.el.querySelectorAll('.' + this.className)
    const itemNum = items.length

    this.runner = setTimeout(() => {
      if (this.index < itemNum) {
        this.play()
      } else {
        this.pause()
      }
      this.index++
    }, this.duration);

    for (let i = 0; i < itemNum; i++) {
      items[i].style.visibility = i <= this.index ? '' : 'hidden'
    }
  }

  pause () {
    this.runner = null
  }
}

window.MonoType = module.exports = MonoType
