// 后续封装到rex本身中

const cache = new Map();

const useSuspense = (fn, options) => {
  const cacheKeyStr = options.cacheKeys.join('-');
  if (cache.has(cacheKeyStr)) {
    const promise = cache.get(cacheKeyStr);
    if (promise.status === 'fulfilled') {
      return promise.value;
    } else if (promise.status === 'rejected') {
      throw promise.reason;
    } else if (promise.status === 'pending') {
      throw promise;
    }
  } else {
    const promise = fn(...(options.params || []));
    promise.status = 'pending';
    promise.then(
      () => {
        promise.status = 'fulfilled';
      },
      reason => {
        promise.status = 'rejected';
        promise.reason = reason;
      },
    );
    cache.set(cacheKeyStr, promise);
    throw promise;
  }
};

export { useSuspense };
