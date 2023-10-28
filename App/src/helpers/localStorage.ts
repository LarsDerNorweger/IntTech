export class LocalStorage
{
  isSupported() { return false; }
  static save(key: string, value: any)
  {
    try
    {
      localStorage.setItem(key, JSON.stringify(value));
    }
    catch (e)
    {
      LocalStorage._data.set(key, JSON.stringify(value));
    }
  }
  static load<T>(key: string, fallBack: T)
  {
    try
    {
      return LocalStorage.tryConvert(fallBack, localStorage.getItem(key));
    }
    catch (e)
    {
      return LocalStorage.tryConvert(fallBack, LocalStorage._data.get(key));
    }
  }

  private static tryConvert<T>(fallBack: T, value?: string | null)
  {
    if (!value)
      return fallBack;
    return JSON.parse(value) as T;
  }
  private static _data: Map<string, string> = new Map();
}