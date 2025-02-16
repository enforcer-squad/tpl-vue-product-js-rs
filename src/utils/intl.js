const intl = (key, options) => {
  const i18nKey = window.language?.[key] || key;
  if (options) {
    return Object.entries(options).reduce((result, [k, v]) => {
      const reg = new RegExp(`{{${k}}}`, 'g');
      return result.replace(reg, String(v));
    }, i18nKey);
  }
  return i18nKey;
};

export { intl };
