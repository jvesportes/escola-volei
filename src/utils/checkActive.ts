export function withoutSlash(pathname: string) {
  return pathname.replace(/[/.]/g, '');
}

export function checkIsActive(pathname: string, url: string, exact: boolean = false) {
  if (!pathname || !url) {
    return false;
  }

  if (pathname === url) {
    return true;
  }

  if (pathname !== '/' && url.includes(pathname) && !exact) {
    return true;
  }

  return false;
}
