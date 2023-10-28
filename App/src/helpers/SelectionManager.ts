
export type onAction<T> = (element: T) => void;
export class SelectionManager<T extends HTMLElement>{
  constructor(onselect: onAction<T>, ondeselect: onAction<T>, selectFirst?: boolean)
  {
    this._fireDeSelect = ondeselect;
    this._fireSelect = onselect;
    this._selectFirst = !!selectFirst;
  }

  add(element: T)
  {
    this.m_elements.add(element);
    element.onclick = this._handleClick.bind(this);
    if (this._selectFirst)
    {
      this._fireSelect(element);
      this._selectFirst = false;
    }
  };

  private _handleClick(e: MouseEvent)
  {
    e.preventDefault();
    for (let i of this.m_elements)
    {
      if (i == e.target || i.contains(e.target as HTMLElement))
        this._fireSelect(i);
      else this._fireDeSelect(i);
    }
  }

  private _fireSelect: onAction<T>;
  private _fireDeSelect: onAction<T>;
  private _selectFirst: boolean;
  private m_elements: Set<T> = new Set();
}