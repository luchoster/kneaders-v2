/** Consistent block previews: title = content, subtitle = block name. */
export const preview = (blockName: string, titlePath = "headline.lead", extra?: string) => ({
  select: { title: titlePath, extra: extra ?? titlePath },
  prepare: ({ title }: { title?: string }) => ({ title: title || blockName, subtitle: blockName }),
});

