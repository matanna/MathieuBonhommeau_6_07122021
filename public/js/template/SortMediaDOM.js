export class SortMediaDOM {
  constructor (sortType) {
    this._sortType = sortType
    this._selectBtn = document.querySelector('#sort-by')
  }

  popularitySort () {
    this._selectBtn.innerHTML = `
        <div role="option" class="option selected" data-value="popularity">Popularité</div>
        <div role="option" class="option" data-value="date">Date</div>
        <div role="option" class="option" data-value="title">Titre</div>
    `
  }

  dateSort () {
    this._selectBtn.innerHTML = `
        <div role="option" class="option selected" data-value="date">Date</div>
        <div role="option" class="option" data-value="popularity">Popularité</div>
        <div role="option" class="option" data-value="title">Titre</div>
    `
  }

  titleSort () {
    this._selectBtn.innerHTML = `
      <div role="option" class="option selected" data-value="title">Titre</div>
      <div role="option" class="option" data-value="popularity">Popularité</div>
      <div role="option" class="option" data-value="date">Date</div>
    `
  }
}
