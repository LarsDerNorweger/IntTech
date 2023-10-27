/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/


export
{
  create, role, clear, createText
};

function createText<K extends keyof HTMLElementTagNameMap>(tagname: K, target?: HTMLElement, text?: string, ...cssClassNames: string[]): HTMLElementTagNameMap[K]
{
  let res = create(tagname, target, ...cssClassNames);
  res.innerText = text ?? '';
  return res;
}
function create<K extends keyof HTMLElementTagNameMap>(tagname: K, target?: HTMLElement, ...cssClassNames: string[]): HTMLElementTagNameMap[K]
{
  let res = document.createElement(tagname);
  if (target)
    target.appendChild(res);
  res.classList.add(...cssClassNames);
  return res;
}

function clear(element: HTMLElement)
{
  while (element.hasChildNodes())
    element.firstChild?.remove();

}

function role(element: HTMLElement, role: string)
{
  element.setAttribute('role', role);
}