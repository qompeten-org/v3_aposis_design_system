export interface AutoBreadcrumbItem {
  label: string;
  url: string;
}

export function generateBreadcrumbs(pathname: string): AutoBreadcrumbItem[] {
  const segments = pathname.split('/').filter((segment) => segment.length > 0);
  let accumulatedPath = '';

  const breadcrumbs: AutoBreadcrumbItem[] = segments.map((segment) => {
    accumulatedPath += `/${segment}`;

    const formattedLabel = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      label: formattedLabel,
      url: accumulatedPath,
    };
  });

  return [{ label: 'Home', url: '/' }, ...breadcrumbs];
}