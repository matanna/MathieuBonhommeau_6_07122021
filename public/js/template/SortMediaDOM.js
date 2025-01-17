/**
 * Class for create the html for the sort button and adapt it in term of choosed element
 */
export class SortMediaDOM {
  constructor (sortType) {
    this._sortType = sortType
    this._selectBtn = document.querySelector('#sort-by')
  }

  popularitySort () {
    this._selectBtn.innerHTML = `
      <div id="listbox-options">
        <div role="option" id="popularity" class="option selected" data-value="popularity" tabindex="0" aria-label="Trier par popularité">Popularité</div>
        <div role="option" id="date" class="option" data-value="date" tabindex="0" aria-label="Trier par date">Date</div>
        <div role="option" id="title" class="option" data-value="title" tabindex="0" aria-label="Trier par titre">Titre</div>
      </div>
    `
  }

  dateSort () {
    this._selectBtn.innerHTML = `
      <div id="listbox-options">
        <div role="option" id="date" class="option selected" data-value="date" tabindex="0" aria-label="Trier par date">Date</div>
        <div role="option" id="popularity" class="option" data-value="popularity" tabindex="0" aria-label="Trier par popularité">Popularité</div>
        <div role="option" id="title" class="option" data-value="title" tabindex="0" aria-label="Trier par titre">Titre</div>
      </div>
    `
  }

  titleSort () {
    this._selectBtn.innerHTML = `
      <div id="listbox-options">
        <div role="option" id="title" class="option selected" data-value="title" tabindex="0" aria-label="Trier par titre">Titre</div>
        <div role="option" id="popularity" class="option" data-value="popularity" tabindex="0" aria-label="Trier par popularité">Popularité</div>
        <div role="option" id="date" class="option" data-value="date" tabindex="0" aria-label="Trier par date">Date</div>
      </div>
    `
  }
}
