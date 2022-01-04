export class SortMediaDOM {
  constructor (sortType) {
    this._sortType = sortType
    this._selectBtn = document.querySelector('#sort-by')
  }

  popularitySort () {
    this._selectBtn.innerHTML = `
      <div role="listbox">
        <div role="option" id="popularity" class="option selected" data-value="popularity">Popularité</div>
        <div role="option" id="date" class="option" data-value="date">Date</div>
        <div role="option" id="title" class="option" data-value="title">Titre</div>
      </div>
    `
  }

  dateSort () {
    this._selectBtn.innerHTML = `
      <div role="listbox">
        <div role="option" id="date" class="option selected" data-value="date">Date</div>
        <div role="option" id="popularity" class="option" data-value="popularity">Popularité</div>
        <div role="option" id="title" class="option" data-value="title">Titre</div>
      </div>
    `
  }

  titleSort () {
    this._selectBtn.innerHTML = `
      <div role="listbox">
        <div role="option" id="title  " class="option selected" data-value="title">Titre</div>
        <div role="option" id="popularity" class="option" data-value="popularity">Popularité</div>
        <div role="option" id="date" class="option" data-value="date">Date</div>
      </div>
    `
  }
}
